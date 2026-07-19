#!/usr/bin/env python3
"""Generate ElliottSecurity KnowledgeOS vault (domains, templates, meta)."""

from __future__ import annotations

from pathlib import Path
from textwrap import dedent

ROOT = Path("/workspace/knowledgeos")


def w(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dedent(content).lstrip("\n"), encoding="utf-8")


def frontmatter(title: str, tags: list[str], typ: str = "note", status: str = "active") -> str:
    tag_line = ", ".join(tags)
    return dedent(
        f"""\
        ---
        title: "{title}"
        tags: [{tag_line}]
        status: {status}
        type: {typ}
        created: 2026-07-19
        updated: 2026-07-19
        ---
        """
    )


def footer() -> str:
    return "\n---\n\n**KnowledgeOS** · ElliottSecurity Internal · [[PROJECT_CONTEXT]] · [[ARCHITECTURE]] · [[STANDARDS]] · [[ROADMAP]]\n"


def related_block(links: list[str]) -> str:
    items = "\n".join(f"- [[{x}]]" for x in links) if links else "- _Add related notes._"
    return f"## Related Notes\n\n{items}\n"


def todos_block(items: list[str]) -> str:
    checks = "\n".join(f"- [ ] {i}" for i in items) if items else "- [ ] Expand this note with operational detail"
    return f"## TODOs\n\n{checks}\n"


def make_note(
    title: str,
    tags: list[str],
    summary: str,
    body: str,
    related: list[str],
    todos: list[str] | None = None,
    typ: str = "note",
    status: str = "active",
) -> str:
    return (
        frontmatter(title, tags, typ=typ, status=status)
        + f"\n# {title}\n\n"
        + f"> [!summary] Summary\n> {summary}\n\n"
        + dedent(body).lstrip("\n")
        + "\n\n"
        + related_block(related)
        + "\n"
        + todos_block(todos or [])
        + footer()
    )


def make_readme(domain: str, description: str, tree: str, entrypoints: list[str]) -> str:
    entries = "\n".join(f"- [[{e}]]" for e in entrypoints)
    return (
        frontmatter(f"{domain} README", ["readme", domain.lower().replace(" ", "-")], typ="readme")
        + f"\n# {domain}\n\n{description}\n\n## Entrypoints\n\n{entries}\n\n"
        + f"## Folder Layout\n\n```text\n{tree}\n```\n\n"
        + "## Conventions\n\n- Follow [[STANDARDS]]\n- Prefer one concept per note\n- Cross-link aggressively\n- Track unfinished work with checkboxes\n\n"
        + "## Brain Alignment\n\n- [[PROJECT_CONTEXT]]\n- [[ARCHITECTURE]]\n- [[STANDARDS]]\n- [[ROADMAP]]\n"
    )


def make_overview(domain: str, purpose: str, sections: list[tuple[str, str]], related: list[str]) -> str:
    section_md = "\n".join(f"### [[{name}]]\n\n{desc}\n" for name, desc in sections)
    return (
        frontmatter(f"{domain} Overview", ["overview", domain.lower().replace(" ", "-")], typ="overview")
        + f"\n# {domain} Overview\n\n"
        + f"> [!abstract] Purpose\n> {purpose}\n\n## Scope\n\n{section_md}\n"
        + "## Operating Principles\n\n"
        + "1. Document systems as if an enterprise SOC depends on them.\n"
        + "2. Prefer reusable runbooks over tribal knowledge.\n"
        + "3. Link every note into the knowledge graph.\n"
        + "4. Keep secrets out of Git.\n"
        + "5. Update this overview when the domain changes.\n\n"
        + related_block(related)
        + "\n## Dashboard\n\nSee [[00 Home]] and [[KnowledgeOS Dashboards]].\n"
        + footer()
    )


def make_todos(domain: str, items: list[str]) -> str:
    checks = "\n".join(f"- [ ] {i} #todo" for i in items)
    return (
        frontmatter(f"{domain} TODOs", ["todo", domain.lower().replace(" ", "-")], typ="todo", status="draft")
        + f"\n# {domain} TODOs\n\n{checks}\n\n"
        + related_block([f"{domain} Overview", "ROADMAP", "KnowledgeOS Dashboards"])
    )


DOMAINS: list[dict] = [
    {
        "slug": "01-Homelab",
        "title": "Homelab",
        "purpose": "Document the ElliottSecurity homelab as an enterprise lab with inventory, roles, and maturity targets.",
        "related": ["ARCHITECTURE", "Networking Overview", "Infrastructure Overview", "Proxmox Overview"],
        "todos": [
            "Complete host inventory with verification dates",
            "Attach network diagram to real VLAN IDs",
            "Define rebuild runbook for critical VMs",
        ],
        "sections": [
            ("Homelab Design Principles", "Rules that govern lab realism and maintainability."),
            ("Homelab Inventory", "Hosts, roles, and zone assignments."),
            ("Homelab Maturity Model", "Capability scoring model."),
            ("Lab Catalog", "Scenario catalog for intentional practice."),
        ],
        "notes": [
            {
                "path": "Homelab Design Principles.md",
                "title": "Homelab Design Principles",
                "tags": ["homelab", "architecture"],
                "summary": "Design rules that keep the lab realistic, segmented, and maintainable.",
                "related": ["Homelab Overview", "Homelab Maturity Model", "ARCHITECTURE"],
                "body": """\
                    ## Principles

                    1. **Enterprise realism** — prefer patterns found in real SOCs and IT orgs.
                    2. **Segmentation first** — lab, core, and management are not flat networks.
                    3. **Telemetry by default** — if it runs, it should emit useful logs.
                    4. **Recoverability** — backups and rebuild paths are first-class.
                    5. **Document before cleverness** — undocumented magic is debt.

                    ## Maturity Stages

                    | Stage | Meaning |
                    | --- | --- |
                    | L1 | Boots and routes |
                    | L2 | Segmented + inventoried |
                    | L3 | Monitored + backed up |
                    | L4 | Detection-validated |
                    | L5 | Drill-tested IR + purple team ready |
                    """,
            },
            {
                "path": "Homelab Inventory.md",
                "title": "Homelab Inventory",
                "tags": ["homelab", "inventory"],
                "summary": "Canonical inventory placeholder for hosts, VMs, and network roles.",
                "related": ["Homelab Overview", "Proxmox Overview", "Network Segmentation"],
                "body": """\
                    ## Host Inventory

                    | Name | Role | Platform | Zone | Status |
                    | --- | --- | --- | --- | --- |
                    | proxmox-01 | Hypervisor | Proxmox | Core | Planned detail |
                    | opnsense-01 | Firewall/Router | OPNsense | Edge | Planned detail |
                    | dc-01 | Domain Controller | Windows Server | Lab | Planned detail |
                    | so-01 | NSM visibility | Security Onion | Management | Planned detail |
                    | wazuh-01 | XDR/SIEM | Wazuh | Management | Planned detail |
                    | velo-01 | EDR/triage | Velociraptor | Management | Planned detail |

                    > [!todo] Populate truth
                    > Replace placeholders with real hostnames and non-secret addressing details.
                    """,
            },
            {
                "path": "Homelab Maturity Model.md",
                "title": "Homelab Maturity Model",
                "tags": ["homelab", "maturity"],
                "summary": "Capability model for progressing from hobby lab to enterprise-like environment.",
                "related": ["Homelab Overview", "ROADMAP", "Monitoring Overview"],
                "body": """\
                    ## Capability Tracks

                    - Identity & Access
                    - Network Security
                    - Endpoint Visibility
                    - Detection Engineering
                    - Incident Response Readiness
                    - Backup & Recovery
                    - Documentation Quality

                    Score each track 1–5 and link evidence notes.
                    """,
            },
            {
                "path": "Labs/Lab Catalog.md",
                "title": "Lab Catalog",
                "tags": ["homelab", "labs"],
                "summary": "Catalog of intentional lab scenarios and ranges.",
                "related": ["Homelab Overview", "Active Directory Overview", "Detection Engineering Overview"],
                "body": """\
                    ## Active Labs

                    | Lab | Objective | Domain | Status |
                    | --- | --- | --- | --- |
                    | AD Basics | Build and baseline a small domain | Active Directory | Planned |
                    | Detection Loop | Validate one detection end-to-end | Detection Engineering | Planned |
                    | IR Tabletop | Practice intake → containment | Incident Response | Planned |

                    Every lab should produce durable notes: setup, path, telemetry, lessons.
                    """,
            },
        ],
    },
    {
        "slug": "02-Networking",
        "title": "Networking",
        "purpose": "Capture edge, segmentation, VPN, DNS, and traffic visibility design.",
        "related": ["ARCHITECTURE", "OPNsense Overview", "WireGuard Overview", "Homelab Overview"],
        "todos": ["Confirm VLAN/subnet table", "Export sanitized firewall alias list", "Document WireGuard peer classes"],
        "sections": [
            ("Network Diagram", "Logical topology diagram."),
            ("Network Segmentation", "Zone model and trust boundaries."),
            ("DNS and DHCP", "Addressing and name services."),
            ("Firewall Policy Design", "Rule architecture and change control."),
        ],
        "notes": [
            {
                "path": "Network Diagram.md",
                "title": "Network Diagram",
                "tags": ["networking", "diagram"],
                "summary": "Canonical logical network diagram for the environment.",
                "related": ["Networking Overview", "OPNsense Overview", "ARCHITECTURE"],
                "body": """\
                    ```mermaid
                    flowchart LR
                      Inet((Internet)) --> CF[Cloudflare]
                      CF --> WG[WireGuard]
                      WG --> FW[OPNsense]
                      FW --> VLAN10[VLAN10 Core]
                      FW --> VLAN20[VLAN20 Lab]
                      FW --> VLAN30[VLAN30 Endpoints]
                      FW --> VLAN40[VLAN40 Management]
                      VLAN10 --> PX[Proxmox]
                      VLAN20 --> AD[AD / Targets]
                      VLAN30 --> EP[Windows/Linux Endpoints]
                      VLAN40 --> SEC[SO / Wazuh / Velociraptor]
                    ```

                    Update VLAN numbers when physical truth is confirmed.
                    """,
            },
            {
                "path": "Network Segmentation.md",
                "title": "Network Segmentation",
                "tags": ["networking", "segmentation"],
                "summary": "Trust-zone model and east-west controls.",
                "related": ["Networking Overview", "Firewall Policy Design", "ARCHITECTURE"],
                "body": """\
                    ## Zones

                    | Zone | Trust | Examples |
                    | --- | --- | --- |
                    | Edge | Lowest | WAN, WG endpoint |
                    | Core | Medium-High | Hypervisor management |
                    | Lab | Low-Medium | AD attack range |
                    | Endpoints | Medium | User-like devices |
                    | Management | High | SIEM/EDR tooling |

                    Default deny between zones unless documented. Lab compromise must not freely reach management.
                    """,
            },
            {
                "path": "DNS and DHCP.md",
                "title": "DNS and DHCP",
                "tags": ["networking", "dns", "dhcp"],
                "summary": "Name resolution and addressing strategy.",
                "related": ["Networking Overview", "OPNsense Overview", "Active Directory Overview"],
                "body": """\
                    ## Intent

                    - Centralize DHCP where practical
                    - Use consistent host naming
                    - Document split DNS if public Cloudflare names coexist with internal zones
                    """,
            },
            {
                "path": "Firewall Policy Design.md",
                "title": "Firewall Policy Design",
                "tags": ["networking", "firewall"],
                "summary": "How firewall rules are structured, reviewed, and audited.",
                "related": ["OPNsense Overview", "Network Segmentation", "Incident Response Overview"],
                "body": """\
                    ## Policy Structure

                    1. Kill switches / emergency blocks
                    2. Management access
                    3. Explicit service allows
                    4. Broad deny with logging

                    Every non-trivial rule change should reference a note rationale.
                    """,
            },
        ],
    },
]


