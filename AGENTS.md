# AGENTS.md — Auto-Grader Agentic Framework (Compound Engineering)

## Core Orchestrator
- **Name**: `auto-grader-lead`
- **Role**: Senior Systems Architect & Lead Dev.
- **Responsibility**: Decomposing features into isolated sub-tasks and reviewing sub-agent reports.

## Sub-Agents (Specialized Domains)
| Agent | Domain | Tools | Context Isolation |
|-------|--------|-------|-------------------|
| `vision-specialist` | OpenCV, Image Processing | `opencv-python`, `canvas` | **Strictly Isolated** |
| `grading-logic` | Gemini Batch API, Semantic Matching | `genai-sdk`, `sqlite3` | **Strictly Isolated** |
| `security-auditor` | Auth (OAuth 2.0), Data Privacy | `ecc-agentshield` | **Strictly Isolated** |
| `qa-automation` | Performance Benchmarking, E2E | `playwright`, `pytest` | **Strictly Isolated** |

## Execution Protocols (Strict ECC)
1. **Context Isolation**: No two agents share the same context window.
2. **Context Threshold**: If window hits 50% (monitored via `cc-status-line`), session MUST restart.
3. **Spec-First**: Agents only write code based on approved `docs/plans/*.md` files.
4. **Human Gate**: Senior (Teacher) MUST approve all `sub-agent-reports` before merging.
5. **Continuous Learning**: Auto-extract coding instincts into the local skills library.
