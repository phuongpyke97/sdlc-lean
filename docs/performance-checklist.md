# Performance Checklist

Use when a change affects queries, loops, caching, API latency, batch jobs, or high-traffic paths.

- [ ] Hot path identified
- [ ] Data size/cardinality considered
- [ ] Query/index impact checked
- [ ] Caching impact checked
- [ ] N+1 or repeated work avoided
- [ ] Timeout/retry behavior considered
- [ ] Baseline and after-change evidence captured when relevant
