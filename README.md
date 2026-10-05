# React Native Task Manager

A modern, offline-first task management app built with React Native, Expo, and TypeScript. Features cloud sync, push notifications, biometric auth, and beautiful UI.

## Features

- **Task Management** - Create, edit, delete, reorder, categorize tasks
- **Categories/Tags** - Color-coded, hierarchical, filterable
- **Due Dates & Reminders** - Date picker, push notifications, recurring tasks
- **Offline-First** - WatermelonDB/AsyncStorage with background sync
- **Cloud Sync** - Supabase/Firebase backend with conflict resolution
- **Push Notifications** - Expo Push / FCM / APNs with deep linking
- **Biometric Auth** - FaceID/TouchID + secure storage
- **Dark Mode** - System + manual toggle, theme persistence
- **Accessibility** - Screen reader, large text, VoiceOver support
- **Deep Linking** - `taskapp://task/123`, share extension

## Quick Start

### Prerequisites

- Node.js 20+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator
- Expo Go app on physical device (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/kamalesh404/react-native-app.git
cd react-native-app

# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

### Using Expo Go

1. Install Expo Go from App Store / Play Store
2. Run `npm start`
3. Scan QR code with Expo Go (iOS) or camera app (Android)

## Project Structure

```
react-native-app/
├── app/
│   ├── _layout.tsx          # Root layout with providers
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home / Task list
│   │   ├── categories.tsx   # Categories view
│   │   └── settings.tsx     # Settings
│   ├── screens/
│   │   ├── TaskDetail.tsx   # Task detail/edit
│   │   ├── CategoryEditor.tsx
│   │   └── Auth/
│   ├── components/
│   │   ├── TaskItem.tsx     # Task list item
│   │   ├── CategoryChip.tsx # Category badge
│   │   ├── DatePicker.tsx   # Custom date picker
│   │   └── SwipeActions.tsx # Swipe to delete/edit
│   ├── store/
│   │   ├── tasks.ts         # Zustand task store
│   │   ├── categories.ts    # Category store
│   │   └── sync.ts          # Sync state
│   ├── services/
│   │   ├── api.ts           # Backend API client
│   │   ├── storage.ts       # AsyncStorage wrapper
│   │   ├── notifications.ts # Push notification handler
│   │   └── sync.ts          # Sync engine
│   ├── hooks/
│   │   ├── useTasks.ts      # Task operations
│   │   ├── useCategories.ts
│   │   └── useBiometric.ts  # FaceID/TouchID
│   └── utils/
│       ├── date.ts          # Date formatting
│       └── validation.ts    # Input validation
├── assets/
│   ├── icons/
│   ├── fonts/
│   └── images/
├── App.tsx                   # Root component
├── app.json                  # Expo config
├── tsconfig.json             # TypeScript config
├── package.json
└── README.md
```

## Key Technologies

| Category | Technology |
|----------|------------|
| Framework | React Native 0.74 + Expo 52 |
| Language | TypeScript 5.5 |
| Navigation | Expo Router (file-based) |
| State | Zustand + React Query |
| Storage | AsyncStorage + WatermelonDB |
| Notifications | Expo Push / FCM / APNs |
| Auth | Expo SecureStore + Biometric |
| UI | NativeWind (Tailwind) + React Native Reanimated |
| Testing | Jest + React Native Testing Library |
| CI/CD | GitHub Actions + EAS Build |

## Configuration

### Environment Variables

Create `.env` from `.env.example`:

```bash
# API
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...

# Notifications
EXPO_PUBLIC_EXPO_PROJECT_ID=...
EXPO_PUBLIC_FCM_SENDER_ID=...

# Features
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASHLYTICS=false
```

### App Config (app.json)

```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "react-native-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icons/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/icons/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.kamalesh404.taskmaster"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icons/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.kamalesh404.taskmaster"
    },
    "web": {
      "favicon": "./assets/icons/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "expo-notifications",
      "expo-local-authentication"
    ]
  }
}
```

## Available Scripts

```bash
# Development
npm start          # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser

# Building
npm run build:ios     # Build iOS with EAS
npm run build:android # Build Android with EAS
npm run build:web     # Build for web

# Testing
npm test              # Run Jest tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report

# Linting
npm run lint          # ESLint
npm run format        # Prettier

# Type checking
npm run typecheck     # tsc --noEmit
```

## Architecture

### State Management

```
┌─────────────────────────────────────┐
│           React Query               │  ← Server state (API)
├─────────────────────────────────────┤
│           Zustand Store             │  ← Client state (UI)
│  ┌──────────┐  ┌────────────────┐  │
│  │ Tasks    │  │ Categories     │  │
│  │ - list   │  │ - list         │  │
│  │ - filter │  │ - active       │  │
│  │ - sort   │  │ - colors       │  │
│  └──────────┘  └────────────────┘  │
├─────────────────────────────────────┤
│       AsyncStorage / WatermelonDB   │  ← Persistence
└─────────────────────────────────────┘
```

### Sync Engine

```
User Action → Optimistic Update → Queue → Background Sync → Server
                    ↓                      ↓
              Immediate UI            Conflict Resolution
              Feedback                (Last-write-wins / Manual)
```

### Push Notifications

```
Expo Push Service → FCM/APNs → Device → Expo Notifications → App
                    ↓
              Deep Link Handling
              (taskapp://task/123)
```

## Testing

```bash
# Unit tests
npm test

# Component tests
npm test -- --testPathPattern=components

# E2E with Detox (requires setup)
npm run test:e2e

# Coverage
npm run test:coverage
```

## Deployment

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform ios
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Manual Build

```bash
# iOS (requires Xcode)
xcodebuild -workspace ios/TaskMaster.xcworkspace -scheme TaskMaster -configuration Release

# Android
cd android && ./gradlew bundleRelease
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub**: [@kamalesh404](https://github.com/kamalesh404)
- **Project**: [react-native-app](https://github.com/kamalesh404/react-native-app)