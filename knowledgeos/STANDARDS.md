---
title: "STANDARDS"
tags: [brain, standards, documentation]
status: canonical
type: brain
created: 2026-07-19
updated: 2026-07-19
---

# STANDARDS

> [!tip] Quality Contract
> These standards govern every note in ElliottSecurity KnowledgeOS.

## Markdown Conventions

- Use GitHub-flavored Markdown compatible with Obsidian.
- One H1 (`#`) per note, matching the note title.
- Use ATX headings; never underline-style headings.
- Prefer short paragraphs and scannable lists.
- Use tables for inventories, comparisons, and matrices.
- Use fenced code blocks with language tags.
- Use Mermaid for architecture and process diagrams.

## Folder Naming

- Use numbered prefixes for stable top-level domains: `01-Homelab`, `04-Detection-Engineering`.
- Use `Title-Case-With-Hyphens` for multi-word folders.
- Avoid spaces in folder names.
- Keep depth shallow: prefer `Domain/Topic/Note.md` over deep nesting.

## File Naming

- Prefer readable titles: `Network Segmentation.md`.
- Use spaces in note titles for Obsidian UX.
- Templates use clear names: `DETECTION_TEMPLATE.md` style or `Detection Template.md`.
- Daily notes use `YYYY-MM-DD.md`.
- Avoid duplicate titles across the vault.

## Heading Hierarchy

```markdown
# Note Title
## Major Section
### Supporting Detail
#### Rarely needed
```

Do not skip levels. Do not use headings for emphasis alone.

## Metadata

Every durable note should include YAML frontmatter:

```yaml
---
title: "Example Note"
tags: [domain, topic]
status: draft | active | canonical | archived
type: note | overview | readme | template | dashboard | runbook | brain
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Optional fields: `owner`, `systems`, `mitre`, `severity`, `project`.

## Tags

- Use lowercase kebab-case tags: `threat-hunting`, `active-directory`.
- Prefer 2–6 tags.
- Do not encode hierarchy solely in tags; use folders + links.

Recommended roots: `homelab`, `detection`, `hunt`, `ir`, `malware`, `cloud`, `business`, `career`, `todo`.

## Callouts

```markdown
> [!summary] Summary
> Short abstract.

> [!warning] Warning
> Operational risk.

> [!todo] TODO
> Incomplete work.
```

Common callouts: `summary`, `info`, `tip`, `warning`, `danger`, `todo`, `abstract`, `success`.

## Tables

- Header row required.
- Keep columns lean.
- Use tables for inventories and ATT&CK mappings.

## Images

- Store under `99-Meta/Attachments/` or domain `assets/` folders.
- Prefer descriptive filenames: `opnsense-vlan-map.png`.
- Always include alt text.
- Prefer diagrams-as-code (Mermaid) when possible.

## Code Blocks

- Always set a language (`bash`, `powershell`, `yaml`, `json`, `sigma`, etc.).
- Redact secrets; use placeholders like `<API_KEY>`.
- For long configs, link to a dedicated note or repo path.

## Diagrams

- Use Mermaid for flows, sequences, and topology.
- Keep diagrams focused on one question.
- Place complex diagrams near the decision they support.

## Cross-Linking

- Primary link form: Obsidian wikilinks to note titles.
- Every note should include a **Related Notes** section.
- Link upward to domain Overviews and sideways to operational neighbors.
- When creating a new system note, update the domain Overview.

## Templates

- Create notes from [[Templates Index]] whenever a template exists.
- Do not fork templates casually; improve the canonical template.
- Website publishing templates also live in the Astro repo `docs/templates/` — keep concepts aligned, avoid drift.

## Naming Conventions (Systems)

| Object | Convention | Example |
| --- | --- | --- |
| Proxmox VM | `role-name-##` | `siem-wazuh-01` |
| AD objects | Enterprise-like OU paths | `OU=Servers,OU=Lab` |
| Detection IDs | `ES-DET-####` | `ES-DET-0042` |
| Hunt IDs | `ES-HUNT-####` | `ES-HUNT-0017` |
| IR cases | `ES-IR-YYYY-####` | `ES-IR-2026-0003` |

## Documentation Quality Standards

A note is complete enough when it answers:

1. What is this?
2. Why does it exist?
3. How do I operate or use it?
4. What depends on it?
5. What are the risks and TODOs?

## Git Workflow

1. Branch from `main` using `cursor/<topic>-xxxx` or standard feature branches.
2. Keep KnowledgeOS commits focused.
3. Do not commit secrets, exports with PII, or large binary dumps.
4. Open PRs for structural changes and major domain expansions.

## Commit Message Conventions

Use conventional commits:

- `docs(knowledgeos): add OPNsense segmentation overview`
- `feat(knowledgeos): add IR intake template`
- `chore(knowledgeos): update Obsidian plugin recommendations`

## Review Checklist

- [ ] Frontmatter present and valid
- [ ] H1 matches title
- [ ] Links resolve to existing notes or are intentionally planned
- [ ] No secrets or credential material
- [ ] Diagrams render (Mermaid syntax valid)
- [ ] Related Notes section updated
- [ ] Domain Overview / dashboard updated if scope changed
- [ ] TODOs tracked or closed
- [ ] Aligns with [[PROJECT_CONTEXT]] and [[ARCHITECTURE]]

## Related Notes

- [[PROJECT_CONTEXT]]
- [[ARCHITECTURE]]
- [[ROADMAP]]
- [[Templates Index]]
- [[00 Home]]
