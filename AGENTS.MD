# 🤖 AGENTS.MD - QuizRoyal

**Documentación para Agentes de IA**  
Este documento proporciona contexto completo sobre la arquitectura, estructura y convenciones del proyecto QuizRoyal para facilitar el trabajo de agentes de IA.

---

## 📋 Visión General del Proyecto

**QuizRoyal** es una plataforma de quiz competitivo en tiempo real diseñada para ofrecer partidas rápidas, intensas y totalmente interactivas. Combina un sistema de salas multijugador, preguntas dinámicas y lógica de juego controlada desde un backend seguro.

### Objetivo Principal
Crear un ecosistema donde cada partida se sienta como un mini-torneo donde estrategia, velocidad y conocimiento se mezclan.

### Visión a Futuro
- Más modos de juego
- Torneos globales
- Dashboards de rendimiento
- Transformar el conocimiento en un deporte

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

**Frontend:**
- React 19.2.0
- React Router DOM 7.9.6
- Vite 7.2.4
- Tailwind CSS 4.1.17
- Radix UI (componentes accesibles)
- Lucide React (iconos)

**Backend/Servicios:**
- Supabase (PostgreSQL + Auth + Real-time)
- Servicios modulares en JavaScript ES6

**Estilos:**
- Tailwind CSS (utilidades)
- CSS Modules (componentes específicos)
- Variables CSS personalizadas

### Estructura de Directorios

```
Quiz/
├── backend/                    # Lógica de backend y servicios
│   ├── config/
│   │   └── supabase.js        # Configuración de Supabase
│   ├── services/
│   │   ├── auth.js            # Servicios de autenticación
│   │   ├── user.js            # Servicios de usuario
│   │   └── quiz.js            # Servicios de quiz
│   ├── utils/
│   │   └── helpers.js         # Utilidades y funciones auxiliares
│   ├── index.js               # Punto de entrada (exporta todos los servicios)
│   └── README.md
│
├── src/                        # Código fuente del frontend
│   ├── features/              # Features organizadas por dominio
│   │   ├── auth/
│   │   │   ├── components/    # Componentes específicos de auth
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── VerificationCode.jsx
│   │   │   └── pages/         # Páginas de auth
│   │   │       ├── LoginPage.jsx
│   │   │       ├── LobbyPage.jsx
│   │   │       └── SetPasswordPage.jsx
│   │   └── profile/
│   │       └── pages/
│   │           └── ProfilePage.jsx
│   │
│   ├── shared/                # Código compartido
│   │   ├── components/ui/     # Componentes UI reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── Label.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Dialog.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── AnimatedText.jsx
│   │   └── context/
│   │       └── AuthContext.jsx # Contexto global de autenticación
│   │
│   ├── routes/                # Sistema de rutas
│   │   ├── AppRoutes.jsx      # Definición de todas las rutas
│   │   ├── ProtectedRoute.jsx # Wrapper para rutas protegidas
│   │   └── PublicRoute.jsx    # Wrapper para rutas públicas
│   │
│   ├── lib/                   # Librerías y utilidades
│   │   ├── supabase.js        # Re-exporta cliente Supabase
│   │   └── utils.js           # Utilidades (cn para clases CSS)
│   │
│   ├── styles/                # Estilos organizados
│   │   ├── Colors.css         # Variables de colores
│   │   ├── components/        # Estilos por componente
│   │   └── pages/             # Estilos por página
│   │
│   ├── App.jsx                # Componente raíz
│   └── main.jsx              # Punto de entrada React
│
├── public/                    # Archivos estáticos
├── index.html                 # HTML base
├── package.json
├── vite.config.js
├── tailwind.config.js
├── Descripcion.md             # Descripción oficial del proyecto
├── FLUJO_ARCHIVOS.md          # Documentación detallada de flujos
└── VERIFICACION_PROYECTO.md   # Verificación del proyecto
```

---

## 🔄 Flujo de la Aplicación

### Punto de Entrada
```
index.html
  └──> src/main.jsx
        └──> src/App.jsx
              ├──> BrowserRouter (react-router-dom)
              └──> AuthProvider (AuthContext.jsx)
                    └──> AppRoutes.jsx
```

### Contexto de Autenticación
El `AuthContext` es el único lugar donde se maneja el estado global de autenticación:
- Gestiona sesiones de usuario
- Detecta usuarios invitados
- Maneja usuarios de Google sin contraseña
- Proporciona `useAuth()` hook para toda la aplicación

### Sistema de Rutas

