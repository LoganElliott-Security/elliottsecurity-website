#!/usr/bin/env python3
"""Verify KnowledgeOS vault hygiene: no empty dirs, wikilinks resolve."""
from __future__ import annotations
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1] / "knowledgeos"
link_re = re.compile(r"\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]")

def main() -> int:
    if not ROOT.exists():
        print("knowledgeos/ missing", file=sys.stderr)
        return 1
    empty = [p for p in ROOT.rglob("*") if p.is_dir() and not any(p.iterdir())]
    titles = {f.stem for f in ROOT.rglob("*.md")}
    missing = {}
    for f in ROOT.rglob("*.md"):
        for m in link_re.finditer(f.read_text(encoding="utf-8")):
            t = m.group(1).strip()
            if t not in titles:
                missing.setdefault(t, []).append(str(f.relative_to(ROOT)))
    print(f"markdown_files={sum(1 for _ in ROOT.rglob('*.md'))}")
    print(f"empty_dirs={len(empty)}")
    print(f"unresolved_wikilinks={len(missing)}")
    for d in empty:
        print("EMPTY", d.relative_to(ROOT))
    for t, srcs in sorted(missing.items()):
        print(f"MISSING [[{t}]] <- {', '.join(srcs[:3])}")
    return 1 if empty or missing else 0

if __name__ == "__main__":
    raise SystemExit(main())
