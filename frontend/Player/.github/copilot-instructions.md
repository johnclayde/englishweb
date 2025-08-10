# Copilot Instructions for englishweb/frontend/Player

## Project Overview
- This is a React + TypeScript frontend, built with Vite and using HMR (Hot Module Replacement).
- The codebase is organized by feature: components, context, data, and services.
- Audio player logic is managed via React context (`src/context/audio-player-context.tsx`).
- Tracks data is loaded from static files (`src/data/engtracks.ts`) and can be fetched via async services (`src/data/dataService.tsx`).

## Key Architectural Patterns
- **Context for State:** Audio player state (current track, playback, progress, etc.) is provided via a custom React context. Always use `useAudioPlayerContext()` for accessing or updating player state.
- **Service Layer:** Data fetching is abstracted in service files (e.g., `dataService.tsx`). Use async functions like `getAllSongs()` for API calls.
- **Error Handling:** Components like `TrackInfo.tsx` use `react-error-boundary` for robust error handling. Wrap risky UI logic in `<ErrorBoundary>` and provide a fallback UI.
- **Component Structure:** UI is split into small, focused components (e.g., `Controls.tsx`, `TrackInfo.tsx`, `PlayList.tsx`). Each component is responsible for a single part of the player UI.
- **Styling:** Tailwind CSS is used for all styling. Use utility classes for layout and appearance. Avoid custom CSS unless necessary.

## Developer Workflows
- **Build:** Use Vite for local development and builds. Run `npm run dev` to start the dev server.
- **Linting:** ESLint is configured for TypeScript and React. See `README.md` for extending lint rules. Use `npm run lint` to check code quality.
- **Testing:** (No test setup found in README; add details if tests exist.)
- **Debugging:** Use browser dev tools and React DevTools for UI debugging. Console logs are used for state inspection in components.

## Project-Specific Conventions
- **Track Data:** Track objects must have `title`, `src`, `author`, and `thumbnail` fields. Always check for `currentTrack` existence before accessing properties.
- **Error Boundaries:** Use `ErrorBoundary` for any component that renders track data or external resources.
- **Flexbox Layouts:** Use `flex flex-row` for horizontal layouts and `flex flex-col` for vertical. Always use valid Tailwind classes; avoid custom values like `p-[0.5rem_10px]`.
- **Async Data:** All data fetching should be done via service functions. Do not fetch directly in components.

## Integration Points
- **API:** All song data is fetched via `/song` endpoints using Axios (`http-common`).
- **Icons:** Use `react-icons/bs` for UI icons.
- **Media:** Audio and image files are stored in `/media` and referenced via relative paths in components.

## Examples
- To fetch all songs: `const songs = await getAllSongs();`
- To update the current track: `setCurrentTrack(track); setIsPlaying(true);`
- To display a track thumbnail: `<img src={"../../" + currentTrack.thumbnail} />`

## Key Files & Directories
- `src/components/` — UI components
- `src/context/audio-player-context.tsx` — Player state/context
- `src/data/engtracks.ts` — Static track data
- `src/data/dataService.tsx` — Async data service
- `src/services/http-common.ts` — Axios config
- `/media/` — Audio/image assets

---
If any conventions or workflows are unclear, please ask for clarification or provide missing details to improve these instructions.
