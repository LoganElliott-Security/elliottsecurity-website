# Threat Hunt Publishing Template

Copy this file to `src/content/threat-hunts/your-hunt-slug.md` and replace all placeholder values.

Do not publish this template file directly.

---

```yaml
---
title: "Your Threat Hunt Title"
description: "Summary of the hunt hypothesis, scope, and outcome."
slug: your-hunt-slug
huntDate: 2026-01-15
status: completed
mitreTechniques:
  - T1059.001
  - T1105
tools:
  - SIEM
  - EDR
  - Sysmon
hypothesis: "State the threat behavior or adversary activity you are investigating."
difficulty: intermediate
featured: false
tags:
  - threat-hunting
  - windows
coverImage: /images/your-hunt-cover.png
---
```

## Hypothesis

Define the threat scenario, expected indicators, and scope.

## Data Sources

List logs, telemetry, and datasets used during the hunt.

## Methodology

Document queries, analysis steps, pivoting strategy, and validation approach.

## Findings

Summarize confirmed activity, benign matches, and false positives.

## Detections and Recommendations

Describe follow-on detection opportunities and operational improvements.

## Lessons Learned

Capture what worked, what did not, and what to hunt next.