INFRA_NOTES = [
    ("Proxmox Overview.md", "Proxmox Overview", ["infrastructure", "proxmox"], "Virtualization platform overview and operating standards.",
     ["Infrastructure Overview", "Homelab Inventory", "Storage and Backups"],
     """\
     ## Responsibilities
     - Host VMs/LXCs for lab and management workloads
     - Provide snapshot and backup integration points
     - Expose bridges mapped to segmented networks

     ## Standards
     - Naming: `role-name-##`
     - Document CPU/RAM/disk intent per critical VM
     - No undocumented passthrough devices
     """),
    ("OPNsense Overview.md", "OPNsense Overview", ["infrastructure", "opnsense"], "Edge firewall/router platform notes.",
     ["Networking Overview", "Firewall Policy Design", "WireGuard Overview"],
     """\
     ## Capabilities in Scope
     - Routing and NAT
     - Firewall segmentation
     - VPN termination patterns
     - DHCP/DNS services as designed
     """),
    ("WireGuard Overview.md", "WireGuard Overview", ["infrastructure", "vpn", "wireguard"], "Remote access architecture using WireGuard.",
     ["VPN Access Runbook", "OPNsense Overview", "Network Segmentation"],
     """\
     ## Design Goals
     - Least-privilege network access for remote administration
     - Device inventory without storing private keys in Git
     - Clear break-glass path
     """),
    ("Cloudflare Overview.md", "Cloudflare Overview", ["infrastructure", "cloudflare"], "DNS, Pages, and edge security services.",
     ["Website Overview", "Platform Overview", "ARCHITECTURE"],
     """\
     ## Current Uses
     - Public DNS
     - Cloudflare Pages for ElliottSecurity website
     - Future Zero Trust / Access experiments

     Keep API tokens outside the vault.
     """),
    ("Docker Overview.md", "Docker Overview", ["infrastructure", "docker"], "Container hosting standards.",
     ["Infrastructure Overview", "Monitoring Overview", "Storage and Backups"],
     """\
     ## Standards
     - Compose-first where practical
     - Pin image versions for important services
     - Document published ports and upstream proxies
     - Back up named volumes intentionally
     """),
    ("Windows Estate Overview.md", "Windows Estate Overview", ["infrastructure", "windows"], "Windows servers and endpoints in the lab estate.",
     ["Active Directory Overview", "Detection Engineering Overview", "Velociraptor Overview"],
     """\
     ## Roles
     - Domain controllers
     - Member servers
     - Workstation-class endpoints for telemetry and attack simulation
     """),
    ("Linux Estate Overview.md", "Linux Estate Overview", ["infrastructure", "linux"], "Linux servers and utility hosts.",
     ["Docker Overview", "Wazuh Overview", "Infrastructure Overview"],
     """\
     ## Roles
     - Container hosts
     - Collectors and reverse proxies
     - Hardening and detection validation targets
     """),
    ("Security Onion Overview.md", "Security Onion Overview", ["infrastructure", "security-onion"], "Network security monitoring platform.",
     ["Monitoring Overview", "Threat Hunting Overview", "Incident Response Overview"],
     """\
     ## Mission in Lab
     Provide visibility that supports hunts and IR drills. Document sensor placement and investigation workflows.
     """),
    ("Wazuh Overview.md", "Wazuh Overview", ["infrastructure", "wazuh"], "Wazuh deployment and triage path.",
     ["Monitoring Overview", "Incident Response Overview", "Elastic Overview"],
     """\
     ## Goals
     - Agent coverage for critical hosts
     - Actionable alerts with low noise
     - Clear path into IR case notes
     """),
    ("Velociraptor Overview.md", "Velociraptor Overview", ["infrastructure", "velociraptor"], "Endpoint visibility and collection platform.",
     ["Incident Response Overview", "Threat Hunting Overview", "Windows Estate Overview"],
     """\
     ## Use Cases
     - Triage collections during IR drills
     - Hunt-oriented artifact gathering
     - Endpoint inventory enrichment
     """),
    ("Elastic Overview.md", "Elastic Overview", ["infrastructure", "elastic"], "Search and analytics patterns for telemetry.",
     ["Wazuh Overview", "Detection Engineering Overview", "Monitoring Overview"],
     """\
     Support detection development, dashboards, and investigation search. Keep index/retention decisions explicit.
     """),
    ("Storage and Backups.md", "Storage and Backups", ["infrastructure", "storage", "backups"], "Storage pools, backup targets, and restore expectations.",
     ["Proxmox Overview", "Homelab Maturity Model", "Incident Response Overview"],
     """\
     ## Backup Principles
     1. Criticality-based schedules
     2. Tested restores beat untested backups
     3. Off-host copies for disaster scenarios
     4. Document RPO/RTO targets even in a homelab
     """),
    ("Monitoring Overview.md", "Monitoring Overview", ["infrastructure", "monitoring"], "Availability and security monitoring map.",
     ["Security Onion Overview", "Wazuh Overview", "Velociraptor Overview"],
     """\
     ```mermaid
     flowchart LR
       Endpoints --> Agents[Wazuh / Velociraptor]
       Network --> SO[Security Onion]
       Agents --> SIEM[Alerting / Search]
       SO --> SIEM
       SIEM --> IR[IR Intake]
       SIEM --> Hunts[Threat Hunts]
     ```
     """),
    ("VPN Access Runbook.md", "VPN Access Runbook", ["infrastructure", "vpn", "runbook"], "Operational runbook for WireGuard access.",
     ["WireGuard Overview", "Incident Response Overview", "Network Segmentation"],
     """\
     ## Steps
     1. Confirm device compliance expectations.
     2. Issue/rotate peer config via secure channel (not Git).
     3. Verify AllowedIPs match least privilege.
     4. Validate access and logging.
     5. Record peer metadata in inventory (no private keys).

     ## Rollback
     Disable peer and rotate keys if compromise suspected.
     """, "runbook"),
]


