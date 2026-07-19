---
title: "Monitoring Overview"
tags: [infrastructure, monitoring]
status: active
type: note
created: 2026-07-19
updated: 2026-07-19
---

# Monitoring Overview

> [!summary] Summary
> Availability and security monitoring map.

```mermaid
flowchart LR
  Endpoints --> Agents[Wazuh / Velociraptor]
  Network --> SO[Security Onion]
  Agents --> SIEM[Alerting / Search]
  SO --> SIEM
  SIEM --> IR[IR Intake]
  SIEM --> Hunts[Threat Hunts]
```


## Related Notes

- [[Security Onion Overview]]
- [[Wazuh Overview]]
- [[Velociraptor Overview]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
