---
description: Initialize Everything Claude Code (ECC) standards and local rules.
---

1. Install the ECC Plugin marketplace
// turbo
2. /plugin marketplace add affaan-m/everything-claude-code

3. Clone the ECC repository for local rules extraction
// turbo
4. git clone https://github.com/affaan-m/everything-claude-code.git /tmp/ecc-repo

5. Install TypeScript/Frontend specific rules to the local workspace
// turbo
6. mkdir -p .claude/rules && cp -r /tmp/ecc-repo/rules/common/* .claude/rules/ && cp -r /tmp/ecc-repo/rules/typescript/* .claude/rules/

7. Activate the Performance Harness
// turbo
8. ECC_HOOK_PROFILE=strict /harness-audit

9. Clean up temporary files
// turbo
10. rm -rf /tmp/ecc-repo

11. Final initialization complete. Baseline established.
