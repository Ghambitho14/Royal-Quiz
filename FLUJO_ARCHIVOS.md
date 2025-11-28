# 🔄 Flujo Completo de Archivos - Quiz Royal

Este documento explica cómo fluyen los archivos desde el punto de entrada hasta cada componente de la aplicación.

---

## 🚀 Punto de Entrada

### 1. `index.html`
**Ubicación:** Raíz del proyecto  
**Función:** HTML base de la aplicación

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>  ← Aquí se monta React
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Flujo:** `index.html` → carga `src/main.jsx`

---

### 2. `src/main.jsx`
**Ubicación:** `src/main.jsx`  
**Función:** Punto de entrada de React, monta la aplicación

```javascript
import App from './App.jsx'
createRoot(document.getElementById('root')).render(<App />)
```

**Flujo:** `main.jsx` → renderiza `App.jsx`

---

### 3. `src/App.jsx`
**Ubicación:** `src/App.jsx`  
**Función:** Componente raíz, configura Router y Providers

```javascript
<BrowserRouter>
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
</BrowserRouter>
```

**Flujo:** `App.jsx` → envuelve con `BrowserRouter` y `AuthProvider` → renderiza `AppRoutes.jsx`

---

## 🔐 Contexto de Autenticación

### 4. `src/shared/context/AuthContext.jsx`
**Ubicación:** `src/shared/context/AuthContext.jsx`  
**Función:** Proporciona estado global de autenticación

**Importa:**
- `backend/services/auth.js` → `getCurrentSession`, `onAuthStateChange`, `logout`
- `backend/services/user.js` → `needsPassword`

**Exporta:**
- `AuthProvider` → Componente que envuelve la app
- `useAuth` → Hook para acceder al contexto

**Flujo:** `AuthContext.jsx` → usado por `App.jsx` → disponible para toda la app

---

## 🛣️ Sistema de Rutas

### 5. `src/routes/AppRoutes.jsx`
**Ubicación:** `src/routes/AppRoutes.jsx`  
**Función:** Define todas las rutas de la aplicación

**Importa:**
- `shared/context/AuthContext.jsx` → `useAuth`
- `features/auth/pages/LoginPage.jsx`
- `features/auth/pages/LobbyPage.jsx`
- `features/auth/pages/SetPasswordPage.jsx`
- `features/profile/pages/ProfilePage.jsx`
- `routes/ProtectedRoute.jsx`
- `routes/PublicRoute.jsx`

**Rutas definidas:**
- `/` → Redirige según autenticación
- `/login` → `LoginPage` (envuelto en `PublicRoute`)
- `/verify` → `LobbyPage` (envuelto en `PublicRoute`)
- `/set-password` → `SetPasswordPage`
- `/profile` → `ProfilePage` (envuelto en `ProtectedRoute`)
- `*` → 404, redirige a `/`

**Flujo:** `AppRoutes.jsx` → renderiza páginas según la ruta actual

---

### 6. `src/routes/ProtectedRoute.jsx`
**Ubicación:** `src/routes/ProtectedRoute.jsx`  
**Función:** Protege rutas que requieren autenticación

**Importa:**
- `shared/context/AuthContext.jsx` → `useAuth`

**Lógica:**
- Si no hay usuario → redirige a `/login`
- Si hay usuario (incluyendo invitados) → permite acceso

**Flujo:** `ProtectedRoute.jsx` → usado por `AppRoutes.jsx` para proteger `/profile`

---

### 7. `src/routes/PublicRoute.jsx`
**Ubicación:** `src/routes/PublicRoute.jsx`  
**Función:** Rutas públicas que redirigen si ya estás autenticado

**Importa:**
- `shared/context/AuthContext.jsx` → `useAuth`

**Lógica:**
- Si necesita contraseña → redirige a `/set-password`
- Si está autenticado (no invitado) → redirige a `/profile`
- Si no está autenticado o es invitado → permite acceso

**Flujo:** `PublicRoute.jsx` → usado por `AppRoutes.jsx` para rutas públicas

---

## 🔑 Feature: Autenticación

### 8. `src/features/auth/pages/LoginPage.jsx`
**Ubicación:** `src/features/auth/pages/LoginPage.jsx`  
**Función:** Página de login/registro

