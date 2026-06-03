# Graphify Protocol

Graphify is used to discover related code before planning a change.

## Search goals

- entry points
- called functions/classes
- API routes/contracts
- tests covering the area
- config/env/dependency impact
- owners or adjacent modules

## Minimum output

```md
## Graphify/Search Results
- Primary files:
- Related tests:
- Dependencies:
- Possible side effects:
- Unknowns:
```

## If Graphify is unavailable

State that clearly and use repository search instead. The impact plan must include the fallback search method.

## Quality bar

Do not plan from a single file when the change can affect API contracts, business logic, auth, data, or shared modules.