**Rutas definidas:**
- `/` → Redirige según autenticación
- `/login` → LoginPage (pública)
- `/verify` → LobbyPage (verificación OTP, pública)
- `/set-password` → SetPasswordPage (usuarios Google)
- `/profile` → ProfilePage (protegida)
- `*` → 404, redirige a `/`

**Protección de Rutas:**
- `ProtectedRoute`: Requiere autenticación (permite invitados)
- `PublicRoute`: Redirige si ya estás autenticado

---

## 🔐 Sistema de Autenticación

### Métodos de Autenticación

1. **Email/Contraseña** (`loginWithPassword`)
   - Login tradicional con credenciales

2. **OTP (One-Time Password)** (`registerWithOTP` + `verifyOTP`)
   - Registro con código enviado por email
   - Verificación en `/verify`

3. **Google OAuth** (`loginWithGoogle`)
   - Autenticación con Google
   - requerir establecer contraseña después

4. **Modo Invitado**
   - Acceso sin autenticación
   - Funcionalidad limitada

### Servicios de Autenticación

**`backend/services/auth.js`:**
- `loginWithPassword(email, password)`
- `registerWithOTP(email, name)`
- `verifyOTP(email, token)`
- `loginWithGoogle()`
- `logout()`
- `getCurrentSession()`
- `onAuthStateChange(callback)`
- `validateCurrentPassword(email, password)`

**`backend/services/user.js`:**
- `updateUserName(name)`
- `updateUserPassword(newPassword, currentPassword?, userEmail?)`
- `setPasswordForGoogleUser(password)`
- `getCurrentUser()`
- `needsPassword(user)`
- `getAccountType(user)`
- `createUserProfile(userId, email, name)`

---

## 🎮 Sistema de Quiz (Futuro)

### Servicios de Quiz

**`backend/services/quiz.js`:**
- `getQuizzes()` - Obtener todos los quizzes
- `getQuizById(quizId)` - Obtener quiz por ID
- `saveQuizResult(userId, quizId, score, answers)` - Guardar resultado
- `getUserStats(userId)` - Obtener estadísticas del usuario

### Características Planificadas
- Partidas multijugador en tiempo real (Socket.IO)
- Sistema de lobby inteligente
- Motor de preguntas expandible
- Categorías y dificultad
- Lógica antifraude (calculada en servidor)
- Ranking y estadísticas

---

## 🎨 Componentes UI

### Componentes Compartidos (`src/shared/components/ui/`)

Todos los componentes UI son reutilizables y no contienen lógica de negocio:

- **Button.jsx** - Botón con variantes (Radix UI Slot)
- **Input.jsx** - Input básico
- **InputField.jsx** - Campo con label e icono
- **Label.jsx** - Etiqueta de formulario (Radix UI)
- **Card.jsx** - Contenedor de tarjeta
- **Modal.jsx** - Contenedor modal
- **Dialog.jsx** - Diálogo modal (Radix UI)
- **Logo.jsx** - Logo de la aplicación
- **AnimatedText.jsx** - Texto animado

### Convenciones de Estilos

- **Tailwind CSS** para utilidades y layout
- **CSS Modules** para estilos específicos de componentes
- Función `cn()` de `lib/utils.js` para combinar clases (clsx + tailwind-merge)
- Variables CSS en `src/styles/Colors.css`

### Tema de Colores
```javascript
primary: {
  orange: '#FF6B35',
  blue: '#3B82F6',
}
gold: {
  DEFAULT: '#FFD700',
  light: '#FFE55C',
}
```

---

## 📦 Patrones y Convenciones

### Importaciones

**Backend:**
```javascript
// El backend está en la raíz, NO dentro de src/
import { loginWithPassword } from '../../../backend/services/auth.js';
```

**Features:**
```javascript
// Features importan desde shared y backend
import { useAuth } from '../../shared/context/AuthContext';
import { updateUserName } from '../../../backend/services/user.js';
```

**Componentes UI:**
```javascript
// Componentes UI importan solo utilidades
import { cn } from '../../lib/utils';
```

### Manejo de Estado

- **Estado Global:** Solo `AuthContext` para autenticación
- **Estado Local:** React hooks (`useState`, `useEffect`)
- **No hay Redux/Zustand:** El proyecto es lo suficientemente simple para Context API

### Manejo de Errores

Los servicios del backend retornan objetos con formato:
```javascript
{
  success: boolean,
  data?: any,
  error?: string
}
```

### Formateo de Código

- **Tabulación** para indentación (no espacios)
- **ES6 Modules** (import/export)
- **JavaScript** (no TypeScript actualmente)

---

## 🔌 Integración con Supabase

### Configuración

**`backend/config/supabase.js`:**
- Exporta `supabase` (cliente para frontend)
- Exporta `supabaseAdmin` (cliente para backend, opcional)

