---
title: "Detection Lifecycle"
tags: [detection, process]
status: active
type: note
created: 2026-07-19
updated: 2026-07-19
---

# Detection Lifecycle

> [!summary] Summary
> From hypothesis to production-quality detection.

```mermaid
flowchart LR
  H[Hypothesis] --> R[Research]
  R --> D[Draft Rule]
  D --> V[Validate]
  V --> T[Tune]
  T --> P[Publish Internal]
  P --> M[Monitor FP/FN]
  M --> I[Improve or Retire]
```


## Related Notes

- [[Detection Engineering Overview]]
- [[Detection Quality Bar]]
- [[Detections Index]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
