# Team Onboarding

## First day checklist

1. Read `README.md`.
2. Read `docs/workflow.md`.
3. Understand `docs/change-types.md`.
4. Review `docs/definition-of-done.md`.
5. Run local validation:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate-workflow.ps1
```

## First PR checklist

- choose one change type
- fill issue/requirement template
- create impact plan
- get approval
- attach evidence in PR

## Team adoption tips

- Start with PR template only.
- Add validation after team understands the workflow.
- Add strict branch protection after false positives are low.