### Variables de Entorno Requeridas

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key (opcional)
```

### Tablas de Base de Datos (Inferidas)

- `quizzes` - Almacena quizzes
- `quiz_results` - Almacena resultados de partidas
- Tablas de autenticación manejadas por Supabase Auth

---

## 🚀 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo (Vite)
npm run build    # Construye para producción
npm run lint     # Ejecuta ESLint
npm run preview  # Previsualiza build de producción
```

---

## 📝 Flujos de Usuario Principales

### 1. Login con Email/Contraseña
```
LoginForm → LoginPage → auth.loginWithPassword() 
  → AuthContext.updateUser() → Navega a /profile
```

### 2. Registro con OTP
```
RegisterForm → LoginPage → auth.registerWithOTP() 
  → localStorage.setItem('pendingVerification') 
  → Navega a /verify 
  → VerificationCode → auth.verifyOTP() 
  → user.updateUserPassword() 
  → AuthContext.updateUser() 
  → Navega a /profile
```

### 3. Login con Google
```
LoginForm → LoginPage → auth.loginWithGoogle() 
  → OAuth callback 
  → AuthContext (detecta si necesita password) 
  → Navega a /set-password o /profile
```

### 4. Modo Invitado
```
LoginForm → LoginPage → AuthContext.updateUser({ type: 'guest' }) 
  → Navega a /profile (con limitaciones)
```

---

## 🛠️ Guías para Agentes de IA

### Al Trabajar con el Código

1. **Siempre revisa código existente** antes de crear nuevo código
2. **Evita duplicación** - busca componentes/servicios similares
3. **Usa la estructura de features** - organiza por dominio, no por tipo
4. **Mantén componentes UI reutilizables** - sin lógica de negocio
5. **Sigue el patrón de servicios** - toda lógica de backend en `backend/services/`
6. **Usa el contexto de autenticación** - no crees nuevos sistemas de estado global

### Al Agregar Nuevas Features

1. Crea carpeta en `src/features/[feature-name]/`
2. Organiza en `components/` y `pages/`
3. Crea servicios en `backend/services/[feature].js` si es necesario
4. Agrega rutas en `src/routes/AppRoutes.jsx`
5. Usa componentes UI existentes cuando sea posible

### Al Modificar Autenticación

1. Modifica `backend/services/auth.js` o `backend/services/user.js`
2. Actualiza `AuthContext.jsx` si cambia el estado
3. Verifica que todas las rutas sigan funcionando
4. Prueba todos los métodos de autenticación

### Al Agregar Componentes UI

1. Crea en `src/shared/components/ui/`
2. Usa Radix UI cuando sea posible para accesibilidad
3. Aplica estilos con Tailwind + CSS Modules
4. Exporta desde el componente
5. Documenta props y uso

---

## 🔮 Características Futuras (Según Descripción)

### Implementaciones Planificadas

1. **Socket.IO para Tiempo Real**
   - Partidas multijugador sincronizadas
   - Sistema de lobby en tiempo real
   - Manejo de desconexiones

2. **Motor de Preguntas**
   - Categorías dinámicas
   - Sistema de dificultad
   - Lógica antifraude en servidor

3. **Sistema de Ranking**
   - Clasificaciones globales
   - Estadísticas detalladas
   - Historial de partidas

4. **Modos de Juego**
   - Diferentes variantes de quiz
   - Torneos
   - Modo entrenamiento

---

## ⚠️ Notas Importantes

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

6. **Servidores:**
   - Siempre mata servidores anteriores antes de iniciar nuevos
   - Usa `npm run dev` para desarrollo

---

## 📚 Documentación Adicional

- **FLUJO_ARCHIVOS.md** - Flujo detallado de todos los archivos
- **VERIFICACION_PROYECTO.md** - Verificación completa del proyecto
- **Descripcion.md** - Descripción oficial y visión del proyecto
- **backend/README.md** - Documentación del backend

---

## 🎯 Resumen Rápido para Agentes

**¿Qué es este proyecto?**
Plataforma de quiz competitivo en tiempo real con autenticación completa.

**¿Cómo está estructurado?**
Feature-based architecture con backend modular y componentes UI compartidos.

**¿Dónde está la autenticación?**
`backend/services/auth.js` y `src/shared/context/AuthContext.jsx`

**¿Dónde están los componentes UI?**
`src/shared/components/ui/`

**¿Dónde se definen las rutas?**
`src/routes/AppRoutes.jsx`

**¿Cómo se maneja el estado?**
Solo `AuthContext` para autenticación, hooks locales para el resto.

