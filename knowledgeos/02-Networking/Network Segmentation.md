---
title: "Network Segmentation"
tags: [networking, segmentation]
status: active
type: note
created: 2026-07-19
updated: 2026-07-19
---

# Network Segmentation

> [!summary] Summary
> Trust-zone model and east-west controls.

## Zones

| Zone | Trust | Examples |
| --- | --- | --- |
| Edge | Lowest | WAN, WG endpoint |
| Core | Medium-High | Hypervisor management |
| Lab | Low-Medium | AD attack range |
| Endpoints | Medium | User-like devices |
| Management | High | SIEM/EDR tooling |

Default deny between zones unless documented. Lab compromise must not freely reach management.


## Related Notes

- [[Networking Overview]]
- [[Firewall Policy Design]]
- [[ARCHITECTURE]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
