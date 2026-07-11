---
title: "Proxmox Detection Engineering Lab"
description: "A virtualized homelab environment for building, testing, and validating detection content against realistic attack simulations."
slug: proxmox-detection-engineering-lab
category: Virtualization
platform: Proxmox VE
difficulty: advanced
featured: true
technologies:
  - Proxmox
  - Windows Server
  - Ubuntu
  - OpenSearch
  - Vector
  - Caldera
tags:
  - homelab
  - proxmox
  - detection-engineering
  - purple-team
updatedDate: 2026-03-01
---

## Purpose

This lab provides a controlled environment for end-to-end detection engineering workflows: log collection, normalization, detection authoring, adversary simulation, and validation.

## Infrastructure Layout

| Component | Role |
|-----------|------|
| Proxmox host | Hypervisor and network segmentation |
| Windows domain controller | Realistic AD telemetry source |
| Windows workstation | Endpoint simulation target |
| Linux utility server | Vector + OpenSearch stack |
| Caldera | Controlled adversary emulation |

## Current Focus

- Expanding Sysmon coverage across all Windows endpoints
- Automating index retention and snapshot policies
- Integrating MITRE ATT&CK technique mapping into hunt notes

## Design Principles

1. **Rebuildable** — All infrastructure defined in documentation and Git
2. **Realistic** — Domain-joined endpoints with typical enterprise noise
3. **Safe** — Isolated VLAN with no routing to production networks

## Outcomes

The lab supports rapid iteration on detection ideas before promoting rules to production-like test environments. It also serves as the primary platform for threat hunt reproduction and purple team exercises.