**¿Qué tecnologías usa?**
React + Vite + Tailwind + Supabase + Radix UI

---

## 🎯 Áreas de Trabajo (Features)

### ✅ Implementadas

1. **Autenticación (Auth)**
   - Login con Email/Contraseña
   - Registro con OTP (8 dígitos)
   - Login con Google OAuth
   - Modo Invitado
   - Verificación de email
   - Gestión de sesiones

### 🚧 En Desarrollo / Planificadas

2. **Perfil de Usuario (Profile)**
   - Visualización de perfil
   - Actualización de nombre
   - Cambio de contraseña
   - Vinculación con Google
   - Estadísticas básicas

3. **Lobby/Salas (Lobby)**
   - Creación de salas
   - Unirse a salas
   - Lista de salas disponibles
   - Estado de jugadores en sala

4. **Sala de Juego (GameRoom)**
   - Partida en tiempo real
   - Sistema de preguntas
   - Puntuación y ranking
   - Temporizador de respuestas

---

## 🗄️ Estructura de Base de Datos (Supabase)

### Tabla: `public.users`

**Descripción:** Tabla principal de perfiles de usuario. Extiende la información de `auth.users` con datos del juego.
**RIVISA IGUAL LA BASE DE DATOS DE SUPABASE CON MCP PARA VERIFICAR**

**Columnas:**
- `id` (uuid, PRIMARY KEY) - Referencia a `auth.users.id`
- `email` (text, NOT NULL) - Email del usuario
- `name` (text, nullable) - Nombre del usuario
- `level` (integer, nullable, default: 1) - Nivel del usuario
- `points` (integer, nullable, default: 0) - Puntos acumulados
- `ranking` (text, nullable, default: '#---') - Ranking del usuario
- `achievements` (integer[], nullable, default: []) - Array de logros obtenidos
- `created_at` (timestamptz, nullable, default: now()) - Fecha de creación
- `updated_at` (timestamptz, nullable, default: now()) - Fecha de última actualización

**Índices:**
- `users_pkey` - PRIMARY KEY en `id`
- `idx_users_email` - INDEX en `email` (para búsquedas rápidas)

**Políticas RLS (Row Level Security):**
- **RLS Habilitado:** Sí
- **"Users can view own profile"** (SELECT) - Usuarios pueden ver solo su propio perfil
- **"Users can insert own profile"** (INSERT) - Usuarios pueden insertar su propio perfil
- **"Users can update own profile"** (UPDATE) - Usuarios pueden actualizar solo su propio perfil

**Foreign Keys:**
- `users_id_fkey`: `public.users.id` → `auth.users.id`

**Notas:**
- La tabla está vinculada directamente con `auth.users` de Supabase
- Los usuarios solo pueden acceder a su propio registro (RLS)
- Preparada para sistema de puntos, niveles, ranking y logros

---

### Tablas Futuras (Mencionadas en el Código)

**`quizzes`** - Almacenará los quizzes disponibles
- Referenciada en `backend/services/quiz.js` → `getQuizzes()`, `getQuizById()`
- Aún no creada en la base de datos

**`quiz_results`** - Almacenará los resultados de las partidas
- Referenciada en `backend/services/quiz.js` → `saveQuizResult()`, `getUserStats()`
- Aún no creada en la base de datos
- Estructura esperada (inferida del código):
  - `user_id` (uuid, FK → users.id)
  - `quiz_id` (uuid, FK → quizzes.id)
  - `score` (integer)
  - `answers` (jsonb o similar)
  - `correct_answers` (integer)
  - `completed_at` (timestamptz)

---

### Esquemas del Sistema Supabase

**`auth`** - Autenticación de Supabase
- `users` - Usuarios de autenticación
- `sessions` - Sesiones activas
- `refresh_tokens` - Tokens de refresco
- `identities` - Identidades OAuth
- Otras tablas del sistema de auth

**`storage`** - Almacenamiento de archivos
- `buckets` - Buckets de almacenamiento
- `objects` - Archivos almacenados

**`realtime`** - Funcionalidad en tiempo real
- `messages` - Mensajes en tiempo real
- `subscription` - Suscripciones

**`vault`** - Secretos
- `secrets` - Almacenamiento de secretos

---

### Información del Proyecto Supabase

- **Project ID:** `kslrmbsztayqqiuvnrwo`
- **Project Name:** Quiz-Royal
- **Region:** us-east-2
- **Status:** ACTIVE_HEALTHY
- **Database Version:** PostgreSQL 17.6.1.054

---

**Última actualización:** 2025  
**Versión del proyecto:** 0.0.0 (desarrollo activo)

