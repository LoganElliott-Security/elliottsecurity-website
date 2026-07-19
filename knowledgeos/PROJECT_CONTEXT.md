---
title: "PROJECT_CONTEXT"
tags: [brain, context, knowledgeos]
status: canonical
type: brain
created: 2026-07-19
updated: 2026-07-19
---

# PROJECT_CONTEXT

> [!important] Canonical AI Context
> Permanent context for humans and AI agents in ElliottSecurity KnowledgeOS. Every future document must align with it.

## Mission

Build and operate **ElliottSecurity KnowledgeOS** — the single source of truth for every operational, technical, research, career, and business domain of ElliottSecurity.

KnowledgeOS exists to make cybersecurity engineering work documented, reusable, auditable, teachable, automatable, and publishable.

## Vision

ElliottSecurity KnowledgeOS becomes an enterprise-grade internal operating system for knowledge: an Obsidian-native, Git-backed, AI-assisted SOC wiki that powers the public ElliottSecurity Platform without becoming the public website itself.

## Long-Term Goals

1. Capture the complete homelab and production-adjacent infrastructure as living documentation.
2. Standardize detection engineering, threat hunting, and incident response as repeatable playbooks.
3. Maintain a career and certification system that compounds skill development.
4. Connect business planning, products, website, and platform work to the same knowledge graph.
5. Keep the vault modular enough to grow for 5+ years without structural rewrites.
6. Make AI assistance safe, consistent, and high-signal through Cursor rules and brain files.

## Repository Philosophy

- **Git is the system of record.** Obsidian is the authoring and graph interface.
- **Markdown is the CMS.** Avoid proprietary lock-in.
- **One concept, one note.** Prefer links over mega-documents.
- **Enterprise tone.** Write as if a SOC, engineering manager, or auditor will read it.
- **No empty folders.** Every directory has a README, Overview, and starter notes.
- **Website is a rendering engine.** Public content is curated from KnowledgeOS; KnowledgeOS is broader and deeper.

## Documentation Philosophy

| Principle | Meaning |
| --- | --- |
| Accurate | Reflect real systems and real decisions |
| Actionable | Enable someone else to operate or recover |
| Linked | Belong to a knowledge graph, not a pile of files |
| Versioned | Evolve through Git with clear history |
| Secure | Never store secrets, credentials, or customer data |
| Reusable | Prefer templates, runbooks, and patterns |

Prefer runbooks over essays when the goal is operational readiness.

## Target Audience

| Audience | Use of KnowledgeOS |
| --- | --- |
| Future Logan Elliott | Primary operator and maintainer |
| AI coding agents | Context for generating aligned documentation and code |
| Hiring managers / mentors | Evidence of structured engineering practice |
| Future collaborators | Onboarding into ElliottSecurity systems |
| Public readers (indirect) | Curated excerpts published via the website |

## Current Technologies

### Infrastructure & Networking

- Proxmox VE
- OPNsense
- WireGuard
- Cloudflare (DNS, Pages, Zero Trust patterns)
- Active Directory lab
- Windows Server / Windows clients
- Linux (Debian/Ubuntu-focused)
- Docker / containerized services

### Security Stack

- Security Onion
- Wazuh
- Velociraptor
- Elastic Stack patterns
- Sysmon / logging pipelines
- Detection-as-code workflow targets

### Platform & Publishing

- Astro 7 website (`elliottsecurity-website`)
- TypeScript / Tailwind CSS
- GitHub + Cloudflare Pages
- Obsidian vault (this KnowledgeOS)
- Cursor IDE + AI agents

## Current Priorities

1. Establish KnowledgeOS structure, standards, and brain files.
2. Document the homelab architecture end-to-end.
3. Stand up detection engineering and threat hunting folders with reusable templates.
4. Align website publishing workflow with KnowledgeOS notes.
5. Build daily-note and project-tracking hygiene.

## Current Learning Objectives

- Enterprise Active Directory attack & defense paths
- Detection engineering with MITRE ATT&CK mapping
- Threat hunting methodology and case documentation
- Homelab hardening and monitoring maturity
- Cloud security fundamentals tied to lab scenarios
- Professional writing for public technical content

## Future Plans

- Formal detection rule repository integration
- IR playbook library with tabletop exercises
- Malware analysis lab documentation
- Product and revenue system documentation
- Automation for note scaffolding and link checks
- Optional public knowledge exports from selected vault paths

## Repository Principles

1. Modular domains, stable roots.
2. Canonical notes beat duplicated notes.
3. Templates enforce quality.
4. Diagrams explain architecture; prose explains decisions.
5. TODOs are visible and linked to [[ROADMAP]].
6. Archive instead of deleting historical truth.

## Knowledge Management Principles

- Use YAML frontmatter on every note.
- Use Obsidian wikilinks as the primary link form (example: a link to `STANDARDS`).
- Tag lightly; link heavily.
- Keep dashboards thin and indexes thick.
- Separate ephemeral daily notes from durable knowledge.

## AI Generation Philosophy

AI may draft, scaffold, refactor, and summarize — but must:

1. Read [[PROJECT_CONTEXT]], [[ARCHITECTURE]], [[STANDARDS]], and [[ROADMAP]] first.
2. Follow `.cursor/rules` for the domain being edited.
3. Prefer updating existing notes over creating near-duplicates.
4. Never invent credentials, IPs presented as production secrets, or false completion claims.
5. Mark speculation clearly and leave TODOs for unverified facts.
6. Preserve enterprise tone and cross-links.

## Related Brain Files

- [[ARCHITECTURE]]
- [[STANDARDS]]
- [[ROADMAP]]
- [[00 Home]]
- [[KnowledgeOS Dashboards]]
