# Detection Engineering Template

Copy this file to `src/content/detections/your-detection-slug.md` and replace all placeholder values.

Place downloadable rule files in `public/detections/your-detection-slug/` and reference them via `downloadPath`.

Do not publish this template file directly.

---

```yaml
---
title: "Your Detection Title"
description: "Summary of the detection purpose, data sources, and expected coverage."
slug: your-detection-slug
detectionId: ES-DET-000
version: "1.0.0"
severity: medium
ruleType: sigma
platform: Windows
language: YAML
status: testing
validationStatus: not-started
dataSources:
  - Sysmon
  - Windows Event Log
requiredLogs:
  - "Microsoft-Windows-Sysmon/Operational Event ID 1"
requiredTools:
  - Sigma CLI
detectionLogic:
  - language: sigma
    title: Primary Rule
    fileName: v1.0.0.sigma.yaml
    downloadPath: /detections/your-detection-slug/v1.0.0.sigma.yaml
    code: |
      title: Your Sigma Rule Title
      status: testing
      logsource:
        product: windows
        service: sysmon
      detection:
        selection:
          EventID: 1
        condition: selection
      level: medium
falsePositives:
  - description: Describe a known benign scenario.
    mitigation: Document allowlisting or tuning guidance.
tuningGuidance: Optional notes for environment-specific tuning.
testingProcedure:
  summary: How the rule was or will be validated.
  steps:
    - Execute a controlled test case.
    - Confirm expected alert generation.
  expectedResults: Describe the expected detection behavior.
detectionCoverage:
  - category: Persistence
    percentage: 75
    description: Coverage notes for this technique category.
revisions:
  - version: "1.0.0"
    date: 2026-01-15
    status: current
    summary: Initial release.
    downloadPath: /detections/your-detection-slug/v1.0.0.sigma.yaml
    fileName: v1.0.0.sigma.yaml
mitreTechniques:
  - T1547.001
relatedThreatHunts: []
relatedProjects: []
relatedArticles: []
relatedHomelab: []
relatedDetections: []
references:
  - title: MITRE ATT&CK Technique Reference
    url: https://attack.mitre.org/
author: Logan Elliott
reviewer: 
reviewDate: 2026-01-15
tags:
  - detection-engineering
  - sigma
github: 
coverImage: 
---
```

## Overview

Describe the threat behavior, detection objective, and operational value.

## Detection Logic

Explain the rule logic, key fields, and why the approach works.

## False Positives

Document expected noise and tuning recommendations.

## Validation

Describe testing methodology, sample events, and validation results.

## Deployment

Document SIEM-specific conversion notes and rollout guidance.

## Revision History

Summarize major changes across rule versions.
