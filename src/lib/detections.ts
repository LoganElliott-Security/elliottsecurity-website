import type { CollectionEntry } from 'astro:content';
import type { ContentCollectionName } from '../types/content';
import type {
	DetectionDownload,
	DetectionRevision,
	ResolvedDetectionRelated,
} from '../types/detection';
import { formatDate, getEntrySlug, getEntryUrl, getPublishedCollection } from './content';

const COLLECTION_REF_FIELDS = [
	{ field: 'relatedArticles' as const, collection: 'articles' as const, key: 'articles' as const },
	{ field: 'relatedProjects' as const, collection: 'projects' as const, key: 'projects' as const },
	{ field: 'relatedThreatHunts' as const, collection: 'threat-hunts' as const, key: 'threatHunts' as const },
	{ field: 'relatedHomelab' as const, collection: 'homelab' as const, key: 'homelab' as const },
	{ field: 'relatedDetections' as const, collection: 'detections' as const, key: 'detections' as const },
];

function toCard(entry: CollectionEntry<ContentCollectionName>, collection: ContentCollectionName) {
	const data = entry.data as { title: string; description: string };
	return {
		id: entry.id,
		title: data.title,
		description: data.description,
		href: getEntryUrl(collection, entry),
	};
}

async function resolveReferences(
	collection: ContentCollectionName,
	references: string[],
	currentId: string,
): Promise<Array<{ id: string; title: string; href: string; description: string }>> {
	if (references.length === 0) return [];

	const entries = await getPublishedCollection(collection);

	return references
		.map((reference) => {
			const match = entries.find(
				(entry) => getEntrySlug(entry) === reference || entry.id === reference,
			);
			return match ? toCard(match, collection) : null;
		})
		.filter((item): item is NonNullable<typeof item> => item !== null)
		.filter((item) => !(collection === 'detections' && item.id === currentId));
}

export async function resolveDetectionRelated(
	entry: CollectionEntry<'detections'>,
): Promise<ResolvedDetectionRelated> {
	const resolved: ResolvedDetectionRelated = {
		articles: [],
		projects: [],
		threatHunts: [],
		homelab: [],
		detections: [],
	};

	for (const { field, collection, key } of COLLECTION_REF_FIELDS) {
		const references = entry.data[field] ?? [];
		resolved[key] = await resolveReferences(collection, references, entry.id);
	}

	return resolved;
}

export function getCurrentRevision(revisions: DetectionRevision[] = []): DetectionRevision | undefined {
	return (
		revisions.find((revision) => revision.status === 'current') ??
		revisions[revisions.length - 1]
	);
}

export function sortRevisionsDesc(revisions: DetectionRevision[] = []): DetectionRevision[] {
	return [...revisions].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export function getDetectionDownloads(entry: CollectionEntry<'detections'>): DetectionDownload[] {
	const downloads: DetectionDownload[] = [];
	const data = entry.data;

	for (const block of data.detectionLogic ?? []) {
		if (block.downloadPath) {
			downloads.push({
				label: block.title ?? `${block.language.toUpperCase()} rule`,
				path: block.downloadPath,
				fileName: block.fileName,
			});
		}
	}

	for (const revision of data.revisions ?? []) {
		if (revision.downloadPath) {
			downloads.push({
				label: `Revision ${revision.version}`,
				path: revision.downloadPath,
				fileName: revision.fileName,
			});
		}
	}

	if (data.github) {
		downloads.push({
			label: 'GitHub repository',
			path: data.github,
		});
	}

	return downloads;
}

export function formatDetectionId(detectionId: string): string {
	return detectionId.toUpperCase();
}

export function formatRevisionDate(date: Date): string {
	return formatDate(date);
}

export function hasDetectionEngineeringContent(entry: CollectionEntry<'detections'>): boolean {
	const data = entry.data;
	return Boolean(
		data.detectionLogic?.length ||
			data.falsePositives?.length ||
			data.testingProcedure ||
			data.tuningGuidance ||
			data.detectionCoverage?.length ||
			data.revisions?.length ||
			data.references?.length,
	);
}

export function getLanguageLabel(language: string): string {
	const labels: Record<string, string> = {
		sigma: 'Sigma',
		kql: 'KQL',
		eql: 'EQL',
		spl: 'SPL',
		yara: 'YARA',
		powershell: 'PowerShell',
		python: 'Python',
		bash: 'Bash',
		json: 'JSON',
		xml: 'XML',
		yaml: 'YAML',
	};
	return labels[language.toLowerCase()] ?? language.toUpperCase();
}
