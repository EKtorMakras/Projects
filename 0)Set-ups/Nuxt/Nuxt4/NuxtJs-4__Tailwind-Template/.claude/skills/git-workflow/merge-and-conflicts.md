# Merge vs Rebase & Conflict Resolution

## Merge (Preserves History)

**Use when:**
- Merging feature branches into `main`
- Multiple people worked on the branch
- The branch has been pushed and others may have based work on it

## Rebase (Linear History)

**Use when:**
- Updating your local feature branch with latest `main`
- The branch is local-only or you're the sole contributor

Before opening a PR, rebase onto main and push with `--force-with-lease` (never `--force`):

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/user-auth
```

## When NOT to Rebase

Never rebase branches that:
- Have been pushed and others have based work on them
- Are protected branches (`main`, `develop`)
- Are already merged

Rebase rewrites history — it breaks collaborators' local branches.

## Conflict Resolution

```bash
# See conflicted files
git status

# Accept one side entirely
git checkout --ours path/to/file    # keep the target branch version
git checkout --theirs path/to/file  # keep the incoming branch version

# Or use a merge tool
git mergetool

# After resolving, stage and continue
git add path/to/file
git commit  # (or git rebase --continue if rebasing)
```
