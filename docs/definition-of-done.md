# Definition of Done

A change is done when:

- requirement is clear
- change type selected
- impact plan approved
- implementation matches scope
- tests/build/validation run or skipped with reason
- review completed
- rollback path known
- report includes evidence

## By change type

| Type | Additional done criteria |
|---|---|
| Feature | acceptance criteria verified |
| Bugfix | repro fails before, passes after or equivalent evidence |
| Small change | smoke check done |
| API change | contract/compatibility verified |
| Business logic | rule examples and edge cases tested |
| Refactor | behavior preserved by tests |
