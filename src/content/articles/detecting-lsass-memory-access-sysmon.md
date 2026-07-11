---
title: "Detecting LSASS Memory Access with Sysmon"
description: "A practical guide to identifying credential dumping attempts using Sysmon Event ID 10 and process lineage analysis."
slug: detecting-lsass-memory-access-sysmon
publishDate: 2025-11-18
updatedDate: 2026-01-12
draft: false
featured: true
author: Elliott Security
category: Detection Engineering
tags:
  - sysmon
  - credential-access
  - windows
  - threat-hunting
readingTime: 12
seoTitle: Detecting LSASS Memory Access with Sysmon
seoDescription: Learn how to detect LSASS credential dumping using Sysmon Event ID 10, suspicious process lineage, and practical tuning guidance.
---

## Overview

Credential dumping remains one of the most common post-exploitation techniques observed in enterprise environments. Attackers frequently target `lsass.exe` to extract authentication material using tools such as Mimikatz, ProcDump, or custom in-memory techniques mapped to MITRE ATT&CK **T1003.001**.

This article documents a repeatable detection workflow built on Sysmon telemetry rather than theoretical signatures alone.

## Why Sysmon Event ID 10 Matters

Sysmon Event ID 10 (`ProcessAccess`) records when one process opens another with specific access rights. When the target process is `lsass.exe`, the event becomes a high-fidelity signal for credential access attempts.

Key fields to monitor:

- `SourceImage`
- `TargetImage`
- `GrantedAccess`
- `CallTrace`

## Detection Logic

A practical starting rule looks for non-system processes requesting access to LSASS with suspicious rights:

```xml
<TargetImage condition="is">C:\Windows\System32\lsass.exe</TargetImage>
<GrantedAccess condition="contains any">0x1010;0x1410;0x143a</GrantedAccess>
```

This should never be deployed without tuning. Legitimate security products, EDR agents, and some management tools may generate benign matches.

## Tuning Recommendations

1. Baseline known-good security tooling in your environment.
2. Enrich alerts with parent process and command line context.
3. Correlate with subsequent lateral movement or authentication anomalies.
4. Track false positives by source image and reduce noise iteratively.

## Lessons Learned

High-quality detections require environment-specific tuning. A rule that works in a lab homelab rarely survives first contact with a production endpoint fleet without refinement.

The most valuable outcome is not the alert itself—it is the documented tuning process that makes the detection maintainable over time.
