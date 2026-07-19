import { getCollection, type CollectionEntry } from 'astro:content';

export type LabStatusEntry = CollectionEntry<'status'>;

/** Canonical public Lab Status entry (synced from KnowledgeOS). */
export async function getLabStatusEntry(): Promise<LabStatusEntry> {
	const entries = await getCollection('status', ({ data }) => {
		if (import.meta.env.PROD && data.draft) {
			return false;
		}
		return true;
	});

	const featured = entries.find((entry) => entry.data.featured) ?? entries[0];
	if (!featured) {
		throw new Error(
			'No Lab Status content found. Expected src/content/status/lab-status.md (sync from KnowledgeOS).',
		);
	}
	return featured;
}