**Importa:**
- `features/auth/components/LoginForm.jsx`
- `features/auth/components/RegisterForm.jsx`
- `backend/services/auth.js` → `loginWithPassword`, `registerWithOTP`, `loginWithGoogle`
- `shared/context/AuthContext.jsx` → `useAuth`
- `react-router-dom` → `useNavigate`

**Flujo:**
1. Usuario interactúa con `LoginForm` o `RegisterForm`
2. Se llama a servicios del backend
3. Si es exitoso → actualiza `AuthContext` → navega a `/profile` o `/verify`

---

### 9. `src/features/auth/components/LoginForm.jsx`
**Ubicación:** `src/features/auth/components/LoginForm.jsx`  
**Función:** Formulario de login

**Importa:**
- `shared/components/ui/Modal.jsx`
- `shared/components/ui/Logo.jsx`
- `shared/components/ui/InputField.jsx`
- `shared/components/ui/Button.jsx`
- `shared/components/ui/Label.jsx`
- `shared/components/ui/Input.jsx`
- `shared/components/ui/AnimatedText.jsx`
- `lib/utils.js` → `cn`
- `styles/components/Login/LoginForm.css`

**Flujo:** `LoginForm.jsx` → usado por `LoginPage.jsx` → recibe callbacks (`onLogin`, `onRegister`, etc.)

---

### 10. `src/features/auth/components/RegisterForm.jsx`
**Ubicación:** `src/features/auth/components/RegisterForm.jsx`  
**Función:** Formulario de registro

**Importa:**
- `shared/components/ui/Modal.jsx`
- `shared/components/ui/Logo.jsx`
- `shared/components/ui/InputField.jsx`
- `shared/components/ui/Button.jsx`
- `styles/components/Login/RegisterForm.css`

**Flujo:** `RegisterForm.jsx` → usado por `LoginPage.jsx` → recibe `onRegister`

---

### 11. `src/features/auth/pages/LobbyPage.jsx`
**Ubicación:** `src/features/auth/pages/LobbyPage.jsx`  
**Función:** Página de verificación OTP

**Importa:**
- `features/auth/components/VerificationCode.jsx`
- `backend/services/auth.js` → `verifyOTP`, `registerWithOTP`
- `backend/services/user.js` → `updateUserPassword`
- `shared/context/AuthContext.jsx` → `useAuth`
- `react-router-dom` → `useNavigate`, `useSearchParams`

**Flujo:**
1. Usuario ingresa código OTP
2. Se verifica con `verifyOTP`
3. Si hay contraseña → se establece con `updateUserPassword`
4. Actualiza `AuthContext` → navega a `/profile`

---

### 12. `src/features/auth/components/VerificationCode.jsx`
**Ubicación:** `src/features/auth/components/VerificationCode.jsx`  
**Función:** Componente para ingresar código de verificación

**Importa:**
- `shared/components/ui/Modal.jsx`
- `shared/components/ui/Logo.jsx`
- `shared/components/ui/InputField.jsx`
- `shared/components/ui/Button.jsx`
- `styles/components/Login/VerificationCode.css`

**Flujo:** `VerificationCode.jsx` → usado por `LobbyPage.jsx` → recibe `onVerify`, `onResend`

---

### 13. `src/features/auth/pages/SetPasswordPage.jsx`
**Ubicación:** `src/features/auth/pages/SetPasswordPage.jsx`  
**Función:** Página para establecer contraseña (usuarios Google)

**Importa:**
- `shared/components/ui/Button.jsx`
- `shared/components/ui/InputField.jsx`
- `shared/components/ui/Modal.jsx`
- `backend/services/user.js` → `setPasswordForGoogleUser`
- `shared/context/AuthContext.jsx` → `useAuth`
- `react-router-dom` → `useNavigate`
- `styles/pages/SetPasswordPage.css`

**Flujo:**
1. Usuario establece contraseña
2. Se llama a `setPasswordForGoogleUser`
3. Actualiza `AuthContext` → navega a `/profile`

---

## 👤 Feature: Perfil

### 14. `src/features/profile/pages/ProfilePage.jsx`
**Ubicación:** `src/features/profile/pages/ProfilePage.jsx`  
**Función:** Página de perfil del usuario

