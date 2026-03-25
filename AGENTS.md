# AGENTS.md — Sustain-Ability AI Agentic Framework (ECC Edition)

## Core Orchestrator
- **Name**: `sustain-ability-lead`
- **Role**: Senior Systems Architect & Lead Dev.
- **Responsibility**: Decomposing features into isolated sub-tasks and reviewing sub-agent reports.

## Sub-Agents (Specialized Domains)
| Agent | Domain | Tools | Context Isolation |
|-------|--------|-------|-------------------|
| `ai-architect` | Gemini Mapping, Roadmap Gen | `genai-sdk`, `sqlite3` | **Strictly Isolated** |
| `frontend-specialist` | Sustainable Tech UI, Framer Motion | `tailwind`, `framer` | **Strictly Isolated** |
| `sandbox-engineer` | Monaco Editor, Snap Logic | `monaco`, `vitest` | **Strictly Isolated** |
| `qa-automation` | Browser Simulation, E2E | `playwright`, `headless-chrome` | **Strictly Isolated** |
| `ecc-auditor` | Security & Harness Integrity | `/harness-audit`, `/quality-gate` | **Isolated** |

## Execution Protocols (ECC v2026)
1. **Context Isolation**: No two agents share the same context window.
2. **Context Threshold**: If window hits 50% (monitored via `cc-status-line`), session MUST restart.
3. **Spec-First**: Agents only write code based on approved `docs/plans/*.md` files.
4. **Human Gate**: Senior (Teacher) MUST approve all `sub-agent-reports` before merging.
5. **Turbo Mode**: Use for package installations and non-logic tasks.
