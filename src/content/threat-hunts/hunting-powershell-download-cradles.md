---
title: "Hunting Suspicious PowerShell Download Cradles"
description: "A hypothesis-driven hunt for encoded PowerShell download cradles using script block logging and network correlation."
slug: hunting-powershell-download-cradles
huntDate: 2026-01-08
status: completed
mitreTechniques:
  - T1059.001
  - T1027
  - T1105
tools:
  - Microsoft Defender for Endpoint
  - Kusto
  - Sysmon
hypothesis: "An attacker is using PowerShell download cradles to retrieve secondary payloads while evading static content inspection."
difficulty: intermediate
featured: true
tags:
  - threat-hunting
  - powershell
  - windows
  - mde
---

## Hypothesis

Recent incident trends suggest adversaries are staging payloads through obfuscated PowerShell one-liners that pull content from ephemeral infrastructure. If this activity is present, script block logging should reveal encoded cradle patterns and adjacent process lineage anomalies.

## Methodology

1. Reviewed historical alerts for PowerShell execution with encoded command lines
2. Queried script block events for `DownloadString`, `IEX`, and `FromBase64String`
3. Correlated suspicious hosts with outbound connections to low-reputation domains
4. Validated findings against known admin automation to reduce false positives

## Key Indicators

- PowerShell spawned from unusual parent processes (`winword.exe`, `excel.exe`)
- Script blocks containing compressed or base64-encoded content
- Short-lived network connections immediately following script execution

## Findings

Two endpoints exhibited suspicious cradle activity tied to a phishing document delivery chain. One case was confirmed malicious; the second was traced to a red team exercise already tracked internally.

## Lessons Learned

Script block logging is essential but noisy. Hunt success depended on combining execution telemetry with network context and maintaining an updated allowlist for legitimate automation tools.

## Recommendations

- Deploy ASR rules where business constraints allow
- Enforce constrained language mode for high-risk user populations
- Add detection coverage for common cradle function patterns
