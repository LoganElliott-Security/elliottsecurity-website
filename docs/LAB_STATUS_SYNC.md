# Lab Status Sync

KnowledgeOS is the source of truth for Enterprise Homelab progress.

## Source

`elliottsecurity-knowledgebase`:

- `Status/LAB_STATUS.md` — engineering dashboard
- `Status/public-lab-status.yaml` — public sync payload
- `scripts/sync_lab_status.py` — generator

## Target

`elliottsecurity-website`:

- `src/content/status/lab-status.md` — **generated** content collection entry
- `/lab-progress` — public Lab Progress page

## After every DCP

From the KnowledgeOS repo:

```bash
python3 scripts/sync_lab_status.py --website-repo ../elliottsecurity-website
```

Then commit both repositories. Do not hand-edit dashboard fields in `lab-status.md`.

## Page

- Nav label: **Lab Progress**
- URL: `/lab-progress`
- Alternate framing: **Now Building** (eyebrow on the page)
