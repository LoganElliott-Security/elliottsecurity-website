---
title: "Enterprise Cybersecurity Homelab"
description: "Building an enterprise-inspired cybersecurity lab with Proxmox, WireGuard, OPNsense, Active Directory, Elastic Security, ELK Stack, and detection engineering workflows."
slug: enterprise-cybersecurity-homelab
category: Enterprise Security Lab
platform: Proxmox VE
difficulty: advanced
featured: true
technologies:
  - Proxmox VE
  - WireGuard
  - OPNsense
  - Active Directory
  - Docker
  - Elastic Security
  - GitHub Actions
  - TrueNAS
tags:
  - homelab
  - detection-engineering
  - infrastructure
  - dfir
  - threat-hunting
updatedDate: 2026-07-20
coverImage: /images/homelab/enterprise-cybersecurity-homelab.jpg
---

# Overview

This project documents the design and implementation of the ElliottSecurity enterprise cybersecurity homelab (**Version 1**).

The objective is to build a production-inspired environment that supports:

- Detection Engineering
- Threat Hunting
- Digital Forensics
- Incident Response
- Purple Team Exercises
- Infrastructure Automation
- Secure Remote Administration

Rather than functioning as a simple virtualization server, this environment serves as the foundation for technical work published on ElliottSecurity.

The lab is built incrementally. Architecture planning is complete; implementation work is in progress and will be documented as each milestone is finished.

Live build status: **[Lab Progress](/lab-progress)** (synced from KnowledgeOS).

---

# Current Objectives

Near-term priorities:

- ~~Deploy Proxmox infrastructure~~ (DCP-001 complete)
- ~~Install OPNsense / internal networking / WiFi edge bridge~~ (DCP-002 complete)
- Deploy Active Directory on **ES-DC-01** — **in progress** (VM created)
- Build golden templates (Ubuntu, Windows Server, Windows 11)
- Configure WireGuard remote access
- Deploy Elastic Security
- Establish detection engineering workflows
- Publish architecture documentation

These objectives define the Version 1 roadmap. Completion status for each item will be updated as work lands.

---

# Live Architecture (current)

Current documented path:

```text
Internet → Home Router → ES-EDGE-01 (WiFi bridge) → Proxmox Host
  → vmbr0 Management 192.168.1.0/24
  → vmbr1 Internal Lab 10.10.10.0/24 → ES-OPNSENSE-01 / ES-DC-01
  → vmbr2 nic1 expansion
```

| Plane | CIDR | Purpose |
|-------|------|---------|
| Management | `192.168.1.0/24` | Proxmox admin (`vmbr0`) |
| Infrastructure / Lab | `10.10.10.0/24` | OPNsense LAN + infrastructure VMs (`vmbr1`) |
| WAN Transit | `10.20.20.0/24` | OPNsense WAN hop |

---

# Planned Architecture

The following architecture is the **planned** Version 1 design. Components listed here are not claimed as deployed unless noted under Current Progress.

## Infrastructure

- Proxmox VE ✅
- TrueNAS
- Docker
- GitHub Actions Runner

## Networking

- OPNsense ✅ (installed)
- Raspberry Pi WiFi edge bridge ✅ (ES-EDGE-01)
- WireGuard VPN
- Additional VLAN segmentation
- Internal lab networks ✅ (`10.10.10.0/24`)

## Security

- Elastic Security
- Sysmon
- Zeek
- Suricata

## Identity

- Active Directory
- Windows Server
- Group Policy

## Offensive Systems

- Kali Linux
- Atomic Red Team
- Purple Team exercises

## Monitoring

- Grafana
- Prometheus
- System health dashboards

---

# Documentation Strategy

Each major component will receive its own engineering article covering:

- Design decisions
- Architecture diagrams
- Configuration walkthroughs
- Security considerations
- Lessons learned

This page is the **canonical landing page** for the homelab section and will link outward to those component articles as they are published.

---

# Current Progress

**Overall Progress: 15%** · **Current Milestone: DCP-002** · **Phase: Networking → Identity**

### Progress indicators

| Capability | Status |
|------------|--------|
| WiFi Bridge (ES-EDGE-01) | ✅ Complete |
| OPNsense (ES-OPNSENSE-01) | ✅ Complete |
| Internal Networking | ✅ Complete |
| Infrastructure Foundation | ✅ Complete |
| Active Directory (ES-DC-01) | 🔄 In Progress |

Completed to date:

- Architecture and roadmap finalized for Version 1
- Publishing structure established on ElliottSecurity Platform
- Installed and hardened Proxmox VE (DCP-001)
- Created backup administrator accounts and disabled root GUI login
- Created enterprise VM pools
- Established synchronized Lab Progress dashboard
- Built Raspberry Pi WiFi-to-Ethernet bridge (**ES-EDGE-01**)
- Installed OPNsense with validated LAN/WAN (**ES-OPNSENSE-01**)
- Configured Proxmox bridges `vmbr0` / `vmbr1` / `vmbr2`
- Created Domain Controller VM (**ES-DC-01**) on the internal lab network
- Uploaded required installation ISOs

Next milestone (**DCP-003**): Identity Baseline — Windows Server + Active Directory on ES-DC-01.

Canonical public tracker: [Lab Progress](/lab-progress). Progress percentages and milestone notes update as each DCP lands. No infrastructure is claimed ahead of documented evidence.

---

# Infrastructure Inventory

| Host | Role | Status |
|------|------|--------|
| **ES-EDGE-01** | Ubuntu Server WiFi-to-Ethernet bridge (`192.168.255.104`) providing upstream connectivity without a dedicated Ethernet drop to the Proxmox server | Active |
| **ES-OPNSENSE-01** | Lab firewall/router — LAN `10.10.10.1/24`, WAN `10.20.20.10/24`, boot on startup | Installed |
| **ES-DC-01** | Future Active Directory domain controller on `vmbr1` — Windows/AD roles pending | Created |

---

# Future Articles

Dedicated documentation is planned for:

- Proxmox Cluster
- WireGuard Deployment
- OPNsense Configuration
- Active Directory
- Elastic Security
- Detection Engineering
- Threat Hunting
- Purple Team Operations
- Infrastructure Automation
- Backup & Disaster Recovery

Until those articles exist, treat this page as the index and source of truth for Version 1 scope and status.
