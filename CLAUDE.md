# CLAUDE.md — Auto-Grader Professional (Strict ECC Profile)

## Project Vision
A high-throughput, professional-grade AI grading system. Transitioned to **Everything Claude Code (ECC)** Strict Spec-Driven Engineering.

## Workflow: Spec-Driven / Compound Engineering
- **Profile**: `ECC_HOOK_PROFILE=strict` active.
- **Spec-First**: No implementation without an approved Design Doc in `docs/plans/*.md`.
- **Compound Engineering**: Decompose features into isolated sub-tasks for specialized agents.
- **50% Context Rule**: Monitor `cc-status-line`. Restart session if context exceeds 50% to prevent "context poisoning."

## Commands
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Audit**: `npx ecc harness:audit`
- **Quality Gate**: `npm run quality-gate` (Defines 100% coverage requirement).
- **Brainstorm**: `ecc superpowers brainstorm`
- **Write Plan**: `ecc superpowers write-plan`
- **Execute**: `ecc superpowers execute-plan`

## Architectural Guidelines
- **Offline-First**: WhatsApp-style sync with local SQLite.
- **Image Compaction**: Auto-resize and compress before storage.
- **Strict Quality**: 100% test coverage mandatory.
- **Relative Networking**: Use relative API paths for cross-port stability.