MORE_DOMAINS: list[dict] = [
    {
        "slug": "04-Detection-Engineering",
        "title": "Detection Engineering",
        "purpose": "Build detections as reusable, tested, ATT&CK-mapped knowledge assets.",
        "related": ["Threat Hunting Overview", "Incident Response Overview", "Wazuh Overview", "Elastic Overview"],
        "todos": ["Publish first validated detection note", "Define rule storage conventions vs website downloads", "Create ATT&CK coverage matrix"],
        "sections": [
            ("Detection Lifecycle", "End-to-end process."),
            ("MITRE Mapping Guide", "ATT&CK mapping standards."),
            ("Detection Quality Bar", "Definition of done."),
            ("Detections Index", "Detection registry."),
        ],
        "notes": [
            ("Detection Lifecycle.md", "Detection Lifecycle", ["detection", "process"],
             "From hypothesis to production-quality detection.",
             ["Detection Engineering Overview", "Detection Quality Bar", "Detections Index"],
             """\
             ```mermaid
             flowchart LR
               H[Hypothesis] --> R[Research]
               R --> D[Draft Rule]
               D --> V[Validate]
               V --> T[Tune]
               T --> P[Publish Internal]
               P --> M[Monitor FP/FN]
               M --> I[Improve or Retire]
             ```
             """),
            ("MITRE Mapping Guide.md", "MITRE Mapping Guide", ["detection", "mitre"],
             "How ElliottSecurity maps detections and hunts to ATT&CK.",
             ["Detection Engineering Overview", "Threat Hunting Overview"],
             "Map primary technique IDs; avoid shotgun mapping. Include tactic names. Link related hunts and IR playbooks."),
            ("Detection Quality Bar.md", "Detection Quality Bar", ["detection", "quality"],
             "Definition of done for a detection note.",
             ["Detection Lifecycle", "STANDARDS", "Incident Response Overview"],
             """\
             A detection is ready when it has:
             - Clear intent and data source
             - Logic with comments
             - MITRE mapping
             - Validation evidence
             - FP expectations and tuning notes
             - Response hint linking to IR
             """),
            ("Detections/Detections Index.md", "Detections Index", ["detection", "index"],
             "Index of detection notes and IDs.",
             ["Detection Engineering Overview", "Detection Lifecycle"],
             """\
             | ID | Title | Status | MITRE |
             | --- | --- | --- | --- |
             | ES-DET-0001 | Placeholder: Suspicious Process Ancestry | Planned | T1059 |
             """),
        ],
    },
    {
        "slug": "05-Threat-Hunting",
        "title": "Threat Hunting",
        "purpose": "Document hunt methodology, hypotheses, and case studies as repeatable practice.",
        "related": ["Detection Engineering Overview", "Security Onion Overview", "Velociraptor Overview"],
        "todos": ["Complete first hunt case study", "Link hunts to detections created", "Define confidence language"],
        "sections": [
            ("Hunt Methodology", "Standard operating loop."),
            ("Hunt Hypothesis Backlog", "Future hunts."),
            ("Hunts Index", "Case registry."),
        ],
        "notes": [
            ("Hunt Methodology.md", "Hunt Methodology", ["hunt", "methodology"],
             "Standard threat hunting loop for ElliottSecurity.",
             ["Threat Hunting Overview", "Detection Engineering Overview", "Hunts Index"],
             """\
             1. Intelligence / hypothesis
             2. Scope and data availability check
             3. Query / collect
             4. Analyze
             5. Document findings
             6. Convert outcomes into detections or IR improvements
             """),
            ("Hunt Hypothesis Backlog.md", "Hunt Hypothesis Backlog", ["hunt", "backlog"],
             "Parking lot for hunt hypotheses.",
             ["Threat Hunting Overview", "ROADMAP", "Network Segmentation"],
             """\
             - [ ] Unusual parent-child process chains on Windows endpoints
             - [ ] New local admin creations outside change windows
             - [ ] Spikes in failed logons followed by success
             - [ ] Rare outbound destinations from management VLAN
             """),
            ("Hunts/Hunts Index.md", "Hunts Index", ["hunt", "index"],
             "Registry of hunt case notes.",
             ["Threat Hunting Overview", "Hunt Methodology"],
             "| ID | Title | Status |\n| --- | --- | --- |\n| ES-HUNT-0001 | Placeholder hunt | Planned |"),
        ],
    },
    {
        "slug": "06-Incident-Response",
        "title": "Incident Response",
        "purpose": "Maintain IR doctrine, playbooks, and case documentation for lab and real incidents.",
        "related": ["Threat Hunting Overview", "Malware Analysis Overview", "Velociraptor Overview"],
        "todos": ["Write severity rubric", "Author two core playbooks", "Schedule first tabletop"],
        "sections": [
            ("IR Doctrine", "Principles and severity language."),
            ("IR Intake Process", "From alert to case."),
            ("Playbooks Index", "Response playbooks."),
            ("Cases Index", "Case registry."),
        ],
        "notes": [
            ("IR Doctrine.md", "IR Doctrine", ["ir", "doctrine"],
             "Guiding principles for incident response at ElliottSecurity.",
             ["Incident Response Overview", "IR Intake Process", "Detection Engineering Overview"],
             """\
             1. Safety and evidence integrity over haste
             2. Clear severity language
             3. Document decisions in-case
             4. Contain before eradicate when necessary
             5. Every incident produces detections/hunt improvements
             """),
            ("IR Intake Process.md", "IR Intake Process", ["ir", "process"],
             "How alerts and suspicions become IR cases.",
             ["IR Doctrine", "Cases Index", "Playbooks Index"],
             """\
             ```mermaid
             flowchart TD
               A[Alert or Human Report] --> B{Triage}
               B -->|Benign| C[Close with notes]
               B -->|Suspicious| D[Create ES-IR case]
               D --> E[Containment decision]
               E --> F[Investigation]
               F --> G[Eradicate / Recover]
               G --> H[Lessons Learned]
               H --> I[Detections / Docs updates]
             ```
             """),
            ("Playbooks/Playbooks Index.md", "Playbooks Index", ["ir", "playbooks"],
             "Index of IR playbooks.",
             ["Incident Response Overview", "IR Doctrine"],
             "| Playbook | Status |\n| --- | --- |\n| Phishing triage | Planned |\n| Ransomware containment (lab) | Planned |\n| Compromised account | Planned |"),
            ("Cases/Cases Index.md", "Cases Index", ["ir", "cases"],
             "IR case registry.",
             ["Incident Response Overview", "IR Intake Process"],
             "| Case ID | Title | Severity | Status |\n| --- | --- | --- | --- |\n| ES-IR-2026-0001 | Placeholder case | Low | Planned |"),
        ],
    },
    {
        "slug": "07-Malware-Analysis",
        "title": "Malware Analysis",
        "purpose": "Safe, structured malware analysis documentation and lab SOPs.",
        "related": ["Incident Response Overview", "Detection Engineering Overview", "Homelab Overview"],
        "todos": ["Define detonation environment", "Create analysis report template instance", "Establish sample storage outside Git"],
        "sections": [
            ("Analysis Lab Safety", "Containment rules."),
            ("Static Analysis Workflow", "Static process."),
            ("Dynamic Analysis Workflow", "Dynamic process."),
            ("Samples Index", "Hash registry."),
        ],
        "notes": [
            ("Analysis Lab Safety.md", "Analysis Lab Safety", ["malware", "safety"],
             "Safety and containment rules for malware work.",
             ["Malware Analysis Overview", "Network Segmentation", "Homelab Overview"],
             """\
             ## Hard Rules
             - No analysis on production/personal primary devices
             - Isolated network segment or intentionally controlled egress
             - Snapshot/restore discipline
             - Never commit samples to Git
             - Record hash inventory only in notes
             """),
            ("Static Analysis Workflow.md", "Static Analysis Workflow", ["malware", "static-analysis"],
             "Static analysis checklist.",
             ["Malware Analysis Overview", "Dynamic Analysis Workflow"],
             "1. Hash and identify\n2. Strings / metadata\n3. PE/structure review\n4. YARA / capability hypotheses\n5. Document IOCs carefully"),
            ("Dynamic Analysis Workflow.md", "Dynamic Analysis Workflow", ["malware", "dynamic-analysis"],
             "Dynamic analysis checklist.",
             ["Analysis Lab Safety", "Detection Engineering Overview", "Incident Response Overview"],
             "1. Confirm isolation\n2. Snapshot\n3. Execute under observation\n4. Capture changes\n5. Revert and extract conclusions"),
            ("Samples/Samples Index.md", "Samples Index", ["malware", "samples"],
             "Hash-only sample registry. No binaries in Git.",
             ["Malware Analysis Overview", "Analysis Lab Safety"],
             "| SHA256 | Family/Tag | Notes | Status |\n| --- | --- | --- | --- |\n| _none yet_ | — | — | — |"),
        ],
    },
    {
        "slug": "08-Active-Directory",
        "title": "Active Directory",
        "purpose": "Enterprise identity lab documentation: design, hardening, attack paths, and defenses.",
        "related": ["Windows Estate Overview", "Detection Engineering Overview", "Homelab Overview"],
        "todos": ["Finalize domain design diagram", "Document privileged group model", "Create AD detection candidates list"],
        "sections": [
            ("AD Design", "Identity topology."),
            ("AD Hardening", "Controls."),
            ("AD Attack Paths", "Offense-informed defense."),
            ("GPO Baseline", "Policy inventory."),
        ],
        "notes": [
            ("AD Design.md", "AD Design", ["active-directory", "design"],
             "Forest/domain/OU design for the lab.",
             ["Active Directory Overview", "AD Hardening", "Windows Estate Overview"],
             "Goals: realistic OU structure, clear privilege tiers, enough complexity for meaningful attack-path practice."),
            ("AD Hardening.md", "AD Hardening", ["active-directory", "hardening"],
             "Hardening controls and baselines.",
             ["GPO Baseline", "AD Attack Paths", "Detection Engineering Overview"],
             "Themes: tiered administration, least privilege, credential hygiene patterns, auditing for detections."),
            ("AD Attack Paths.md", "AD Attack Paths", ["active-directory", "attack-paths"],
             "Known or hypothesized attack paths in the lab domain.",
             ["AD Design", "Threat Hunting Overview", "MITRE Mapping Guide"],
             "Document paths with premises, MITRE techniques, telemetry opportunities, and detection/hunt links."),
            ("GPO Baseline.md", "GPO Baseline", ["active-directory", "gpo"],
             "Group Policy baseline inventory.",
             ["AD Hardening", "Windows Estate Overview"],
             "| GPO | Purpose | Linked OU | Status |\n| --- | --- | --- | --- |\n| Baseline Workstations | Hardening + auditing | Workstations | Planned |\n| Baseline Servers | Server hardening | Servers | Planned |"),
        ],
    },
    {
        "slug": "09-Cloud",
        "title": "Cloud",
        "purpose": "Cloud security learning, lab accounts, and platform hosting dependencies.",
        "related": ["Cloudflare Overview", "Platform Overview", "ARCHITECTURE"],
        "todos": ["Decide primary cloud lab provider for next 90 days", "Create budget alarm checklist", "Map cloud telemetry into hunt ideas"],
        "sections": [
            ("Cloud Lab Guardrails", "Account safety."),
            ("AWS Learning Track", "AWS path."),
            ("Azure Learning Track", "Azure path."),
            ("Cloudflare Platform Notes", "Edge/hosting notes."),
        ],
        "notes": [
            ("Cloud Lab Guardrails.md", "Cloud Lab Guardrails", ["cloud", "guardrails"],
             "Safety rails for cloud experimentation.",
             ["Cloud Overview", "Cloudflare Overview", "Automation Overview"],
             "- Isolated lab accounts\n- Budget alarms required\n- No long-lived admin keys in Git\n- Prefer short-lived credentials\n- Destroy unused resources intentionally"),
            ("AWS Learning Track.md", "AWS Learning Track", ["cloud", "aws"],
             "Structured AWS learning objectives tied to security outcomes.",
             ["Cloud Overview", "Certifications Overview", "Detection Engineering Overview"],
             "Focus: IAM, CloudTrail, VPC, S3 security, detection ideas, cost control."),
            ("Azure Learning Track.md", "Azure Learning Track", ["cloud", "azure"],
             "Structured Azure learning objectives.",
             ["Cloud Overview", "Active Directory Overview", "Certifications Overview"],
             "Focus: Entra ID basics, Conditional Access concepts, Sentinel awareness, RBAC."),
            ("Cloudflare Platform Notes.md", "Cloudflare Platform Notes", ["cloud", "cloudflare"],
             "Cloudflare as both edge security and hosting dependency.",
             ["Cloudflare Overview", "Website Overview", "Platform Overview"],
             "Cross-link with infrastructure and website notes. Document Pages project settings at a high level."),
        ],
    },
    {
        "slug": "10-Programming",
        "title": "Programming",
        "purpose": "Engineering notes, languages, tooling, and coding standards.",
        "related": ["Platform Overview", "Automation Overview", "Website Overview"],
        "todos": ["Create script standards for KnowledgeOS generators", "Add snippet library note", "Document Python environment preferences"],
        "sections": [
            ("Language Tracks", "Languages and priorities."),
            ("Engineering Standards", "Code quality bar."),
            ("Tooling", "Developer toolchain."),
        ],
        "notes": [
            ("Language Tracks.md", "Language Tracks", ["programming", "learning"],
             "Languages in active use and study.",
             ["Programming Overview", "Automation Overview", "Detection Engineering Overview"],
             "| Language | Use | Priority |\n| --- | --- | --- |\n| TypeScript | Website/platform | High |\n| Python | Automation, analysis | High |\n| PowerShell | Windows/AD ops | High |\n| Bash | Linux ops | Medium |\n| KQL/Sigma-like | Detections | High |"),
            ("Engineering Standards.md", "Engineering Standards", ["programming", "standards"],
             "Coding standards for ElliottSecurity projects.",
             ["STANDARDS", "Platform Overview", "Automation Overview"],
             "- Prefer clarity over cleverness\n- Type safety where available\n- Tests for non-trivial automation\n- Secrets never in repo"),
            ("Tooling.md", "Tooling", ["programming", "tooling"],
             "Core developer tooling.",
             ["Programming Overview", "Website Overview", "Automation Overview"],
             "- Cursor / VS Code\n- GitHub\n- Node.js / npm for Astro site\n- Python for vault automation\n- Obsidian for knowledge authoring"),
        ],
    },
    {
        "slug": "11-Career",
        "title": "Career",
        "purpose": "Career strategy, positioning, evidence portfolio, and professional development.",
        "related": ["Certifications Overview", "Website Overview", "Business Overview"],
        "todos": ["Define 12-month career outcomes", "Create interview story bank", "Quarterly evidence portfolio review"],
        "sections": [
            ("Positioning", "Professional narrative."),
            ("Evidence Portfolio", "Proof artifacts."),
            ("Networking and Community", "Community strategy."),
        ],
        "notes": [
            ("Positioning.md", "Positioning", ["career", "branding"],
             "Professional positioning for ElliottSecurity / Logan Elliott.",
             ["Career Overview", "Website Overview", "Evidence Portfolio"],
             "Narrative: practical cybersecurity engineer building transparent documentation, detections, hunts, and infrastructure work."),
            ("Evidence Portfolio.md", "Evidence Portfolio", ["career", "portfolio"],
             "Map of proof artifacts for hiring conversations.",
             ["Positioning", "Products Overview", "ROADMAP"],
             "| Claim | Evidence | Status |\n| --- | --- | --- |\n| Builds real labs | [[Homelab Overview]] | Active |\n| Writes detections | [[Detection Engineering Overview]] | Building |\n| Hunts methodically | [[Threat Hunting Overview]] | Building |\n| Ships public docs | [[Website Overview]] | Active |"),
            ("Networking and Community.md", "Networking and Community", ["career", "community"],
             "Community engagement plan.",
             ["Career Overview", "Marketing Overview", "Research Overview"],
             "Share curated public writeups. Participate with substance. Track talk/post ideas under Research."),
        ],
    },
    {
        "slug": "12-Certifications",
        "title": "Certifications",
        "purpose": "Certification planning, study systems, and exam readiness tracking.",
        "related": ["Career Overview", "Cloud Overview", "Detection Engineering Overview"],
        "todos": ["Choose next certification", "Build objective-to-note map", "Schedule study blocks in daily notes"],
        "sections": [
            ("Certification Roadmap", "Targets and timing."),
            ("Study System", "How learning is captured."),
            ("Exam Readiness Checklist", "Go/no-go gate."),
        ],
        "notes": [
            ("Certification Roadmap.md", "Certification Roadmap", ["certifications", "planning"],
             "Ordered certification targets.",
             ["Certifications Overview", "Career Overview", "ROADMAP"],
             "| Cert | Why | Target Window | Status |\n| --- | --- | --- |\n| TBD Foundation | Core credibility | Near-term | Planning |\n| TBD Detection/Blue Team | SOC path | Mid-term | Idea |\n| TBD Cloud Security | Cloud track | Later | Idea |"),
            ("Study System.md", "Study System", ["certifications", "study"],
             "How studying works inside KnowledgeOS.",
             ["Daily Notes Overview", "Certification Roadmap"],
             "- Concept notes over highlight dumps\n- Link labs that prove skills\n- Spaced review via daily/weekly notes\n- Practice exams tracked with weak-topic follow-ups"),
            ("Exam Readiness Checklist.md", "Exam Readiness Checklist", ["certifications", "checklist"],
             "Generic exam readiness gate.",
             ["Study System", "Certification Roadmap"],
             "- [ ] Objectives fully mapped to notes\n- [ ] Weak topics remediated\n- [ ] Practice score threshold met\n- [ ] Lab evidence linked\n- [ ] Logistics scheduled"),
        ],
    },
    {
        "slug": "13-Research",
        "title": "Research",
        "purpose": "Research pipeline from idea → experiment → writeup → publish candidate.",
        "related": ["Website Overview", "Detection Engineering Overview", "Threat Hunting Overview"],
        "todos": ["Select monthly research theme", "Create experiment note from template", "Define publish-candidate criteria"],
        "sections": [
            ("Research Pipeline", "End-to-end process."),
            ("Idea Backlog", "Idea parking lot."),
            ("Experiments Index", "Experiment registry."),
        ],
        "notes": [
            ("Research Pipeline.md", "Research Pipeline", ["research", "process"],
             "Lifecycle for research work.",
             ["Research Overview", "Website Overview", "Idea Backlog"],
             "Idea → Scope → Experiment → Findings → Internal note → Publish candidate → Website article"),
            ("Idea Backlog.md", "Idea Backlog", ["research", "ideas"],
             "Raw research ideas.",
             ["Research Pipeline", "ROADMAP", "Marketing Overview"],
             "- Homelab detection debt analysis\n- AD attack path → detection engineering case study\n- WireGuard + OPNsense visibility gaps\n- KnowledgeOS metrics for SOC-like personal operations"),
            ("Experiments/Experiments Index.md", "Experiments Index", ["research", "experiments"],
             "Index of experiments.",
             ["Research Overview", "Research Pipeline"],
             "| Experiment | Hypothesis | Status |\n| --- | --- | --- |\n| Placeholder | — | Planned |"),
        ],
    },
    {
        "slug": "14-Business",
        "title": "Business",
        "purpose": "Business planning and operating cadence for ElliottSecurity as an enterprise-of-one.",
        "related": ["Products Overview", "Marketing Overview", "Revenue Overview", "ROADMAP"],
        "todos": ["Define quarterly OKRs", "Clarify offer hypotheses", "Connect business goals to content calendar"],
        "sections": [
            ("Business Model", "Value creation."),
            ("Operating Cadence", "Rhythm."),
            ("Goals and OKRs", "Outcomes."),
        ],
        "notes": [
            ("Business Model.md", "Business Model", ["business", "strategy"],
             "How ElliottSecurity creates and captures value.",
             ["Business Overview", "Products Overview", "Revenue Overview"],
             "Current emphasis: public knowledge platform as credibility engine; products/services to validate; documentation quality as moat."),
            ("Operating Cadence.md", "Operating Cadence", ["business", "cadence"],
             "Weekly/monthly operating rhythm.",
             ["Goals and OKRs", "Daily Notes Overview", "ROADMAP"],
             "| Cadence | Activity |\n| --- | --- |\n| Daily | Daily note, deep work block |\n| Weekly | Roadmap review, publish candidate check |\n| Monthly | Goals/OKR review, financial snapshot |\n| Quarterly | Strategy refresh |"),
            ("Goals and OKRs.md", "Goals and OKRs", ["business", "okrs"],
             "Current goals and measurable outcomes.",
             ["Business Overview", "ROADMAP", "Products Overview"],
             "1. Ship KnowledgeOS v1.0 foundation\n2. Publish high-signal homelab/detection content\n3. Clarify product direction"),
        ],
    },
    {
        "slug": "15-Platform",
        "title": "Platform",
        "purpose": "ElliottSecurity Platform architecture: content systems, publishing, and internal tooling.",
        "related": ["Website Overview", "Automation Overview", "ARCHITECTURE"],
        "todos": ["Formalize vault→site promotion checklist", "Document content collection schemas in vault language", "Add platform health metrics"],
        "sections": [
            ("Platform Architecture", "System relationship diagram."),
            ("Content Model", "Types and ownership."),
            ("Publishing Workflow", "Release path."),
        ],
        "notes": [
            ("Platform Architecture.md", "Platform Architecture", ["platform", "architecture"],
             "How KnowledgeOS and the public platform relate.",
             ["Platform Overview", "Website Overview", "PROJECT_CONTEXT"],
             """\
             ```mermaid
             flowchart LR
               KOS[KnowledgeOS Vault] -->|Curate| Content[Astro Content Collections]
               Content --> Build[Astro Build]
               Build --> CF[Cloudflare Pages]
               Rules[.cursor rules] --> KOS
               Brain[Brain Files] --> Agents[AI Agents]
               Agents --> KOS
             ```
             """),
            ("Content Model.md", "Content Model", ["platform", "content"],
             "Content types across vault and website.",
             ["Website Overview", "Publishing Workflow", "STANDARDS"],
             "Website collections: articles, projects, threat-hunts, detections, homelab, products. KnowledgeOS domains are broader and include private operational detail."),
            ("Publishing Workflow.md", "Publishing Workflow", ["platform", "publishing"],
             "Path from internal note to public page.",
             ["Platform Architecture", "Website Overview", "Research Pipeline"],
             "1. Develop in KnowledgeOS\n2. Sanitize secrets / lab specifics\n3. Create/update Astro content Markdown\n4. PR → main → Cloudflare Pages"),
        ],
    },
    {
        "slug": "16-Website",
        "title": "Website",
        "purpose": "Public ElliottSecurity website documentation, IA, and content operations.",
        "related": ["Platform Overview", "Marketing Overview", "Content Model"],
        "todos": ["Align IA with current Astro routes", "Define editorial checklist", "List cornerstone pages to strengthen"],
        "sections": [
            ("Information Architecture", "Public structure."),
            ("Content Operations", "How content ships."),
            ("SEO and Distribution", "Discoverability."),
        ],
        "notes": [
            ("Information Architecture.md", "Information Architecture", ["website", "ia"],
             "Public site structure and navigation intent.",
             ["Website Overview", "Content Model", "Marketing Overview"],
             "Primary public areas: Homelab, Detection Engineering, Threat Hunts, Projects/Articles, Products."),
            ("Content Operations.md", "Content Operations", ["website", "content-ops"],
             "How website content is planned and shipped.",
             ["Publishing Workflow", "Templates Index", "Platform Overview"],
             "Ideate in KnowledgeOS → draft → place into `src/content/<collection>/` → use `docs/templates/` → verify with `npm run check` / `npm run build`."),
            ("SEO and Distribution.md", "SEO and Distribution", ["website", "seo"],
             "SEO and distribution notes.",
             ["Website Overview", "Marketing Overview", "Platform Overview"],
             "Platform targets canonical URLs, Open Graph, Twitter Cards, and JSON-LD. Distribution should prioritize high-signal technical writeups over volume."),
        ],
    },
    {
        "slug": "17-Products",
        "title": "Products",
        "purpose": "Product development system for ElliottSecurity offerings.",
        "related": ["Business Overview", "Revenue Overview", "Website Overview"],
        "todos": ["Define first product hypothesis", "Write problem statements", "Create validation plan"],
        "sections": [
            ("Product Portfolio", "Current and planned products."),
            ("Product Development Process", "How products are built."),
            ("Product Discovery", "Problem/solution validation."),
        ],
        "notes": [
            ("Product Portfolio.md", "Product Portfolio", ["products", "portfolio"],
             "Inventory of products and concepts.",
             ["Products Overview", "Revenue Overview", "Website Overview"],
             "| Product | Stage | Audience | Status |\n| --- | --- | --- |\n| Knowledge platform (public) | Live/iterating | Security learners & hiring managers | Active |\n| Future tooling/product | Idea | TBD | Backlog |"),
            ("Product Development Process.md", "Product Development Process", ["products", "process"],
             "Lightweight product development lifecycle.",
             ["Product Discovery", "Business Overview", "Platform Overview"],
             "Discover → Define → Build thin slice → Validate → Document → Publish/package → Support"),
            ("Product Discovery.md", "Product Discovery", ["products", "discovery"],
             "Problem discovery and validation notes.",
             ["Product Portfolio", "Marketing Overview", "Research Overview"],
             "Capture customer/problem hypotheses, interview notes, and kill criteria before building."),
        ],
    },
    {
        "slug": "18-Marketing",
        "title": "Marketing",
        "purpose": "Marketing system for positioning, content distribution, and audience growth.",
        "related": ["Business Overview", "Website Overview", "Career Overview"],
        "todos": ["Define audience segments", "Draft content pillars", "Create monthly content calendar skeleton"],
        "sections": [
            ("Brand Messaging", "Voice and promises."),
            ("Content Pillars", "Themes that compound."),
            ("Distribution Channels", "Where content goes."),
        ],
        "notes": [
            ("Brand Messaging.md", "Brand Messaging", ["marketing", "brand"],
             "Messaging principles for ElliottSecurity.",
             ["Marketing Overview", "Positioning", "Website Overview"],
             "Tone: precise, practical, enterprise-quality, transparent. Avoid hype and empty buzzwords."),
            ("Content Pillars.md", "Content Pillars", ["marketing", "content"],
             "Core content themes.",
             ["Marketing Overview", "Research Pipeline", "Website Overview"],
             "1. Homelab engineering\n2. Detection & hunting\n3. IR readiness\n4. Career/skill compounding\n5. Platform craftsmanship"),
            ("Distribution Channels.md", "Distribution Channels", ["marketing", "distribution"],
             "Channel strategy.",
             ["SEO and Distribution", "Networking and Community", "Website Overview"],
             "Primary: elliottsecurity website. Secondary: selective professional networks and communities. Measure quality engagement over vanity metrics."),
        ],
    },
    {
        "slug": "19-Revenue",
        "title": "Revenue",
        "purpose": "Revenue models, pricing hypotheses, and financial operating notes.",
        "related": ["Business Overview", "Products Overview", "Marketing Overview"],
        "todos": ["List revenue hypotheses", "Define non-goals for monetization", "Create simple monthly finance snapshot template usage"],
        "sections": [
            ("Revenue Models", "How money could be made."),
            ("Pricing Hypotheses", "Pricing experiments."),
            ("Financial Snapshot", "Lightweight finance tracking."),
        ],
        "notes": [
            ("Revenue Models.md", "Revenue Models", ["revenue", "strategy"],
             "Candidate revenue models.",
             ["Revenue Overview", "Product Portfolio", "Business Model"],
             "Candidates: products, consulting/services, education packs, sponsorships (selective). Choose based on mission fit."),
            ("Pricing Hypotheses.md", "Pricing Hypotheses", ["revenue", "pricing"],
             "Pricing experiments and assumptions.",
             ["Revenue Models", "Product Discovery"],
             "Document willingness-to-pay assumptions and kill criteria before packaging offers."),
            ("Financial Snapshot.md", "Financial Snapshot", ["revenue", "finance"],
             "Monthly financial snapshot scaffold.",
             ["Revenue Overview", "Goals and OKRs", "Operating Cadence"],
             "| Month | Revenue | Infra Cost | Tools Cost | Notes |\n| --- | --- | --- | --- | --- |\n| 2026-07 | TBD | TBD | TBD | Foundation month |"),
        ],
    },
    {
        "slug": "20-Automation",
        "title": "Automation",
        "purpose": "Automation for vault hygiene, scaffolding, and operational efficiency.",
        "related": ["Programming Overview", "Platform Overview", "STANDARDS"],
        "todos": ["Add link checker script", "Add note scaffolding CLI", "Document automation inventory"],
        "sections": [
            ("Automation Inventory", "What exists."),
            ("Vault Scaffolding", "Generators and templates."),
            ("Quality Automation", "Lints and checks."),
        ],
        "notes": [
            ("Automation Inventory.md", "Automation Inventory", ["automation", "inventory"],
             "Inventory of automation scripts and bots.",
             ["Automation Overview", "Tooling", "Platform Overview"],
             "| Name | Path | Purpose | Status |\n| --- | --- | --- | --- |\n| KnowledgeOS generator | `scripts/generate-knowledgeos.py` | Vault scaffold | Active |\n| Brand icons | `scripts/generate-brand-icons.mjs` | Website assets | Active |"),
            ("Vault Scaffolding.md", "Vault Scaffolding", ["automation", "scaffolding"],
             "How new notes/domains should be scaffolded.",
             ["Templates Index", "STANDARDS", "Automation Inventory"],
             "Prefer templates + small scripts. Never create empty folders. Always include README/Overview/TODOs for new domains."),
            ("Quality Automation.md", "Quality Automation", ["automation", "quality"],
             "Automated quality checks for the vault.",
             ["STANDARDS", "Automation Overview", "KnowledgeOS Dashboards"],
             "Target checks: empty folders, broken wikilinks, missing frontmatter, orphan notes, stale TODOs."),
        ],
    },
    {
        "slug": "21-Daily-Notes",
        "title": "Daily Notes",
        "purpose": "Daily execution journal that feeds durable knowledge without becoming the knowledge graph.",
        "related": ["Operating Cadence", "ROADMAP", "Templates Index"],
        "todos": ["Enable daily note template in Obsidian", "Define weekly review ritual", "Link daily outcomes into durable notes"],
        "sections": [
            ("Daily Notes Overview", "How daily notes work."),
            ("Weekly Review", "Weekly synthesis ritual."),
            ("Daily Note Example", "Example structure."),
        ],
        "notes": [
            ("Weekly Review.md", "Weekly Review", ["daily-notes", "review"],
             "Weekly review ritual.",
             ["Daily Notes Overview", "ROADMAP", "Goals and OKRs"],
             "1. What shipped?\n2. What blocked?\n3. What should become a durable note?\n4. What moves into next week on [[ROADMAP]]?"),
            ("Journal/Daily Note Example.md", "Daily Note Example", ["daily-notes", "example"],
             "Example daily note structure.",
             ["Daily Notes Overview", "Daily Note Template"],
             """\
             ## Focus
             - KnowledgeOS foundation

             ## Work Log
             - Scaffolded vault domains

             ## Decisions
             - Keep KnowledgeOS under `knowledgeos/` beside the Astro site

             ## Promotions to Durable Notes
             - [[Homelab Inventory]] updates needed
             """),
        ],
    },
    {
        "slug": "23-Archive",
        "title": "Archive",
        "purpose": "Cold storage for superseded notes without destroying history.",
        "related": ["STANDARDS", "Meta Overview", "ROADMAP"],
        "todos": ["Define archival criteria", "Add archive stamp convention", "Review quarterly for restore/delete decisions"],
        "sections": [
            ("Archival Policy", "When and how to archive."),
            ("Archived Index", "Index of archived notes."),
        ],
        "notes": [
            ("Archival Policy.md", "Archival Policy", ["archive", "policy"],
             "Rules for moving notes into archive.",
             ["Archive Overview", "STANDARDS"],
             "Archive when superseded, obsolete, or completed-but-historical. Do not silently delete durable history. Update inbound links."),
            ("Archived Index.md", "Archived Index", ["archive", "index"],
             "Index of archived materials.",
             ["Archive Overview", "Archival Policy"],
             "| Note | Archived On | Reason |\n| --- | --- | --- |\n| _none yet_ | — | — |"),
        ],
    },
    {
        "slug": "99-Meta",
        "title": "Meta",
        "purpose": "Vault meta: contribution guide, link graph health, attachments policy, and glossary.",
        "related": ["STANDARDS", "PROJECT_CONTEXT", "Automation Overview"],
        "todos": ["Maintain glossary as terms stabilize", "Run orphan-note review monthly", "Document attachment size limits"],
        "sections": [
            ("Contribution Guide", "How to contribute to KnowledgeOS."),
            ("Glossary", "Shared vocabulary."),
            ("Attachments Policy", "Binary/media rules."),
            ("Graph Health", "Link hygiene."),
        ],
        "notes": [
            ("Contribution Guide.md", "Contribution Guide", ["meta", "contributing"],
             "How humans and AI should contribute.",
             ["STANDARDS", "PROJECT_CONTEXT", "Templates Index"],
             "1. Read brain files\n2. Use templates\n3. Link related notes\n4. No secrets\n5. Update overviews/dashboards when scope changes"),
            ("Glossary.md", "Glossary", ["meta", "glossary"],
             "Shared vocabulary for ElliottSecurity KnowledgeOS.",
             ["Meta Overview", "STANDARDS"],
             "| Term | Meaning |\n| --- | --- |\n| KnowledgeOS | This Obsidian vault / internal knowledge OS |\n| Brain files | PROJECT_CONTEXT, ARCHITECTURE, STANDARDS, ROADMAP |\n| Promotion | Moving sanitized knowledge to the public website |\n| ES-DET / ES-HUNT / ES-IR | Internal ID schemes |"),
            ("Attachments Policy.md", "Attachments Policy", ["meta", "attachments"],
             "Rules for storing attachments.",
             ["STANDARDS", "Meta Overview"],
             "Store under `99-Meta/Attachments/`. Prefer Mermaid/diagrams-as-code. No malware samples. No secrets. Keep binaries small."),
            ("Graph Health.md", "Graph Health", ["meta", "graph"],
             "Practices for a healthy knowledge graph.",
             ["KnowledgeOS Dashboards", "Quality Automation", "STANDARDS"],
             "Minimize orphans. Every note needs Related Notes. Prefer links over duplicate explanations. Review drafts monthly."),
            ("Attachments/Attachments README.md", "Attachments README", ["meta", "attachments"],
             "Attachments folder placeholder.",
             ["Attachments Policy"],
             "Put images and diagrams here. Keep filenames descriptive. Reference from notes with alt text."),
        ],
    },
]


