---
title: "Platform Architecture"
tags: [platform, architecture]
status: active
type: note
created: 2026-07-19
updated: 2026-07-19
---

# Platform Architecture

> [!summary] Summary
> How KnowledgeOS and the public platform relate.

```mermaid
flowchart LR
  KOS[KnowledgeOS Vault] -->|Curate| Content[Astro Content Collections]
  Content --> Build[Astro Build]
  Build --> CF[Cloudflare Pages]
  Rules[.cursor rules] --> KOS
  Brain[Brain Files] --> Agents[AI Agents]
  Agents --> KOS
```


## Related Notes

- [[Platform Overview]]
- [[Website Overview]]
- [[PROJECT_CONTEXT]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