**Importa:**
- `shared/components/ui/Button.jsx`
- `backend/services/user.js` → `updateUserName`, `updateUserPassword`
- `shared/context/AuthContext.jsx` → `useAuth`
- `react-router-dom` → `useNavigate`
- `styles/pages/ProfilePage.css`

**Flujo:**
1. Muestra información del usuario
2. Permite cambiar nombre y contraseña
3. Llama a servicios del backend
4. Actualiza `AuthContext` con nuevos datos

---

## 🎨 Componentes UI Compartidos

### 15. `src/shared/components/ui/Button.jsx`
**Ubicación:** `src/shared/components/ui/Button.jsx`  
**Función:** Botón reutilizable

**Importa:**
- `@radix-ui/react-slot`
- `lib/utils.js` → `cn`
- `styles/components/Login/Button.css`

**Usado por:**
- `LoginForm.jsx`
- `RegisterForm.jsx`
- `VerificationCode.jsx`
- `SetPasswordPage.jsx`
- `ProfilePage.jsx`

---

### 16. `src/shared/components/ui/Input.jsx`
**Ubicación:** `src/shared/components/ui/Input.jsx`  
**Función:** Input básico

**Importa:**
- `lib/utils.js` → `cn`
- `styles/components/Login/Input.css`

**Usado por:**
- `InputField.jsx`
- `LoginForm.jsx` (directamente)

---

### 17. `src/shared/components/ui/InputField.jsx`
**Ubicación:** `src/shared/components/ui/InputField.jsx`  
**Función:** Campo de entrada con label e icono

**Importa:**
- `shared/components/ui/Input.jsx`
- `shared/components/ui/Label.jsx`
- `lib/utils.js` → `cn`
- `styles/components/Login/InputField.css`

**Usado por:**
- `LoginForm.jsx`
- `RegisterForm.jsx`
- `VerificationCode.jsx`
- `SetPasswordPage.jsx`

---

### 18. `src/shared/components/ui/Modal.jsx`
**Ubicación:** `src/shared/components/ui/Modal.jsx`  
**Función:** Contenedor modal

**Importa:**
- `shared/components/ui/Card.jsx`
- `lib/utils.js` → `cn`
- `styles/components/Login/Modal.css`

**Usado por:**
- `LoginForm.jsx`
- `RegisterForm.jsx`
- `VerificationCode.jsx`
- `SetPasswordPage.jsx`

---

### 19. `src/shared/components/ui/Logo.jsx`
**Ubicación:** `src/shared/components/ui/Logo.jsx`  
**Función:** Logo de la aplicación

**Importa:**
- `styles/components/Login/Logo.css`

**Usado por:**
- `LoginForm.jsx`
- `RegisterForm.jsx`
- `VerificationCode.jsx`

---

### 20. `src/shared/components/ui/AnimatedText.jsx`
**Ubicación:** `src/shared/components/ui/AnimatedText.jsx`  
**Función:** Texto animado

**Importa:**
- `styles/components/Login/AnimatedText.css`

**Usado por:**
- `LoginForm.jsx`

---

### 21. `src/shared/components/ui/Card.jsx`
**Ubicación:** `src/shared/components/ui/Card.jsx`  
**Función:** Componente de tarjeta

**Importa:**
- `lib/utils.js` → `cn`
- `styles/components/Login/Card.css`

**Usado por:**
- `Modal.jsx`

---

### 22. `src/shared/components/ui/Label.jsx`
**Ubicación:** `src/shared/components/ui/Label.jsx`  
**Función:** Etiqueta de formulario

**Importa:**
- `@radix-ui/react-label`
- `lib/utils.js` → `cn`
- `styles/components/Login/Label.css`

**Usado por:**
- `InputField.jsx`
- `LoginForm.jsx` (directamente)

---

### 23. `src/shared/components/ui/Dialog.jsx`
**Ubicación:** `src/shared/components/ui/Dialog.jsx`  
**Función:** Diálogo modal (Radix UI)

**Importa:**
- `@radix-ui/react-dialog`
- `lib/utils.js` → `cn`
- `styles/components/Login/Dialog.css`

