---
name: git-workflow
description: Git workflow patterns including branching strategies, commit conventions, merge vs rebase, conflict resolution, and collaborative development best practices for teams of all sizes.
origin: ECC
---

# Git Workflow Patterns

## When to Activate

- Setting up Git workflow for a new project
- Deciding on branching strategy (GitFlow, trunk-based, GitHub flow)
- Writing commit messages and PR descriptions
- Resolving merge conflicts
- Managing releases and version tags
- Onboarding new team members to Git practices

## Sub-topics

| File | Contents |
|------|----------|
| [branching-strategies.md](branching-strategies.md) | GitHub Flow, Trunk-Based, GitFlow — when to use which; branch naming conventions |
| [commit-conventions.md](commit-conventions.md) | Conventional Commits format, type table, `.gitmessage` template |
| [merge-and-conflicts.md](merge-and-conflicts.md) | Merge vs rebase trade-offs, rebase workflow, conflict resolution |
| [pr-workflow.md](pr-workflow.md) | PR title format, description template, review checklists |

Load the relevant file(s) based on what the user needs. Load all four for general Git workflow setup.

## Release Management

Semantic versioning: `MAJOR` = breaking change, `MINOR` = new feature (backward compatible), `PATCH` = bug fix.

Use annotated tags (`git tag -a v1.2.0`) and push them explicitly (`git push origin v1.2.0`). Generate changelogs with `conventional-changelog` when using Conventional Commits.

## Git Hooks

- **pre-commit:** run lint + scan staged diff for secrets (`password`, `api_key`, `secret`)
- **pre-push:** run full test suite

## Anti-Patterns

- Never commit directly to `main` — use branches and PRs
- Never commit secrets — `.env` belongs in `.gitignore`
- Never make giant PRs (1000+ lines) — break them up
- Never use vague commit messages (`"update"`, `"fix"`) — follow Conventional Commits
- Never force-push to `main` — use `git revert` for public branches
- Never keep long-lived branches (weeks/months) — rebase frequently
- Never commit generated files (`dist/`, `node_modules/`) — gitignore them
