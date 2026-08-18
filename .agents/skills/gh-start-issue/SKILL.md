---
name: gh-start-issue
description: Start work on a GitHub issue via Bun CLI. Creates issue branch and sets up .gh-workflows/ directory with STATUS.md. Use when user says "start issue N", "begin issue N", or "/gh-start-issue N".
---

# Start Issue

Execute the `start <N>` command via Bun CLI.

Run the following command:
```bash
bun .agents/skills/gh-workflow/scripts/workflow.ts start <N>
```

## 🚨 SAFETY RULE
If `start` fails because the working tree is dirty (`Working tree가 깨끗하지 않습니다`):
- **DO NOT** run `git stash`, `git commit`, `git reset`, or any modifying git commands automatically!
- **STOP IMMEDIATELY** and tell the user to commit, stash, or push their uncommitted changes before retrying.

Refer to `skill://gh-workflow` for full details.
