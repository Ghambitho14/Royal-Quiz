# Backend - Quiz Royal

Esta carpeta contiene toda la lógica del backend y servicios de la aplicación.

## Estructura

```
backend/
├── config/
│   └── supabase.js          # Configuración de Supabase
├── services/
│   ├── auth.js              # Servicios de autenticación
│   ├── user.js              # Servicios de usuario
│   └── quiz.js              # Servicios de quiz
├── utils/
│   └── helpers.js           # Utilidades y funciones auxiliares
├── index.js                 # Punto de entrada (exporta todos los servicios)
└── README.md                # Este archivo
```

## Servicios

### Auth Service (`services/auth.js`)
- `loginWithPassword()` - Iniciar sesión con email/contraseña
- `registerWithOTP()` - Registrar usuario con código OTP
- `verifyOTP()` - Verificar código OTP
- `loginWithGoogle()` - Iniciar sesión con Google OAuth
- `logout()` - Cerrar sesión
- `getCurrentSession()` - Obtener sesión actual
- `onAuthStateChange()` - Escuchar cambios de autenticación

### User Service (`services/user.js`)
- `updateUserName()` - Actualizar nombre de usuario
- `updateUserPassword()` - Actualizar contraseña
- `setPasswordForGoogleUser()` - Establecer contraseña para usuario de Google
- `getCurrentUser()` - Obtener usuario actual
- `needsPassword()` - Verificar si necesita establecer contraseña
- `getAccountType()` - Obtener tipo de cuenta

### Quiz Service (`services/quiz.js`)
- `getQuizzes()` - Obtener todos los quizzes
- `getQuizById()` - Obtener quiz por ID
- `saveQuizResult()` - Guardar resultado de quiz
- `getUserStats()` - Obtener estadísticas del usuario

## Uso

```javascript
// Importar servicios
import { loginWithPassword, loginWithGoogle } from '../backend/services/auth.js';
import { updateUserName } from '../backend/services/user.js';
import { getQuizzes } from '../backend/services/quiz.js';

// Usar servicios
const result = await loginWithPassword('email@example.com', 'password');
if (result.success) {
  // Usuario autenticado
}
```

## Variables de Entorno

Asegúrate de tener estas variables en tu archivo `.env`:

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key (opcional, solo para admin)
```

