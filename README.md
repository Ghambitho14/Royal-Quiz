# Quiz Royal

Aplicación de quiz interactiva construida con React, Vite y Supabase para la autenticación y gestión de datos.

## 📋 Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Funcionalidades de Autenticación](#funcionalidades-de-autenticación)
- [Problemas Conocidos](#problemas-conocidos)
- [Mejoras Pendientes](#mejoras-pendientes)

## 🏗️ Estructura del Proyecto

```
Quiz/
├── backend/                          # Lógica del backend y servicios
│   ├── config/
│   │   └── supabase.js              # Configuración de clientes Supabase (cliente y admin)
│   ├── services/
│   │   ├── auth.js                  # Servicios de autenticación (login, registro, OTP, OAuth)
│   │   ├── user.js                  # Servicios de usuario (actualizar nombre, contraseña, obtener datos)
│   │   └── quiz.js                  # Servicios de quiz (obtener quizzes, guardar resultados, estadísticas)
│   ├── utils/
│   │   └── helpers.js               # Utilidades (formateo de fechas, validaciones, manejo de errores)
│   ├── index.js                     # Punto de entrada que exporta todos los servicios
│   └── README.md                    # Documentación del backend
│
├── src/                             # Código fuente de la aplicación React
│   ├── components/                  # Componentes reutilizables
│   │   ├── auth/                    # Componentes de autenticación
│   │   │   ├── LoginForm.jsx        # Formulario de inicio de sesión
│   │   │   ├── RegisterForm.jsx    # Formulario de registro
│   │   │   └── VerificationCode.jsx # Componente para verificar código OTP
│   │   └── ui/                      # Componentes de UI
│   │       └── Login/               # Componentes específicos del login
│   │           ├── AnimatedText.jsx  # Texto animado para el título
│   │           ├── Button.jsx       # Botón reutilizable
│   │           ├── Card.jsx         # Tarjeta contenedora
│   │           ├── Dialog.jsx       # Diálogo modal
│   │           ├── Input.jsx        # Input básico
│   │           ├── InputField.jsx   # Campo de entrada con label e icono
│   │           ├── Label.jsx        # Etiqueta de formulario
│   │           ├── Logo.jsx         # Logo de la aplicación
│   │           └── Modal.jsx        # Modal contenedor
│   │
│   ├── pages/                       # Páginas principales de la aplicación
│   │   ├── LoginPage.jsx            # Página de login/registro (orquesta los formularios)
│   │   ├── LobbyPage.jsx            # Página de verificación de código OTP
│   │   ├── ProfilePage.jsx          # Página de perfil del usuario
│   │   └── SetPasswordPage.jsx      # Página para establecer contraseña (usuarios Google)
│   │
│   ├── lib/                         # Librerías y utilidades
│   │   ├── supabase.js              # Re-exportación del cliente Supabase del backend
│   │   └── utils.js                 # Utilidades (cn para clases CSS)
│   │
│   ├── styles/                      # Estilos CSS
│   │   ├── Colors.css               # Variables de colores
│   │   ├── components/              # Estilos de componentes
│   │   │   └── Login/               # Estilos específicos del login
│   │   └── pages/                   # Estilos de páginas
│   │
│   ├── assets/                      # Recursos estáticos
│   ├── App.jsx                      # Componente principal (maneja el estado de autenticación)
│   ├── App.css                      # Estilos globales de la app
│   ├── index.css                    # Estilos base
│   └── main.jsx                     # Punto de entrada de React
│
├── public/                          # Archivos públicos estáticos
│   └── vite.svg                     # Logo de Vite
│
├── index.html                       # HTML principal
├── package.json                     # Dependencias y scripts del proyecto
├── vite.config.js                   # Configuración de Vite
├── tailwind.config.js               # Configuración de Tailwind CSS
├── postcss.config.js                # Configuración de PostCSS
├── eslint.config.js                 # Configuración de ESLint
└── README.md                        # Este archivo
```

## 🛠️ Tecnologías

- **Frontend:**
  - React 19.2.0
  - Vite 7.2.4
  - Tailwind CSS 4.1.17
  - Radix UI (componentes accesibles)
  - React Hook Form 7.55.0

- **Backend/Autenticación:**
  - Supabase 2.84.0 (autenticación y base de datos)

- **Herramientas:**
  - ESLint (linting)
  - PostCSS (procesamiento de CSS)
  - Autoprefixer

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key  # Opcional, solo para operaciones admin
```

### Instalación

```bash
npm install
```

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🔐 Funcionalidades de Autenticación

### Implementadas

✅ **Login con Email/Contraseña**
- Validación de formulario
- Manejo de errores
- Persistencia de sesión

✅ **Registro con OTP (One-Time Password)**
- Registro con código de verificación por email
- Establecimiento de contraseña después de verificar OTP
- Reenvío de código

✅ **Autenticación con Google OAuth**
- Login/Registro con Google
- Establecimiento de contraseña opcional para usuarios Google

✅ **Modo Invitado**
- Acceso limitado sin autenticación

✅ **Gestión de Perfil**
- Actualización de nombre de usuario
- Cambio de contraseña
- Visualización de estadísticas y logros

✅ **Manejo de Sesiones**
- Detección automática de sesión existente
- Refresh automático de tokens
- Manejo de callbacks OAuth

### Pendientes

❌ **Recuperación de Contraseña**
- El botón "¿Olvidaste tu contraseña?" está presente pero no implementado
- Falta servicio `resetPassword` en `backend/services/auth.js`
- Falta página/componente para reset de contraseña

❌ **Validación de Contraseña Actual**
- Al cambiar contraseña en el perfil, no se valida la contraseña actual
- Solo se pide la nueva contraseña y confirmación

❌ **Protección de Rutas**
- No hay sistema de rutas protegidas
- No hay redirección automática si no hay sesión

❌ **Verificación de Email**
- No hay verificación explícita de email después del registro
- El OTP actúa como verificación, pero no hay confirmación adicional

## 🐛 Problemas Conocidos

### 1. Conflicto de Nombres en App.jsx (CRÍTICO)

**Ubicación:** `src/App.jsx`

**Problema:** Se importa `needsPassword` como función desde `backend/services/user.js`, pero también se declara como estado con el mismo nombre:

```javascript
import { needsPassword } from '../backend/services/user.js';  // Función
// ...
const [needsPassword, setNeedsPassword] = useState(false);   // Estado
```

**Impacto:** La función importada se sobrescribe con el estado, causando errores cuando se intenta usar la función.

**Solución:** Renombrar el estado a `userNeedsPassword` o `requiresPassword`.

### 2. Falta Validación de Contraseña Actual

**Ubicación:** `src/pages/ProfilePage.jsx` (línea 164-192)

**Problema:** Al cambiar la contraseña, no se valida la contraseña actual antes de establecer la nueva.

**Impacto:** Cualquier usuario autenticado puede cambiar su contraseña sin conocer la actual (aunque Supabase puede requerirla en el backend).

**Solución:** Agregar campo para contraseña actual y validarla antes de actualizar.

### 3. Recuperación de Contraseña No Implementada

**Ubicación:** `src/components/auth/LoginForm.jsx` (línea 130)

**Problema:** El botón "¿Olvidaste tu contraseña?" tiene un handler vacío con TODO.

**Impacto:** Los usuarios no pueden recuperar su contraseña si la olvidan.

**Solución:** Implementar flujo completo de recuperación usando `supabase.auth.resetPasswordForEmail()`.

### 4. Falta Archivo .env.example

**Problema:** No hay un archivo de ejemplo para las variables de entorno.

**Impacto:** Los desarrolladores nuevos no saben qué variables necesitan configurar.

**Solución:** Crear `.env.example` con las variables necesarias (sin valores sensibles).

### 5. README Principal Genérico

**Problema:** El README principal es el genérico de Vite.

**Impacto:** Falta documentación específica del proyecto.

**Solución:** Este README reemplaza el anterior.

## 📝 Mejoras Pendientes

### Para un Login Completo y Robusto

1. **Recuperación de Contraseña**
   - Implementar `resetPasswordForEmail()` en `backend/services/auth.js`
   - Crear página `ResetPasswordPage.jsx`
   - Agregar ruta para el link de reset
   - Manejar tokens de reset

2. **Validación de Contraseña Actual**
   - Agregar campo en `ProfilePage.jsx` para contraseña actual
   - Validar antes de permitir cambio
   - Mostrar error si la contraseña actual es incorrecta

3. **Protección de Rutas**
   - Implementar sistema de rutas (React Router)
   - Crear componente `ProtectedRoute`
   - Redirigir a login si no hay sesión

4. **Manejo de Errores Mejorado**
   - Mensajes de error más específicos
   - Manejo de errores de red
   - Timeouts y retry logic

5. **Rate Limiting**
   - Limitar intentos de login fallidos
   - Bloquear temporalmente después de X intentos
   - Mostrar mensaje apropiado

6. **Verificación de Email**
   - Enviar email de bienvenida después del registro
   - Opción de reenviar email de verificación
   - Indicador visual de email verificado

7. **Sesiones Expirables**
   - Manejar expiración de tokens
   - Refresh automático antes de expirar
   - Redirigir a login si la sesión expiró

8. **Seguridad Adicional**
   - Validación de contraseña más estricta (mayúsculas, números, símbolos)
   - 2FA opcional
   - Logs de actividad de autenticación

## 📚 Documentación de Servicios

### Backend Services

#### Auth Service (`backend/services/auth.js`)

- `loginWithPassword(email, password)` - Iniciar sesión con email/contraseña
- `registerWithOTP(email, name)` - Registrar usuario y enviar código OTP
- `verifyOTP(email, token)` - Verificar código OTP
- `loginWithGoogle(redirectTo)` - Iniciar sesión con Google OAuth
- `logout()` - Cerrar sesión
- `getCurrentSession()` - Obtener sesión actual
- `onAuthStateChange(callback)` - Escuchar cambios de autenticación

#### User Service (`backend/services/user.js`)

- `updateUserName(name)` - Actualizar nombre de usuario
- `updateUserPassword(newPassword)` - Actualizar contraseña
- `setPasswordForGoogleUser(password)` - Establecer contraseña para usuario Google
- `getCurrentUser()` - Obtener usuario actual
- `needsPassword(user)` - Verificar si necesita establecer contraseña
- `getAccountType(user)` - Obtener tipo de cuenta

#### Quiz Service (`backend/services/quiz.js`)

- `getQuizzes()` - Obtener todos los quizzes
- `getQuizById(quizId)` - Obtener quiz por ID
- `saveQuizResult(userId, quizId, score, answers)` - Guardar resultado
- `getUserStats(userId)` - Obtener estadísticas del usuario

## 🔄 Flujo de Autenticación

### Registro con Email

1. Usuario completa `RegisterForm` (nombre, email, contraseña)
2. Se llama a `registerWithOTP()` que envía código por email
3. Usuario es redirigido a `LobbyPage` (verificación)
4. Usuario ingresa código OTP
5. Se verifica con `verifyOTP()`
6. Si hay contraseña, se establece con `updateUserPassword()`
7. Usuario autenticado → `ProfilePage`

### Login con Email/Contraseña

1. Usuario completa `LoginForm` (email, contraseña)
2. Se llama a `loginWithPassword()`
3. Si es exitoso → `ProfilePage`
4. Si falla → muestra error

### Login con Google

1. Usuario hace clic en "Continuar con Google"
2. Se llama a `loginWithGoogle()` que redirige a Google
3. Usuario autentica en Google
4. Google redirige de vuelta a la app
5. `onAuthStateChange` detecta el cambio
6. Si es usuario nuevo de Google sin contraseña → `SetPasswordPage`
7. Si ya tiene contraseña → `ProfilePage`

### Modo Invitado

1. Usuario hace clic en "Modo Invitado"
2. Se establece `user.type = 'guest'`
3. Acceso limitado a funcionalidades

## 📦 Dependencias Principales

- `@supabase/supabase-js` - Cliente de Supabase
- `react` / `react-dom` - Framework React
- `@radix-ui/*` - Componentes UI accesibles
- `react-hook-form` - Manejo de formularios
- `tailwindcss` - Framework CSS
- `lucide-react` - Iconos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado.

---

**Nota:** Este README reemplaza el README genérico de Vite. Para más detalles sobre el backend, consulta `backend/README.md`.
