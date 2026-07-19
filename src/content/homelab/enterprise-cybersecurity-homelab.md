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
updatedDate: 2026-07-19
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
- Build golden templates (Ubuntu, Windows Server, Windows 11) — **DCP-002**
- Configure WireGuard remote access
- Build segmented virtual networks
- Deploy Active Directory
- Deploy Elastic Security
- Establish detection engineering workflows
- Publish architecture documentation

These objectives define the Version 1 roadmap. Completion status for each item will be updated as work lands.

---

# Planned Architecture

The following architecture is the **planned** Version 1 design. Components listed here are not claimed as deployed unless noted under Current Progress.

## Infrastructure

- Proxmox VE
- TrueNAS
- Docker
- GitHub Actions Runner

## Networking

- OPNsense
- WireGuard VPN
- VLAN segmentation
- Internal lab networks

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

**Overall Progress: 5%** · **Current Milestone: DCP-001** · **Phase: Foundation**

Completed to date:

- Architecture and roadmap finalized for Version 1
- Publishing structure established on ElliottSecurity Platform
- Installed and hardened Proxmox VE (DCP-001)
- Created backup administrator accounts and disabled root GUI login
- Created enterprise VM pools
- Established synchronized Lab Progress dashboard

Next milestone (**DCP-002**): Golden Templates — Ubuntu, Windows Server, Windows 11.

Canonical public tracker: [Lab Progress](/lab-progress). Progress percentages and milestone notes update as each DCP lands. No infrastructure is claimed ahead of documented evidence.

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