TEMPLATES = {
    "Templates Index.md": """\
        ---
        title: "Templates Index"
        tags: [templates, index]
        status: canonical
        type: dashboard
        created: 2026-07-19
        updated: 2026-07-19
        ---

        # Templates Index

        Use these templates for new notes. Improve the canonical template instead of forking.

        ## Core Templates

        - [[Note Template]]
        - [[Daily Note Template]]
        - [[Project Template]]
        - [[Runbook Template]]
        - [[Detection Template]]
        - [[Threat Hunt Template]]
        - [[IR Case Template]]
        - [[Malware Analysis Template]]
        - [[Homelab System Template]]
        - [[Meeting Notes Template]]
        - [[Decision Record Template]]
        - [[Research Experiment Template]]

        ## Website-Aligned Templates

        Repo also contains Astro publishing templates under `docs/templates/`. Keep concepts aligned:

        - Article / Project / Product / Homelab / Detection / Threat Hunt / Lab Journal

        ## Related

        - [[STANDARDS]]
        - [[00 Home]]
        - [[Vault Scaffolding]]
        """,
    "Note Template.md": """\
        ---
        title: "{{title}}"
        tags: []
        status: draft
        type: note
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        > [!summary] Summary
        > One or two sentences.

        ## Context

        ## Details

        ## Related Notes

        - [[00 Home]]

        ## TODOs

        - [ ] Complete draft
        """,
    "Daily Note Template.md": """\
        ---
        title: "{{date}}"
        tags: [daily-notes]
        status: active
        type: daily
        created: {{date}}
        updated: {{date}}
        ---

        # {{date}}

        ## Focus

        -

        ## Work Log

        -

        ## Decisions

        -

        ## Promotions to Durable Notes

        -

        ## Open Loops

        - [ ]
        """,
    "Project Template.md": """\
        ---
        title: "{{title}}"
        tags: [project]
        status: draft
        type: project
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        > [!summary] Summary
        > What this project delivers.

        ## Objective

        ## Scope

        ## Non-Goals

        ## Milestones

        - [ ]

        ## Systems Touched

        -

        ## Risks

        -

        ## Related Notes

        - [[ROADMAP]]
        """,
    "Runbook Template.md": """\
        ---
        title: "{{title}}"
        tags: [runbook]
        status: draft
        type: runbook
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        > [!summary] Summary
        > When to use this runbook.

        ## Preconditions

        ## Steps

        1.

        ## Validation

        ## Rollback

        ## Related Notes

        - [[Incident Response Overview]]
        """,
    "Detection Template.md": """\
        ---
        title: "{{title}}"
        tags: [detection]
        status: draft
        type: detection
        id: ES-DET-XXXX
        mitre: []
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        > [!summary] Intent
        > What malicious/abnormal behavior this detects.

        ## Metadata

        | Field | Value |
        | --- | --- |
        | ID | ES-DET-XXXX |
        | Severity | |
        | Data Sources | |
        | MITRE | |

        ## Logic

        ```text
        // detection logic
        ```

        ## Validation

        ## False Positives

        ## Response Hints

        - [[IR Intake Process]]

        ## Related Notes

        - [[Detections Index]]
        - [[Detection Quality Bar]]
        """,
    "Threat Hunt Template.md": """\
        ---
        title: "{{title}}"
        tags: [hunt]
        status: draft
        type: hunt
        id: ES-HUNT-XXXX
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        ## Hypothesis

        ## Scope

        ## Data Sources

        ## Method

        ## Findings

        ## Outcomes

        - [ ] New detection needed
        - [ ] IR follow-up
        - [ ] No further action

        ## Related Notes

        - [[Hunts Index]]
        - [[Hunt Methodology]]
        """,
    "IR Case Template.md": """\
        ---
        title: "{{title}}"
        tags: [ir, case]
        status: draft
        type: ir-case
        id: ES-IR-YYYY-XXXX
        severity: unset
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        ## Intake

        ## Timeline

        ## Impact

        ## Containment

        ## Eradication / Recovery

        ## Lessons Learned

        ## Follow-ups

        - [ ] Detection updates
        - [ ] Hunt follow-up
        - [ ] Documentation updates

        ## Related Notes

        - [[Cases Index]]
        - [[IR Doctrine]]
        """,
    "Malware Analysis Template.md": """\
        ---
        title: "{{title}}"
        tags: [malware]
        status: draft
        type: malware-report
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        ## Sample Metadata

        | Field | Value |
        | --- | --- |
        | SHA256 | |
        | Filename | _do not commit sample_ |
        | Source | |

        ## Safety Confirmation

        - [ ] Isolated environment
        - [ ] Snapshot taken

        ## Static Analysis

        ## Dynamic Analysis

        ## IOCs

        ## Detections / IR Links

        ## Related Notes

        - [[Analysis Lab Safety]]
        - [[Samples Index]]
        """,
    "Homelab System Template.md": """\
        ---
        title: "{{title}}"
        tags: [homelab, system]
        status: draft
        type: system
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        ## Role

        ## Zone

        ## Dependencies

        ## Operations

        ## Backups

        ## Monitoring

        ## Related Notes

        - [[Homelab Inventory]]
        - [[ARCHITECTURE]]
        """,
    "Meeting Notes Template.md": """\
        ---
        title: "{{title}}"
        tags: [meeting]
        status: draft
        type: meeting
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        ## Attendees

        ## Agenda

        ## Notes

        ## Decisions

        ## Actions

        - [ ]
        """,
    "Decision Record Template.md": """\
        ---
        title: "ADR: {{title}}"
        tags: [decision, adr]
        status: draft
        type: decision
        created: {{date}}
        updated: {{date}}
        ---

        # ADR: {{title}}

        ## Status

        Proposed | Accepted | Superseded

        ## Context

        ## Decision

        ## Consequences

        ## Related Notes

        - [[ARCHITECTURE]]
        """,
    "Research Experiment Template.md": """\
        ---
        title: "{{title}}"
        tags: [research, experiment]
        status: draft
        type: experiment
        created: {{date}}
        updated: {{date}}
        ---

        # {{title}}

        ## Hypothesis

        ## Method

        ## Results

        ## Conclusions

        ## Publish Candidate?

        Yes / No — rationale

        ## Related Notes

        - [[Research Pipeline]]
        - [[Experiments Index]]
        """,
}