**Nota:** Actualmente no se usa, pero está disponible para futuros usos.

---

## 🔧 Utilidades y Librerías

### 24. `src/lib/utils.js`
**Ubicación:** `src/lib/utils.js`  
**Función:** Utilidades compartidas (cn para clases CSS)

**Importa:**
- `clsx`
- `tailwind-merge`

**Exporta:**
- `cn()` → Función para combinar clases CSS

**Usado por:**
- Todos los componentes UI
- Componentes de features

---

### 25. `src/lib/supabase.js`
**Ubicación:** `src/lib/supabase.js`  
**Función:** Re-exporta el cliente de Supabase

**Importa:**
- `backend/config/supabase.js` → `supabase`

**Exporta:**
- `supabase` → Cliente de Supabase para el frontend

**Usado por:**
- Indirectamente a través de `backend/services/`

---

## 🔌 Backend Services

### 26. `backend/services/auth.js`
**Ubicación:** `backend/services/auth.js`  
**Función:** Servicios de autenticación

**Exporta:**
- `loginWithPassword()`
- `registerWithOTP()`
- `verifyOTP()`
- `loginWithGoogle()`
- `logout()`
- `getCurrentSession()`
- `onAuthStateChange()`
- `validateCurrentPassword()`

**Usado por:**
- `AuthContext.jsx`
- `LoginPage.jsx`
- `LobbyPage.jsx`

---

### 27. `backend/services/user.js`
**Ubicación:** `backend/services/user.js`  
**Función:** Servicios de usuario

**Exporta:**
- `updateUserName()`
- `updateUserPassword()`
- `setPasswordForGoogleUser()`
- `getCurrentUser()`
- `needsPassword()`
- `getAccountType()`

**Usado por:**
- `AuthContext.jsx`
- `ProfilePage.jsx`
- `SetPasswordPage.jsx`
- `LobbyPage.jsx`

---

### 28. `backend/config/supabase.js`
**Ubicación:** `backend/config/supabase.js`  
**Función:** Configuración de Supabase

**Exporta:**
- `supabase` → Cliente para frontend
- `supabaseAdmin` → Cliente para backend (opcional)

**Usado por:**
- `backend/services/auth.js`
- `backend/services/user.js`
- `backend/services/quiz.js`
- `src/lib/supabase.js`

---

## 📊 Flujo Completo Visual

```
index.html
  └──> main.jsx
        └──> App.jsx
              ├──> BrowserRouter (react-router-dom)
              └──> AuthProvider (AuthContext.jsx)
                    │
                    ├──> getCurrentSession() ──> backend/services/auth.js
                    ├──> onAuthStateChange() ──> backend/services/auth.js
                    └──> needsPassword() ──> backend/services/user.js
                    │
                    └──> AppRoutes.jsx
                          │
                          ├──> PublicRoute.jsx
                          │     └──> useAuth() ──> AuthContext.jsx
                          │
                          ├──> ProtectedRoute.jsx
                          │     └──> useAuth() ──> AuthContext.jsx
                          │
                          └──> Rutas:
                                │
                                ├──> /login ──> LoginPage.jsx
                                │     ├──> LoginForm.jsx
                                │     │     ├──> Modal.jsx
                                │     │     │     └──> Card.jsx
                                │     │     ├──> Logo.jsx
                                │     │     ├──> InputField.jsx
                                │     │     │     ├──> Input.jsx
                                │     │     │     └──> Label.jsx
                                │     │     ├──> Button.jsx
                                │     │     ├──> AnimatedText.jsx
                                │     │     └──> Input.jsx (directo)
                                │     │
                                │     ├──> RegisterForm.jsx
                                │     │     ├──> Modal.jsx
                                │     │     ├──> Logo.jsx
                                │     │     ├──> InputField.jsx
                                │     │     └──> Button.jsx
                                │     │
                                │     └──> Llamadas a:
                                │           ├──> loginWithPassword() ──> backend/services/auth.js
                                │           ├──> registerWithOTP() ──> backend/services/auth.js
                                │           └──> loginWithGoogle() ──> backend/services/auth.js
                                │
                                ├──> /verify ──> LobbyPage.jsx
                                │     ├──> VerificationCode.jsx
                                │     │     ├──> Modal.jsx
                                │     │     ├──> Logo.jsx
                                │     │     ├──> InputField.jsx
                                │     │     └──> Button.jsx
                                │     │
                                │     └──> Llamadas a:
                                │           ├──> verifyOTP() ──> backend/services/auth.js
                                │           └──> updateUserPassword() ──> backend/services/user.js
                                │
                                ├──> /set-password ──> SetPasswordPage.jsx
                                │     ├──> Modal.jsx
                                │     ├──> InputField.jsx
                                │     ├──> Button.jsx
                                │     └──> setPasswordForGoogleUser() ──> backend/services/user.js
                                │
                                └──> /profile ──> ProfilePage.jsx
                                      ├──> Button.jsx
                                      └──> Llamadas a:
                                            ├──> updateUserName() ──> backend/services/user.js
                                            └──> updateUserPassword() ──> backend/services/user.js
```

