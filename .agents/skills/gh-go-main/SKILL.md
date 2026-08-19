---
name: gh-go-main
description: Return to the default (main) branch after a PR has been submitted via gh-pr-issue. Uses the Bun CLI workflow script to safely switch branches and sync with origin. Use when user says "go back to main", "return to main branch", or "/gh-go-main".
---

# Go Main

Execute the `go-main` command via Bun CLI:

```bash
bun .agents/skills/gh-workflow/scripts/workflow.ts go-main
```

What it does:
- Aborts with an error if the working tree is dirty (never auto-runs `git stash`/`commit`/`reset`).
- Detects the default branch via `gh repo view` (falls back to `main`).
- Only auto-switches when the current branch is an issue branch (`issue_#N`); otherwise refuses.
- Warns if the issue branch has unpushed commits.
- Fetches `origin` and fast-forwards the default branch (`--ff-only`) — **even when already on the default branch**, so local is always synced to the latest merged PRs.
- When switching from an issue branch, reports the linked PR state and a branch-cleanup tip.

## 🚨 SAFETY RULE
If `go-main` fails because the working tree is dirty (`Working tree가 깨끗하지 않습니다`):
- **DO NOT** run `git stash`, `git commit`, `git reset`, or any modifying git commands automatically!
- **STOP IMMEDIATELY** and tell the user to commit, stash, or push their uncommitted changes before retrying.

Refer to `skill://gh-workflow` for full details.