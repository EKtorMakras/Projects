# Commit Conventions

## Format

```
type(scope): description

[optional body]

issue: TICKET-ID
```

Breaking change: add `!` after type/scope — e.g. `refactor(auth)!: change token format`

## Types

| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no feature, no fix) |
| `perf` | Code change that improves performance |
| `build` | Build system or dependency changes |
| `chore` | Maintenance, cleanup, tooling |
| `style` | Formatting only — no logic change (NOT CSS/SCSS visual changes) |
| `docs` | Documentation or code comments |
| `test` | Adding or correcting tests |
| `ci` | CI/CD pipeline changes |
| `revert` | Reverts a previous commit |
| `temp` | Partial/temporary commit in a feature branch (clean up before merge) |

## Scope

Optional, 1–2 words, lowercase noun. How to determine it:

**Single file / specific unit** — use the file or component name directly.

> Changed `useNumber.js` → scope is `useNumber`
> Changed `FilterSidebar.vue` → scope is `filter-sidebar`

**Cross-file change with a common topic** — use the topic/feature name.

> Added dark mode across multiple files → scope is `dark-mode`
> Several SEO-related changes → scope is `SEO`
> Changes across the whole filter system → scope is `filters`

**AI / Claude Code setup** — any change inside `.claude/` (skills, settings, hooks, memory) uses scope `claude`.

## Description Rules

- Imperative mood: "add" not "adds" / "added"
- Lowercase first letter
- No period at the end
- Max ~50 chars

## Body (optional)

Explain **why**, not what. Blank line between subject and body. Wrap at 72 chars.

## Issue Footer

Always leave a blank line before the footer.

```
feat(users): add datatable to display user list

Implemented a new feature in the 'Users' module to display all users
in a datatable with sorting and pagination.

issue: PROJ-12
```

### How to determine the issue ID

1. **Check the current branch name** — if it matches an issue pattern (e.g. `PROJ-12`, `GI-500`, `DAT-5`), use that as the issue ID.
2. **Non-issue branches** (`main`, `master`, `development`, `testing`, `staging`, or similar integration branches) — omit the footer **unless** the user explicitly provides an issue ID in their prompt.

## Good Examples

```
feat(transitions): add asymmetric fade-in transition mixin for smoother element appearance

issue: PROJ-8
```

```
fix(autocomplete): close menu on clear action

issue: PROJ-15
```

```
refactor(filters): streamline map layers synchronization logic in filters store

issue: PROJ-20
```

```
build: add html2canvas dependency
```

```
chore: delete unused code
```

```
perf(map): reduce cluster recalculation on zoom

issue: PROJ-33
```

## Shared Files — Same or Separate Commit?

When a feature also touches shared/global files, use this rule:

**Same commit as the feature** — when the change is tightly coupled and a revert of the feature should take it with it.

> Locales (`el.js`, `en.js`) — translations exist only to support the feature's UI. No feature = no need for those keys.
>
> Before committing, check that the new locale keys live under a dedicated namespace (e.g. `myFeature: { ... }`) and not as flat top-level keys (except keys that are genuinely global and shared across the whole app, which may legitimately live at the top level). Namespaced keys allow git to auto-merge locale files from parallel branches without conflicts — making a simple "accept both" resolution possible instead of a manual merge.

**Separate commit** — when the addition is generic and could be useful independently, regardless of whether the feature is ever reverted.

> Adding a helper method to `generalUtils.js`, `arrayUtils.js`, etc. — a reusable utility belongs to the codebase, not to one feature.

Rule of thumb: *"If I revert the feature commit, should this change go with it?"* Yes → same commit. No → separate commit.

## FORBIDDEN

- `Co-Authored-By: Claude <...>` — NEVER add AI attribution trailers
- `Co-Authored-By: Copilot <...>` — NEVER add AI attribution trailers
- Vague messages: `squash delete`, `WIP`, `fix stuff`, `update`
- Missing type: `add new button` → must be `feat(header): add new button`
- Wrong mood: `feat: added feature` → must be `feat: add feature`

## Before Every Commit

1. `git diff` — review changes
2. `npm run lint` — fix lint errors
3. No `console.log`, no commented-out code, no debug artifacts
