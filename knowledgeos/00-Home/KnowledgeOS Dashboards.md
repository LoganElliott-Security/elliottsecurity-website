---
title: "KnowledgeOS Dashboards"
tags: [dashboard, dataview, knowledgeos]
status: active
type: dashboard
created: 2026-07-19
updated: 2026-07-19
---

# KnowledgeOS Dashboards

> [!info] Dashboard Index
> Thin dashboards over thick domain notes. Dataview queries assume the Dataview community plugin.

## Executive Dashboard

| Lens | Jump |
| --- | --- |
| Strategy | [[PROJECT_CONTEXT]] |
| Systems | [[ARCHITECTURE]] |
| Quality | [[STANDARDS]] |
| Execution | [[ROADMAP]] |

## Security Operations Dashboard

- [[Detection Engineering Overview]]
- [[Threat Hunting Overview]]
- [[Incident Response Overview]]
- [[Malware Analysis Overview]]
- [[Monitoring Overview]]

## Infrastructure Dashboard

- [[Homelab Overview]]
- [[Proxmox Overview]]
- [[OPNsense Overview]]
- [[Active Directory Overview]]
- [[Storage and Backups]]

## Business Dashboard

- [[Business Overview]]
- [[Products Overview]]
- [[Marketing Overview]]
- [[Revenue Overview]]
- [[Website Overview]]

## Dataview — Open TODOs

```dataview
TASK
FROM "knowledgeos"
WHERE !completed
LIMIT 50
```

## Dataview — Recently Updated

```dataview
TABLE status, type, updated
FROM "knowledgeos"
WHERE updated
SORT updated DESC
LIMIT 25
```

## Dataview — Draft Notes

```dataview
LIST
FROM "knowledgeos"
WHERE status = "draft"
SORT file.name ASC
```

## Related Notes

- [[00 Home]]
- [[Templates Index]]
- [[ROADMAP]]
