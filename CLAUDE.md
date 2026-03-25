# CLAUDE.md — Sustain-Ability AI

## Project Vision
A high-fidelity SDG education platform. Teachers architect modular roadmaps; Students build them in a coding sandbox.

## Workflow: Spec-Driven / Compound Engineering
- **Profile**: `ECC_HOOK_PROFILE=strict`.
- **Spec-First**: No implementation without a Design Doc in `docs/plans/*.md`.
- **Quality Gate**: 100% test coverage mandatory for all core logic.
- **50% Context Rule**: Monitor `cc-status-line`. Restart session if context exceeds 50%.

## Commands
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Test**: `npm test` (Uses Vitest)
- **Lint**: `npm run lint`
- **Audit**: `python .agent/scripts/checklist.py .`

## Architectural Guidelines
- **Portals**: Teacher Dashboard (`/teacher`) and Student Lab (`/student`).
- **State**: Zustand stores in `src/services/storage`.
- **Backend**: Firebase Firestore for real-time roadmap synchronization.
- **Aesthetic**: "Sustainable Tech" (Dark Mode, Emerald-500, Glassmorphism).
- **Merge Utility**: Utility in `src/lib/merge.ts` for final code concatenation.