def normalize_note(item) -> dict:
    if isinstance(item, dict):
        return item
    path, title, tags, summary, related, body = item[:6]
    typ = item[6] if len(item) > 6 else "note"
    return {
        "path": path,
        "title": title,
        "tags": tags,
        "summary": summary,
        "related": related,
        "body": body,
        "typ": typ,
    }


def write_domain(domain: dict) -> None:
    base = ROOT / domain["slug"]
    title = domain["title"]
    notes = [normalize_note(n) for n in domain["notes"]]
    tree_lines = [f"{domain['slug']}/", f"├── {title} Overview.md"]
    for n in notes:
        tree_lines.append(f"├── {n['path']}")
    tree_lines.append(f"├── {title} TODOs.md")
    tree_lines.append("└── README.md")
    tree = "\n".join(tree_lines)

    entrypoints = [f"{title} Overview"] + [n["title"] for n in notes[:4]]
    w(base / "README.md", make_readme(title, domain["purpose"], tree, entrypoints))
    w(base / f"{title} Overview.md", make_overview(title, domain["purpose"], domain["sections"], domain["related"]))
    w(base / f"{title} TODOs.md", make_todos(title, domain["todos"]))
    for n in notes:
        w(
            base / n["path"],
            make_note(
                n["title"],
                n["tags"],
                n["summary"],
                n["body"],
                n["related"],
                typ=n.get("typ", "note"),
            ),
        )


