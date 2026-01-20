# DharmGyaan Frontend - AI Coding Guidelines

## Project Overview
DharmGyaan is a Vite + React + TypeScript quiz application with Firebase authentication, Redux state management, and Material-UI theming. The app guides users through religion-specific knowledge quizzes with persistent user authentication.

## Architecture & Key Concepts

### Tech Stack
- **Build**: Vite 6.3.5 (dev: `npm run dev`, build: `npm run build`)
- **UI Framework**: React 18.3.1 with Material-UI 7.3.5
- **State Management**: Redux Toolkit 2.11.2
- **Backend**: Firebase (Auth, Firestore, Analytics)
- **Routing**: React Router DOM 7.11.0
- **Styling**: Material-UI themes + Emotion CSS-in-JS

### Feature-Based Directory Structure
Each feature (auth, questions, religion) follows a consistent pattern in `src/features/{feature}/`:
- `{feature}.types.ts` - TypeScript interfaces (e.g., `AuthUser`, `Questions`)
- `{feature}.services.ts` - Firebase/API calls (e.g., `googleAuthProvider()`)
- `{feature}.slice.ts` - Redux Toolkit slice with reducers
- `{feature}.hook.ts` - Custom React hooks that combine services + Redux (e.g., `useAuth()`)
- `{feature}.enum.ts` - Constants/enumerations (e.g., `Provider` enum)
- `index.ts` - Barrel exports

**Pattern Example**: Auth flow uses `googleAuthProvider()` (service) → `useAuth()` hook (handles dispatch) → Redux state → components.

### Redux Architecture
- Store configured in `src/store/store.ts` with auth reducer
- Typed dispatch/selector hooks: `src/store/useAppDispatch.ts` and `useAppSelector.ts`
- All Redux state updates go through Redux Toolkit slices with type-safe action creators
- Example: `authSlice.actions.updateUserInfo()` dispatched from `useAuth()` hook

### Theme Management
- Custom hook `useThemeContext()` provides `isDarkMode` boolean and `toggleTheme()` method
- MUI themes defined in `src/theme.tsx` with light/dark variants
- Theme context wraps entire app in `App.tsx` via `ThemeProvider`
- Uses Emotion for styled components (imported by MUI)

### Page Structure
Routes in `App.tsx`:
- `/signin` → SignIn page
- `/signup` → SignUp page  
- `/select-religion` → ReligionSelect page (choose which religion's quiz)
- `/quiz` → Quiz page (loads questions via `useQuestions()` hook)
- `/results` → Results page

## Developer Workflows

### Setup & Running
```bash
npm i                    # Install dependencies
npm run dev              # Start Vite dev server (typically http://localhost:5173)
npm run build            # Production build to dist/
```

### Firebase Configuration
Environment variables in `.env` (Vite uses `VITE_` prefix):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- All Firebase instances initialized in `src/utils/firebaseConfig.ts`

### Custom Hooks Pattern
When adding features, create custom hooks that:
1. Fetch data via service functions (Firebase calls)
2. Manage local state (loading, errors)
3. Dispatch Redux actions for shared state
4. Return typed interface (see `UseAuthReturn` in auth.hook.ts)

## Critical Patterns & Conventions

### Error Handling
Use `errorPrint()` utility from `src/utils/errorPrint.ts` for consistent error logging and user messages.

### Type Safety
- All Redux state is typed via `RootState` and `AppDispatch` inferred from store
- API responses typed via feature `{feature}.types.ts` files
- Components use strict TypeScript (`strict: true` recommended)

### API/Service Layer
- Firebase calls isolated in `{feature}.services.ts`
- No Firebase imports in components - use hooks instead
- Services return typed responses matching feature interfaces

### Component Styling
- Use Material-UI components for consistency
- Theme colors via `useThemeContext()` for dark/light mode
- Avoid raw CSS - leverage MUI's sx prop or styled-components from Emotion

## Cross-Component Communication
- **Shared State**: Auth user info via Redux (accessible via `useAppSelector(state => state.auth)`)
- **Theme State**: Via context (`useThemeContext()`)
- **Quiz State**: Managed in Quiz component locally, persisted via services/Redux as needed
- **Navigation**: React Router for page transitions; Redux for persistent auth state across navigations

## Key Files to Reference
- [src/store/store.ts](src/store/store.ts) - Redux configuration
- [src/features/auth/auth.hook.ts](src/features/auth/auth.hook.ts) - Example hook pattern
- [src/ThemeContext.tsx](src/ThemeContext.tsx) - Context API pattern
- [src/pages/Quiz.tsx](src/pages/Quiz.tsx) - Page component pattern with hooks