---

## 🔄 Flujos de Usuario Específicos

### Flujo 1: Login con Email/Contraseña

```
Usuario escribe credenciales
  └──> LoginForm.jsx (captura datos)
        └──> LoginPage.jsx (handleLogin)
              └──> backend/services/auth.js (loginWithPassword)
                    └──> backend/config/supabase.js (supabase.auth.signInWithPassword)
                          │
                          ├──> Éxito:
                          │     └──> AuthContext.jsx (updateUser)
                          │           └──> AppRoutes.jsx (detecta user)
                          │                 └──> Navega a /profile
                          │
                          └──> Error:
                                └──> LoginPage.jsx (muestra error)
```

---

### Flujo 2: Registro con OTP

```
Usuario completa formulario
  └──> RegisterForm.jsx (captura datos)
        └──> LoginPage.jsx (handleRegister)
              └──> backend/services/auth.js (registerWithOTP)
                    └──> backend/config/supabase.js (supabase.auth.signInWithOtp)
                          │
                          └──> Éxito:
                                └──> localStorage.setItem('pendingVerification')
                                      └──> Navega a /verify
                                            └──> LobbyPage.jsx
                                                  └──> VerificationCode.jsx
                                                        └──> Usuario ingresa código
                                                              └──> backend/services/auth.js (verifyOTP)
                                                                    └──> backend/services/user.js (updateUserPassword)
                                                                          └──> AuthContext.jsx (updateUser)
                                                                                └──> Navega a /profile
```

---

### Flujo 3: Modo Invitado

```
Usuario hace clic en "Modo Invitado"
  └──> LoginForm.jsx (onGuestMode)
        └──> LoginPage.jsx (handleGuestMode)
              └──> AuthContext.jsx (updateUser({ type: 'guest' }))
                    └──> AppRoutes.jsx (detecta user)
                          └──> Navega a /profile
                                └──> ProtectedRoute.jsx (permite acceso a invitados)
                                      └──> ProfilePage.jsx
                                            └──> Muestra perfil con limitaciones
```

---

### Flujo 4: Cambiar Contraseña

```
Usuario hace clic en "Cambiar Contraseña"
  └──> ProfilePage.jsx (handleChangePassword)
        └──> Usuario completa formulario
              └──> ProfilePage.jsx (handleSavePassword)
                    └──> backend/services/user.js (updateUserPassword)
                          └──> backend/services/auth.js (validateCurrentPassword)
                                └──> backend/config/supabase.js (supabase.auth.signInWithPassword)
                                      │
                                      ├──> Contraseña correcta:
                                      │     └──> backend/config/supabase.js (supabase.auth.updateUser)
                                      │           └──> ProfilePage.jsx (muestra éxito)
                                      │
                                      └──> Contraseña incorrecta:
                                            └──> ProfilePage.jsx (muestra error)
```

---

## 📦 Dependencias entre Archivos

### Nivel 1: Entrada
- `index.html` → `main.jsx`

### Nivel 2: Configuración
- `main.jsx` → `App.jsx`
- `App.jsx` → `AuthContext.jsx` + `AppRoutes.jsx`

### Nivel 3: Rutas
- `AppRoutes.jsx` → `ProtectedRoute.jsx` + `PublicRoute.jsx` + Páginas
- `ProtectedRoute.jsx` → `AuthContext.jsx`
- `PublicRoute.jsx` → `AuthContext.jsx`

