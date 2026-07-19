---
title: "Network Diagram"
tags: [networking, diagram]
status: active
type: note
created: 2026-07-19
updated: 2026-07-19
---

# Network Diagram

> [!summary] Summary
> Canonical logical network diagram for the environment.

```mermaid
flowchart LR
  Inet((Internet)) --> CF[Cloudflare]
  CF --> WG[WireGuard]
  WG --> FW[OPNsense]
  FW --> VLAN10[VLAN10 Core]
  FW --> VLAN20[VLAN20 Lab]
  FW --> VLAN30[VLAN30 Endpoints]
  FW --> VLAN40[VLAN40 Management]
  VLAN10 --> PX[Proxmox]
  VLAN20 --> AD[AD / Targets]
  VLAN30 --> EP[Windows/Linux Endpoints]
  VLAN40 --> SEC[SO / Wazuh / Velociraptor]
```

Update VLAN numbers when physical truth is confirmed.


## Related Notes

- [[Networking Overview]]
- [[OPNsense Overview]]
- [[ARCHITECTURE]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
