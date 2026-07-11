---
title: "Suspicious Registry Run Key Persistence"
description: "A production-ready Sigma detection for suspicious Run key modifications commonly used for persistence by commodity malware families."
slug: suspicious-registry-run-key-persistence
detectionId: ES-DET-001
version: "1.1.0"
severity: medium
ruleType: sigma
platform: Windows
language: YAML
status: testing
validationStatus: validated
dataSources:
  - Sysmon
  - Windows Event Log
requiredLogs:
  - "Microsoft-Windows-Sysmon/Operational Event ID 13"
  - "Microsoft-Windows-Sysmon/Operational Event ID 1"
requiredTools:
  - Sysmon
  - Sigma CLI
  - OpenSearch
detectionLogic:
  - language: sigma
    title: Primary Sigma Rule
    fileName: v1.1.0.sigma.yaml
    downloadPath: /detections/suspicious-registry-run-key-persistence/v1.1.0.sigma.yaml
    code: |
      title: Suspicious User Run Key Modification
      status: testing
      logsource:
        product: windows
        service: sysmon
      detection:
        selection:
          EventID: 13
          TargetObject|contains: '\Software\Microsoft\Windows\CurrentVersion\Run\'
        filter_legitimate:
          Details|contains:
            - '\Program Files\'
            - '\Windows\System32\'
        condition: selection and not filter_legitimate
      level: medium
      tags:
        - attack.persistence
        - attack.t1547.001
falsePositives:
  - description: Software deployment tools may modify Run keys during legitimate installation workflows.
    mitigation: Allowlist known deployment agent binaries and standard installation paths.
  - description: Legacy login scripts configured by IT may create expected Run key entries.
    mitigation: Maintain an inventory of approved IT management tooling and parent processes.
tuningGuidance: Expand filters using environment-specific software inventory. Enrich alerts with file hash reputation, parent process lineage, and code signing validation before escalating severity.
testingProcedure:
  summary: Validate the detection in a controlled lab using simulated persistence activity and known-good software deployment baselines.
  steps:
    - Deploy Sysmon with registry event ID 13 enabled on a test workstation.
    - Import the Sigma rule into the detection engineering pipeline.
    - Execute an Atomic Red Team T1547.001 test to simulate Run key modification.
    - Confirm alert generation within the expected ingestion latency window.
    - Replay known-good software deployment activity and verify suppression filters.
  expectedResults: The simulated persistence test generates an alert while approved deployment activity is suppressed or downgraded.
detectionCoverage:
  - category: Persistence
    percentage: 85
    description: Covers user-level Run key modification patterns mapped to T1547.001.
  - category: Initial Access Follow-on
    percentage: 40
    description: Useful when persistence follows phishing-delivered droppers.
revisions:
  - version: "1.1.0"
    date: 2026-02-15
    status: current
    summary: Added filters for legitimate Program Files and System32 paths.
    downloadPath: /detections/suspicious-registry-run-key-persistence/v1.1.0.sigma.yaml
    fileName: v1.1.0.sigma.yaml
  - version: "1.0.0"
    date: 2025-09-01
    status: deprecated
    summary: Initial release without environment-specific tuning filters.
    downloadPath: /detections/suspicious-registry-run-key-persistence/v1.0.0.sigma.yaml
    fileName: v1.0.0.sigma.yaml
mitreTechniques:
  - T1547.001
relatedThreatHunts:
  - hunting-powershell-download-cradles
relatedProjects:
  - security-telemetry-pipeline
relatedArticles:
  - detecting-lsass-memory-access-sysmon
relatedHomelab:
  - proxmox-detection-engineering-lab
relatedDetections: []
references:
  - title: MITRE ATT&CK T1547.001 Boot or Logon Autostart Execution
    url: https://attack.mitre.org/techniques/T1547/001/
  - title: SigmaHQ Windows Registry Rules
    url: https://github.com/SigmaHQ/sigma
author: Elliott Security
reviewer: Elliott Security
reviewDate: 2026-02-20
tags:
  - sigma
  - persistence
  - registry
  - windows
github: https://github.com/elliottsecurity/detection-rules
---

## Overview

This detection engineering object documents a Sigma rule for identifying suspicious modifications to user-level Run keys. The rule is designed for environments collecting Sysmon Event ID 13 registry events.

## Operational Notes

> [!IMPORTANT]
> Do not deploy this rule to production without validating against your software deployment and endpoint management tooling.

> [!WARNING]
> High-volume Run key activity in VDI environments may require additional parent process enrichment before alert routing.

> [!TIP]
> Pair this detection with command-line and process lineage context to reduce analyst triage time.

## Example Investigation Workflow

> [!EXAMPLE]
> Analysts should pivot from the alert to the modifying process, target binary path, code signing status, and first-seen timestamp before escalating.

## Analyst Callout

> [!CALLOUT]
> Treat repeated alerts from the same host within a short window as potential staging activity rather than isolated software installation events.

## Validation Notes

Testing in the homelab produced expected hits for simulated persistence scripts. Production deployment requires allowlisting for management agents and legacy login scripts.

## Change Management

Future revisions should document filter changes, expected false positive impact, and validation evidence in the revision history section above.
