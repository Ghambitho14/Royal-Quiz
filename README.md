# 🏗️ Quiz Royal - Arquitectura Modular

## 📂 Estructura del Proyecto

```
quiz-royal/
├── /types                    # Tipos TypeScript compartidos
│   └── index.ts             # User, Player, Question, GameState, etc.
│
├── /constants               # Constantes y configuraciones
│   └── index.ts             # AVATAR_COLORS, GAME_CONFIG, ERROR_MESSAGES
│
├── /hooks                   # Custom hooks reutilizables
│   ├── useAuth.ts          # Hook de autenticación (signUp, signIn, signOut)
│   ├── useGameTimer.ts     # Hook del temporizador del juego
│   ├── useTextRotation.ts  # Hook para rotar texto animado
│   └── index.ts            # Exportaciones centralizadas
│
├── /utils                   # Utilidades y helpers
│   ├── gameHelpers.ts      # calculateScore, sortPlayers, formatTime, etc.
│   └── /supabase           # Cliente y config de Supabase
│
├── /components
│   ├── /common             # Componentes comunes reutilizables
│   │   ├── LoadingSpinner.tsx    # Spinner de carga
│   │   ├── PlayerAvatar.tsx      # Avatar de jugador
│   │   ├── GlassCard.tsx         # Card con glassmorphism
│   │   ├── StageBackground.tsx   # Fondo con efectos de escenario
│   │   └── index.ts              # Exportaciones
│   │
│   ├── /login              # Módulos de la pantalla de login
│   │   ├── LoginScreen.tsx       # Pantalla principal (contenedor)
│   │   ├── LoginHeader.tsx       # Logo y texto animado
│   │   ├── LoginForm.tsx         # Formulario de email/password
│   │   ├── GuestLoginButton.tsx  # Botón de modo invitado
│   │   └── index.ts              # Exportaciones
│   │
│   ├── /lobby              # Módulos del lobby (próximamente)
│   ├── /game               # Módulos del juego (próximamente)
│   ├── /results            # Módulos de resultados (próximamente)
│   │
│   ├── /ui                 # Componentes shadcn/ui
│   │   └── ...
│   │
│   └── quiz-royal-logo.tsx # Logo animado de Quiz Royal
│
├── /styles
│   └── globals.css         # Estilos globales y animaciones
│
├── /supabase
│   └── /functions/server   # Backend (Edge Functions)
│
└── App.tsx                 # Componente principal
```

## 🎯 Principios de la Arquitectura

### 1. **Separación de Responsabilidades**
- Cada módulo tiene una responsabilidad clara y única
- Los componentes no contienen lógica de negocio compleja
- Los hooks manejan la lógica reutilizable

### 2. **Reutilización**
- Componentes comunes en `/components/common`
- Hooks personalizados en `/hooks`
- Utilidades compartidas en `/utils`

### 3. **Tipos Compartidos**
- Todos los tipos en `/types/index.ts`
- Importación centralizada: `import type { User, Player } from './types'`

### 4. **Constantes Centralizadas**
- Configuración del juego en `/constants/index.ts`
- Evita magic numbers y strings dispersos

### 5. **Exportaciones Limpias**
- Cada carpeta tiene su `index.ts` para exportaciones
- Importaciones más limpias: `import { LoginScreen } from './components/login'`

## 🔄 Flujo de Datos

```
App.tsx (Estado Global)
   ↓
┌──────────────────────────────┐
│  LoginScreen (Container)     │
│  ┌────────────────────────┐  │
│  │  useAuth() hook        │  │
│  │  ├─ signUp()           │  │
│  │  ├─ signIn()           │  │
│  │  └─ signInAsGuest()    │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │  LoginHeader           │  │
│  │  └─ useTextRotation()  │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │  LoginForm             │  │
│  │  └─ LoadingSpinner     │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

## 📝 Guía de Uso

### Crear un nuevo componente común

```tsx
// /components/common/MiComponente.tsx
export function MiComponente({ prop1, prop2 }: MiComponenteProps) {
  return <div>...</div>;
}

// /components/common/index.ts
export { MiComponente } from './MiComponente';

// Uso
import { MiComponente } from './components/common';
```

### Crear un nuevo hook

```tsx
// /hooks/useMiHook.ts
export function useMiHook() {
  // lógica
  return { data, loading, error };
}

// /hooks/index.ts
export { useMiHook } from './useMiHook';

// Uso
import { useMiHook } from './hooks';
```

### Agregar una constante

```tsx
// /constants/index.ts
export const MI_CONSTANTE = {
  VALOR_1: 'valor',
  VALOR_2: 100,
} as const;

// Uso
import { MI_CONSTANTE } from './constants';
```

### Agregar un tipo

```tsx
// /types/index.ts
export interface MiTipo {
  id: string;
  name: string;
}

// Uso
import type { MiTipo } from './types';
```

## 🎨 Componentes Comunes Disponibles

- **LoadingSpinner**: Spinner de carga con 3 tamaños (sm, md, lg)
- **PlayerAvatar**: Avatar circular con iniciales y color
- **GlassCard**: Card con efecto glassmorphism (3 variantes)
- **StageBackground**: Fondo con efectos de escenario TV animados

## 🪝 Hooks Disponibles

- **useAuth**: Autenticación completa (signUp, signIn, signOut, checkSession)
- **useGameTimer**: Temporizador con start, pause, resume, reset
- **useTextRotation**: Rotación automática de textos con intervalo configurable

## 🛠️ Utilidades Disponibles

- **calculateScore**: Calcula puntaje según acierto y tiempo
- **sortPlayersByScore**: Ordena jugadores por puntaje
- **getPlayerInitials**: Obtiene iniciales del nombre
- **generateSampleQuestions**: Genera preguntas de ejemplo
- **shuffleArray**: Mezcla un array aleatoriamente
- **formatTime**: Formatea segundos a MM:SS

## 🚀 Próximos Pasos

- [ ] Modularizar GameLobby
- [ ] Modularizar QuestionGame
- [ ] Modularizar GameResults
- [ ] Crear servicios para API calls
- [ ] Agregar tests unitarios
- [ ] Documentar cada módulo

## 📚 Beneficios

✅ **Mantenibilidad**: Código organizado y fácil de mantener
✅ **Escalabilidad**: Fácil agregar nuevas features
✅ **Reutilización**: Componentes y hooks compartidos
✅ **Testing**: Módulos pequeños y testeables
✅ **Colaboración**: Estructura clara para equipo
✅ **Performance**: Imports específicos, mejor tree-shaking
