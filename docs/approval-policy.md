# Approval Policy

| Change | Dev | Reviewer | Tech Lead | Product | Security |
|---|---|---|---|---|---|
| Small change | R | A | - | - | - |
| Bugfix | R | A | C | C if business-facing | - |
| Feature | R | A | A | A | C if sensitive |
| API change | R | A | A | C | C if auth/data |
| Business logic | R | A | A | A | C if regulated |
| Security-sensitive | R | C | A | C | A |

R = responsible, A = accountable, C = consulted.

## Approval gate

Non-trivial changes must pause after impact plan. Editing starts only after explicit approval.
