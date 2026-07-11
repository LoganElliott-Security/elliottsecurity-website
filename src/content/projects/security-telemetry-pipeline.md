---
title: "Security Telemetry Pipeline"
description: "A modular log ingestion and normalization pipeline built with Vector, OpenSearch, and Terraform for scalable detection engineering."
slug: security-telemetry-pipeline
status: in-progress
featured: true
github: https://github.com/elliottsecurity/security-telemetry-pipeline
technologies:
  - Vector
  - OpenSearch
  - Terraform
  - Sysmon
  - Docker
difficulty: advanced
startDate: 2025-06-01
updatedDate: 2026-02-20
tags:
  - siem
  - detection-engineering
  - infrastructure
  - opensearch
---

## Project Goal

Build a maintainable telemetry pipeline that ingests Windows and Linux endpoint logs, normalizes fields for detection content, and supports repeatable deployment through infrastructure as code.

## Architecture

The pipeline follows a simple but scalable pattern:

1. **Collection** — Sysmon, Windows Event Forwarding, and Linux audit logs
2. **Transport** — Vector agents with local buffering
3. **Processing** — VRL transforms for field normalization
4. **Storage** — OpenSearch indices partitioned by source and retention policy
5. **Detection** — Sigma and custom queries mapped to ECS-like fields

## Current Status

Core ingestion paths are operational in the homelab environment. Terraform modules exist for Vector deployment and OpenSearch index lifecycle management. Work continues on detection content validation and automated schema testing.

## Engineering Decisions

- **Vector over Logstash** for lower resource overhead and simpler agent deployment
- **OpenSearch** for cost-effective long-term log retention in a personal lab
- **Terraform** to ensure the pipeline can be rebuilt from Git without manual drift

## Next Steps

- Add schema validation tests for normalized events
- Publish reusable detection packs aligned with normalized fields
- Document failure modes and recovery procedures
