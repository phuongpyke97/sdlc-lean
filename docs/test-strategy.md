# Test Strategy

## Test levels

| Level | Use for | Evidence |
|---|---|---|
| Unit | pure logic, validators, utilities | command + pass/fail |
| Integration | API, DB, external boundaries | scenario + result |
| E2E/manual | user-critical flows | steps + screenshots/logs |
| Regression | bugfix/business rules | before/after or focused test |

## Expectations by change type

| Type | Minimum test |
|---|---|
| Feature | unit + integration or manual acceptance |
| Bugfix | regression test or reproducible evidence |
| Small change | smoke check |
| API change | contract/integration test |
| Business logic | examples + edge cases |
| Refactor | existing test suite pass |

## Skipped tests

If a test is skipped, report:

- why skipped
- risk created
- compensating validation
- follow-up owner/date