### Nivel 4: Páginas
- `LoginPage.jsx` → `LoginForm.jsx` + `RegisterForm.jsx` + `backend/services/auth.js`
- `LobbyPage.jsx` → `VerificationCode.jsx` + `backend/services/auth.js` + `backend/services/user.js`
- `SetPasswordPage.jsx` → Componentes UI + `backend/services/user.js`
- `ProfilePage.jsx` → Componentes UI + `backend/services/user.js`

### Nivel 5: Componentes
- `LoginForm.jsx` → Componentes UI + `lib/utils.js`
- `RegisterForm.jsx` → Componentes UI + `lib/utils.js`
- `VerificationCode.jsx` → Componentes UI + `lib/utils.js`

### Nivel 6: Componentes UI
- `Button.jsx` → `lib/utils.js`
- `Input.jsx` → `lib/utils.js`
- `InputField.jsx` → `Input.jsx` + `Label.jsx` + `lib/utils.js`
- `Modal.jsx` → `Card.jsx` + `lib/utils.js`
- `Card.jsx` → `lib/utils.js`
- `Label.jsx` → `lib/utils.js`
- `Logo.jsx` → (solo estilos)
- `AnimatedText.jsx` → (solo estilos)

### Nivel 7: Utilidades
- `lib/utils.js` → `clsx` + `tailwind-merge`
- `lib/supabase.js` → `backend/config/supabase.js`

### Nivel 8: Backend
- `backend/services/auth.js` → `backend/config/supabase.js`
- `backend/services/user.js` → `backend/config/supabase.js`
- `backend/config/supabase.js` → `@supabase/supabase-js`

---

## 🎯 Resumen de Conexiones

### Archivos que Importan Backend
1. `AuthContext.jsx` → `backend/services/auth.js` + `backend/services/user.js`
2. `LoginPage.jsx` → `backend/services/auth.js`
3. `LobbyPage.jsx` → `backend/services/auth.js` + `backend/services/user.js`
4. `SetPasswordPage.jsx` → `backend/services/user.js`
5. `ProfilePage.jsx` → `backend/services/user.js`
6. `lib/supabase.js` → `backend/config/supabase.js`

### Archivos que Usan Context
1. `AppRoutes.jsx` → `useAuth()`
2. `ProtectedRoute.jsx` → `useAuth()`
3. `PublicRoute.jsx` → `useAuth()`
4. `LoginPage.jsx` → `useAuth()`
5. `LobbyPage.jsx` → `useAuth()`
6. `SetPasswordPage.jsx` → `useAuth()`
7. `ProfilePage.jsx` → `useAuth()`

### Archivos que Usan React Router
1. `App.jsx` → `BrowserRouter`
2. `AppRoutes.jsx` → `Routes`, `Route`, `Navigate`
3. `ProtectedRoute.jsx` → `Navigate`
4. `PublicRoute.jsx` → `Navigate`
5. `LoginPage.jsx` → `useNavigate`
6. `LobbyPage.jsx` → `useNavigate`, `useSearchParams`
7. `SetPasswordPage.jsx` → `useNavigate`
8. `ProfilePage.jsx` → `useNavigate`

---

## 📝 Notas Importantes

1. **Separación Frontend/Backend:**
   - El `backend/` está en la raíz, NO dentro de `src/`
   - Las importaciones usan rutas relativas: `../../../../backend/`

2. **Estado Global:**
   - `AuthContext.jsx` es el único lugar donde se maneja el estado de autenticación
   - Todos los componentes acceden a través de `useAuth()`

3. **Componentes UI:**
   - Todos los componentes UI están en `shared/components/ui/`
   - Son reutilizables y no tienen lógica de negocio

4. **Features:**
   - Cada feature (`auth`, `profile`) tiene sus propios componentes y páginas
   - Las features importan servicios del backend cuando necesitan datos

5. **Rutas:**
   - `AppRoutes.jsx` es el único lugar donde se definen las rutas
   - `ProtectedRoute` y `PublicRoute` son wrappers para control de acceso

---

**Última actualización:** 2024

