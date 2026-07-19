---
title: "VPN Access Runbook"
tags: [infrastructure, vpn, runbook]
status: active
type: runbook
created: 2026-07-19
updated: 2026-07-19
---

# VPN Access Runbook

> [!summary] Summary
> Operational runbook for WireGuard access.

## Steps
1. Confirm device compliance expectations.
2. Issue/rotate peer config via secure channel (not Git).
3. Verify AllowedIPs match least privilege.
4. Validate access and logging.
5. Record peer metadata in inventory (no private keys).

## Rollback
Disable peer and rotate keys if compromise suspected.


## Related Notes

- [[WireGuard Overview]]
- [[Incident Response Overview]]
- [[Network Segmentation]]

## TODOs

- [ ] Expand this note with operational detail

---

**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]
