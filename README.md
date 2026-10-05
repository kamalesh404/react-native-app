# TaskMaster — React Native Task Manager

[![Build APK](https://github.com/kamalesh404/react-native-app/actions/workflows/android-apk.yml/badge.svg)](https://github.com/kamalesh404/react-native-app/actions/workflows/android-apk.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A real, runnable task-management app built with **Expo + React Native + TypeScript**.
Offline-first, beautiful light/dark UI, search/filter/stats, and one-click APK builds via GitHub Actions.

## Features

- **Tasks** — create, edit, complete, delete, with notes
- **Categories** — Personal, Work, Shopping, Health, Study, Other (color-coded)
- **Priorities** — Low / Medium / High badges
- **Due dates** — YYYY-MM-DD with overdue highlighting
- **Search + filters** — text search, All/Active/Done, category chips
- **Stats tab** — progress %, total/done/due-today/overdue cards
- **Dark mode** — Auto / Light / Dark with persistence
- **Offline storage** — AsyncStorage, data survives restarts
- **Best UI** — cards, badges, bottom tabs, modal sheet, vector icons

## Run it (no errors)

```bash
git clone https://github.com/kamalesh404/react-native-app.git
cd react-native-app
npm install
npm start
```

- Press `a` for Android emulator, `i` for iOS simulator, `w` for web
- Or scan the QR code with **Expo Go** on your phone

> Requires Node 20+. No native modules beyond Expo Go — it just runs.

## Project structure

```
react-native-app/
├── App.tsx                     # Root app (tabs, state, theme)
├── index.js                    # Expo entry (registerRootComponent)
├── app.json                    # Expo config
├── eas.json                    # EAS build profiles
├── babel.config.js             # babel-preset-expo
├── src/
│   ├── types.ts                # Task, Category, Priority, Filter, Tab
│   ├── theme.ts                # light/dark themes + badge colors
│   ├── storage.ts              # AsyncStorage load/save + seed data
│   └── components/
│       ├── TaskItem.tsx        # Task row (toggle/edit/delete)
│       ├── AddTaskModal.tsx    # Create/edit sheet
│       ├── FilterBar.tsx       # Search + filters + categories
│       ├── StatsHeader.tsx     # Progress + stat cards
│       └── EmptyState.tsx      # Empty list view
├── assets/                     # icon, splash, adaptive-icon, favicon
└── .github/workflows/
    ├── android-apk.yml         # Typecheck + Gradle release APK
    └── eas-build.yml           # Optional EAS cloud build
```

## Build the APK

### Option A — Automatic (GitHub Actions, recommended)
1. Push to `main` — the `android-apk` workflow runs automatically
2. Go to **Actions → Build Android APK → Artifacts**
3. Download `TaskMaster-release-apk` and install on your phone

No secrets needed — it uses `expo prebuild` + Gradle locally in CI.

### Option B — EAS cloud build
1. `eas init` to set your real `extra.eas.projectId` in `app.json`
2. Add `EXPO_TOKEN` as a GitHub secret
3. Run the **EAS Cloud Build** workflow manually (or `eas build --platform android --profile preview`)

### Option C — Locally
```bash
npm install
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

## Scripts

| Script | What it does |
|--------|--------------|
| `npm start` | Expo dev server (QR + emulator) |
| `npm run android` / `ios` / `web` | Run on platform |
| `npm run typecheck` | `tsc --noEmit` (also runs in CI) |

## Tech

- Expo SDK 52, React 18.3, React Native 0.76, TypeScript
- `@react-native-async-storage/async-storage` for persistence
- `@expo/vector-icons` for icons, `expo-status-bar` for status bar
- No react-navigation — lightweight built-in tabs (fewer native deps, fewer errors)

## Contributing

1. Fork → feature branch → changes → `npx tsc --noEmit`
2. Commit with conventional messages (`feat:`, `fix:`, `docs:`)
3. Open a Pull Request

## License

MIT — see [LICENSE](LICENSE).
