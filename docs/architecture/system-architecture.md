# Sustain-Ability AI: System Architecture

## Overview
A dual-portal platform connecting Teachers (SDG Architects) and Students (Modular Sandbox) via Firebase real-time synchronization.

## Directory Structure
```plaintext
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication (Clerk/Firebase)
│   ├── teacher/          # Teacher Dashboard
│   └── student/          # Student Coding Lab
├── components/           # Shared UI (Sustainable Tech Design System)
│   ├── teacher/          # Classroom Radar, Heatmaps
│   ├── student/          # Monaco Editor, Progress Tracker
│   └── shared/           # Glassmorphism Layouts, Buttons
├── services/             # Core Logic
│   ├── ai/               # Gemini SDG Mapping & Roadmap Gen
│   ├── firebase/         # Firestore Sync & Auth
│   └── storage/          # Zustand State Management
├── hooks/                # Custom React Hooks (e.g., useSync)
├── lib/                  # Utilities (Code Merge, Validators)
└── types/                # TypeScript Interfaces (SDG Roadmap, etc.)
```

## State Management (Zustand)
- **Course Store**: Tracks the current course title and mapped SDG.
- **Module Store**: Tracks student progress (locked/unlocked) and saved code strings.
- **Merge Store**: Handles the final concatenation of module logic.

## AI & Logic Flow
1. **Teacher Input** -> `Gemini-3-Flash` -> `SDG Roadmap JSON`.
2. **Roadmap JSON** -> Firestore -> `Student Portal` (Auto-update).
3. **Student Code** -> `Vitest/Regex` -> `Module Unlock` -> `Zustand`.
4. **Final Sync** -> `Code Concatenation` -> `Live Preview`.

## Design System: "Sustainable Tech"
- **Color Palette**: 
  - Background: `slate-950`
  - Accent: `emerald-500`
  - Warning: `amber-500`
- **Effects**: Glassmorphism (backdrop-blur), slide-in animations (Framer Motion).
- **Typography**: Inter (UI), JetBrains Mono (Code).