def write_home() -> None:
    w(
        ROOT / "README.md",
        """\
        ---
        title: "ElliottSecurity KnowledgeOS"
        tags: [readme, knowledgeos]
        status: canonical
        type: readme
        created: 2026-07-19
        updated: 2026-07-19
        ---

        # ElliottSecurity KnowledgeOS

        Official internal knowledge operating system for ElliottSecurity.

        This is **not** a casual notes dump. It is an enterprise-style Obsidian vault designed to be beautiful, modular, scalable, AI-friendly, Cursor-friendly, Git-friendly, and Obsidian-native.

        ## Start Here

        1. [[00 Home]]
        2. [[PROJECT_CONTEXT]]
        3. [[ARCHITECTURE]]
        4. [[STANDARDS]]
        5. [[ROADMAP]]
        6. [[KnowledgeOS Dashboards]]

        ## Domain Map

        | Domain | Path | Overview |
        | --- | --- | --- |
        | Homelab | `01-Homelab/` | [[Homelab Overview]] |
        | Networking | `02-Networking/` | [[Networking Overview]] |
        | Infrastructure | `03-Infrastructure/` | [[Infrastructure Overview]] |
        | Detection Engineering | `04-Detection-Engineering/` | [[Detection Engineering Overview]] |
        | Threat Hunting | `05-Threat-Hunting/` | [[Threat Hunting Overview]] |
        | Incident Response | `06-Incident-Response/` | [[Incident Response Overview]] |
        | Malware Analysis | `07-Malware-Analysis/` | [[Malware Analysis Overview]] |
        | Active Directory | `08-Active-Directory/` | [[Active Directory Overview]] |
        | Cloud | `09-Cloud/` | [[Cloud Overview]] |
        | Programming | `10-Programming/` | [[Programming Overview]] |
        | Career | `11-Career/` | [[Career Overview]] |
        | Certifications | `12-Certifications/` | [[Certifications Overview]] |
        | Research | `13-Research/` | [[Research Overview]] |
        | Business | `14-Business/` | [[Business Overview]] |
        | Platform | `15-Platform/` | [[Platform Overview]] |
        | Website | `16-Website/` | [[Website Overview]] |
        | Products | `17-Products/` | [[Products Overview]] |
        | Marketing | `18-Marketing/` | [[Marketing Overview]] |
        | Revenue | `19-Revenue/` | [[Revenue Overview]] |
        | Automation | `20-Automation/` | [[Automation Overview]] |
        | Daily Notes | `21-Daily-Notes/` | [[Daily Notes Overview]] |
        | Templates | `22-Templates/` | [[Templates Index]] |
        | Archive | `23-Archive/` | [[Archive Overview]] |
        | Meta | `99-Meta/` | [[Meta Overview]] |

        ## Companion Systems

        - Public site: Astro app in repository root (`src/`, `docs/`)
        - AI rules: `.cursor/rules/`
        - Obsidian config: `knowledgeos/.obsidian/`

        ## Contribution Rules

        Follow [[STANDARDS]]. Align with [[PROJECT_CONTEXT]]. Track work in [[ROADMAP]].
        """,
    )

    w(
        ROOT / "00-Home" / "00 Home.md",
        """\
        ---
        title: "00 Home"
        tags: [home, dashboard, knowledgeos]
        status: canonical
        type: dashboard
        created: 2026-07-19
        updated: 2026-07-19
        ---

        # ElliottSecurity KnowledgeOS

        > [!summary] Mission Pulse
        > Single source of truth for ElliottSecurity operations, research, career growth, and business execution.

        ## Navigate

        ```mermaid
        mindmap
          root((KnowledgeOS))
            Brain
              PROJECT_CONTEXT
              ARCHITECTURE
              STANDARDS
              ROADMAP
            Security Ops
              Detection
              Threat Hunting
              Incident Response
              Malware
            Infrastructure
              Homelab
              Networking
              AD
              Cloud
            Enterprise
              Business
              Products
              Website
              Revenue
            Growth
              Career
              Certifications
              Research
        ```

        ## Canonical Brain

        - [[PROJECT_CONTEXT]]
        - [[ARCHITECTURE]]
        - [[STANDARDS]]
        - [[ROADMAP]]

        ## Operations

        - [[Homelab Overview]]
        - [[Networking Overview]]
        - [[Infrastructure Overview]]
        - [[Detection Engineering Overview]]
        - [[Threat Hunting Overview]]
        - [[Incident Response Overview]]

        ## Enterprise

        - [[Business Overview]]
        - [[Platform Overview]]
        - [[Website Overview]]
        - [[Products Overview]]
        - [[Marketing Overview]]
        - [[Revenue Overview]]

        ## Growth

        - [[Career Overview]]
        - [[Certifications Overview]]
        - [[Research Overview]]
        - [[Programming Overview]]

        ## Working Surfaces

        - [[KnowledgeOS Dashboards]]
        - [[Templates Index]]
        - [[Daily Notes Overview]]
        - [[Automation Overview]]
        - [[Archive Overview]]
        """,
    )

    w(
        ROOT / "00-Home" / "KnowledgeOS Dashboards.md",
        """\
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
        """,
    )

    w(
        ROOT / "00-Home" / "README.md",
        make_readme(
            "00-Home",
            "Homepage and dashboard entrypoints for KnowledgeOS.",
            "00-Home/\n├── 00 Home.md\n├── KnowledgeOS Dashboards.md\n└── README.md",
            ["00 Home", "KnowledgeOS Dashboards"],
        ),
    )


