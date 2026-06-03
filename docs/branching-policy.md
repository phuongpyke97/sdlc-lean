# Branching Policy

## Branch names

```text
feature/<short-name>
bugfix/<short-name>
small/<short-name>
api/<short-name>
logic/<short-name>
refactor/<short-name>
```

## Rules

- Work from the default branch unless release policy says otherwise.
- Keep PRs small and scoped.
- Do not mix unrelated change types in one PR.
- Rebase/merge per team standard; avoid force push after review unless coordinated.

## Merge criteria

- PR template complete
- required approvals present
- validation/CI pass or waiver documented
- rollback note present
