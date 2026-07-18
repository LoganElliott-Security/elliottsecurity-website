import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Resolve a cover image for content heroes.
 * Returns undefined when the value is missing, empty, or (for local paths)
 * does not exist under `public/` — so callers can omit the image section entirely.
 */
export function resolveCoverImage(src: string | null | undefined): string | undefined {
  if (src == null) return undefined;

  const trimmed = String(src).trim();
  if (!trimmed) return undefined;

  // Remote URLs: allow through; client-side load failure collapses the section.
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Local public assets must exist at build time.
  if (trimmed.startsWith('/')) {
    const relative = trimmed.replace(/^\/+/, '');
    const absolute = path.join(process.cwd(), 'public', relative);
    if (!existsSync(absolute)) {
      return undefined;
    }
    return trimmed;
  }

  // Relative paths without a leading slash are not used by this project.
  return undefined;
}