def write_infrastructure() -> None:
    domain = {
        "slug": "03-Infrastructure",
        "title": "Infrastructure",
        "purpose": "Operate compute, identity-adjacent services, containers, storage, and monitoring platforms.",
        "related": ["ARCHITECTURE", "Homelab Overview", "Networking Overview", "Active Directory Overview"],
        "todos": [
            "Complete platform overview accuracy pass",
            "Link each infra note to inventory rows",
            "Add credential vault location references (not secrets)",
        ],
        "sections": [
            ("Proxmox Overview", "Hypervisor platform."),
            ("OPNsense Overview", "Firewall/router."),
            ("WireGuard Overview", "Remote access."),
            ("Monitoring Overview", "Telemetry and alerting map."),
            ("Storage and Backups", "Data protection."),
        ],
        "notes": [normalize_note(item) for item in INFRA_NOTES],
    }
    write_domain(domain)


def write_daily_overview_fix() -> None:
    # 21-Daily-Notes overview title conflicts with section naming; ensure overview exists via write_domain
    pass


def write_templates() -> None:
    base = ROOT / "22-Templates"
    for name, content in TEMPLATES.items():
        w(base / name, content)
    w(
        base / "README.md",
        make_readme(
            "Templates",
            "Canonical Obsidian/Templater templates for KnowledgeOS.",
            "22-Templates/\n├── Templates Index.md\n├── * Template.md\n└── README.md",
            ["Templates Index", "Note Template", "Detection Template", "IR Case Template"],
        ),
    )


def main() -> None:
    write_home()
    for d in DOMAINS:
        write_domain(d)
    write_infrastructure()
    for d in MORE_DOMAINS:
        # Daily notes special: overview name equals folder purpose
        if d["slug"] == "21-Daily-Notes":
            # inject overview-like note title already in sections; write_domain uses f"{title} Overview"
            pass
        write_domain(d)
    write_templates()
    print(f"KnowledgeOS generated at {ROOT}")


if __name__ == "__main__":
    main()
