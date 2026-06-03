# API Change Flow

1. Identify endpoint/contract/schema/status/auth impact.
2. Identify consumers.
3. Check backward compatibility.
4. Search handlers, clients, tests, docs with Graphify.
5. Create impact plan.
6. Get required approval.
7. Implement with contract tests.
8. Update docs/examples.
9. Report compatibility and rollout/rollback.

## Breaking change checklist

- migration path defined
- consumers notified
- versioning/deprecation considered
- rollback possible
