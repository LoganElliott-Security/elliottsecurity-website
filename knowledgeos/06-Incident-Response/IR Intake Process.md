---
title: "IR Intake Process"
tags: [ir, process]
status: active
type: note
created: 2026-07-19
updated: 2026-07-19
---

# IR Intake Process

> [!summary] Summary
> How alerts and suspicions become IR cases.

```mermaid
flowchart TD
  A[Alert or Human Report] --> B{Triage}
  B -->|Benign| C[Close with notes]
  B -->|Suspicious| D[Create ES-IR case]
  D --> E[Containment decision]
  E --> F[Investigation]
  F --> G[Eradicate / Recover]
  G --> H[Lessons Learned]
  H --> I[Detections / Docs updates]
```


## Related Notes

- [[IR Doctrine]]
- [[Cases Index]]
- [[Playbooks Index]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
