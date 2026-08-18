---
name: gh-pr-issue
description: Create a pull request from completed issue work via Bun CLI (hybrid workflow). Generates PR draft from STATUS.md and DECISIONS.md, allows agent polishing, and submits to GitHub. Use when user says "pr issue N", "create PR for issue N", or "/gh-pr-issue N".
---

# PR Issue (Hybrid Workflow)

Execute the `pr` flow via Bun CLI.

1. Generate the PR draft:
```bash
bun .agents/skills/gh-workflow/scripts/workflow.ts pr [N]
```
2. Read `.gh-workflows/issue-N/pr_draft.md` and polish the summary, nuances, and description to ensure high quality.
3. Submit the PR:
```bash
bun .agents/skills/gh-workflow/scripts/workflow.ts pr --submit
```

Refer to `skill://gh-workflow` for full details.
