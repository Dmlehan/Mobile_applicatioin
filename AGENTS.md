# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# NoteSphere - Strict Agent Rules

## 1. Folder Structure
Ensure you follow this directory structure exactly. Do not create files outside of these folders:
- `app/` (Expo Router stack, tab, and details screens)
- `src/components/` (Generic reusable components)
- `src/firebase/` (Firebase client configs and wrappers)
- `src/redux/` (Redux store, hooks, and slices/)
- `src/services/` (Auth and Note business layer abstractions)
- `src/types/` (TypeScript interfaces)
- `src/hooks/` (Custom decoupled React hooks)
- `src/constants/` (COLORS, APP_CONFIG, etc.)
- `src/utils/` (Validation functions)
- `docs/` (Local phase markdown docs, must be ignored in `.gitignore`)

## 2. Clean Architecture & Code Patterns
- **Layer Flow**: Components & Screens -> Custom Hooks (`src/hooks`) -> Redux State (`src/redux`) & Services (`src/services`) -> Firebase Wrappers (`src/firebase`).
- Components or Screens must never call Firebase APIs directly.
- Use strict TypeScript checking everywhere. Never use `any` unless absolutely unavoidable. All files must resolve types cleanly.

## 3. Strict Verification & Phase-by-Phase Gating
- At the end of every phase, you MUST run:
  1. `npm run lint` (ESLint checks)
  2. `npx tsc --noEmit` (TypeScript strict check)
- Fix all lint warnings/errors and type issues before completing the phase.
- Create a phase markdown documentation file in `docs/` (e.g., `docs/phase1.md`).
- Execute a Git commit with the specified phase commit message.
- **CRITICAL**: After the commit, stop. Do NOT write any code for the next phase, do not install dependencies for the next phase, and do not advance. Simply summarize your work, show validation logs, and wait for explicit confirmation from the user to proceed.
