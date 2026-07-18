import type { CollectionEntry } from 'astro:content';
import {
	COLLECTION_ROUTES,
	type ContentCollectionName,
} from '../types/content';
import type {
	KnowledgeMetadata,
	NormalizedKnowledgeEntry,
	RelatedContentGroups,
	ScoredRelatedEntry,
	TagIndexEntry,
	TagPageGroup,
} from '../types/knowledge';
import { getEntrySlug, getEntryUrl, getPublishedCollection } from './content';

const ALL_COLLECTIONS: ContentCollectionName[] = [
	'articles',
	'projects',
	'threat-hunts',
	'detections',
	'homelab',
	'products',
];

const RELATIONSHIP_WEIGHTS = {
	tags: 3,
	mitreTechniques: 4,
	technologies: 2,
	categories: 3,
	platforms: 3,
	difficulty: 1,
	author: 2,
} as const;

const DEFAULT_RELATED_LIMIT = 6;
const DEFAULT_SECTION_LIMIT = 4;

export function slugifyTag(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getTagUrl(value: string): string {
	return `/tags/${slugifyTag(value)}`;
}

function unique(values: string[]): string[] {
	return [...new Set(values.filter(Boolean))];
}

function intersect(a: string[], b: string[]): string[] {
	const normalizedB = new Set(b.map(slugifyTag));
	return a.filter((value) => normalizedB.has(slugifyTag(value)));
}

function isSameEntry(
	source: { collection: ContentCollectionName; id: string },
	target: { collection: ContentCollectionName; id: string },
): boolean {
	return source.collection === target.collection && source.id === target.id;
}

export function extractKnowledgeMetadata(
	_collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
): KnowledgeMetadata {
	const data = entry.data as Record<string, unknown>;

	return {
		tags: unique((data.tags as string[] | undefined) ?? []),
		mitreTechniques: unique((data.mitreTechniques as string[] | undefined) ?? []),
		technologies: unique([
			...((data.technologies as string[] | undefined) ?? []),
			...((data.dataSources as string[] | undefined) ?? []),
			...((data.requiredTools as string[] | undefined) ?? []),
		]),
		categories: unique(
			[data.category as string | undefined].filter((value): value is string => Boolean(value)),
		),
		platforms: unique(
			[data.platform as string | undefined].filter((value): value is string => Boolean(value)),
		),
		difficulty: data.difficulty as KnowledgeMetadata['difficulty'],
		author: data.author as string | undefined,
	};
}

export function normalizeKnowledgeEntry(
	collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
): NormalizedKnowledgeEntry {
	const data = entry.data as { title: string; description: string; slug?: string };

	return {
		collection,
		id: entry.id,
		slug: getEntrySlug(entry),
		title: data.title,
		description: data.description,
		metadata: extractKnowledgeMetadata(collection, entry),
		entry,
	};
}

function scoreRelationship(
	source: KnowledgeMetadata,
	target: KnowledgeMetadata,
): { score: number; sharedFactors: string[] } {
	let score = 0;
	const sharedFactors: string[] = [];

	const sharedTags = intersect(source.tags, target.tags);
	if (sharedTags.length > 0) {
		score += sharedTags.length * RELATIONSHIP_WEIGHTS.tags;
		sharedFactors.push(...sharedTags.map((tag) => `tag:${tag}`));
	}

	const sharedMitre = intersect(source.mitreTechniques, target.mitreTechniques);
	if (sharedMitre.length > 0) {
		score += sharedMitre.length * RELATIONSHIP_WEIGHTS.mitreTechniques;
		sharedFactors.push(...sharedMitre.map((technique) => `mitre:${technique}`));
	}

	const sharedTechnologies = intersect(source.technologies, target.technologies);
	if (sharedTechnologies.length > 0) {
		score += sharedTechnologies.length * RELATIONSHIP_WEIGHTS.technologies;
		sharedFactors.push(...sharedTechnologies.map((tech) => `technology:${tech}`));
	}

	const sharedCategories = intersect(source.categories, target.categories);
	if (sharedCategories.length > 0) {
		score += sharedCategories.length * RELATIONSHIP_WEIGHTS.categories;
		sharedFactors.push(...sharedCategories.map((category) => `category:${category}`));
	}

	const sharedPlatforms = intersect(source.platforms, target.platforms);
	if (sharedPlatforms.length > 0) {
		score += sharedPlatforms.length * RELATIONSHIP_WEIGHTS.platforms;
		sharedFactors.push(...sharedPlatforms.map((platform) => `platform:${platform}`));
	}

	if (source.difficulty && target.difficulty && source.difficulty === target.difficulty) {
		score += RELATIONSHIP_WEIGHTS.difficulty;
		sharedFactors.push(`difficulty:${source.difficulty}`);
	}

	if (source.author && target.author && source.author === target.author) {
		score += RELATIONSHIP_WEIGHTS.author;
		sharedFactors.push(`author:${source.author}`);
	}

	return { score, sharedFactors: unique(sharedFactors) };
}

async function loadNormalizedEntries(): Promise<NormalizedKnowledgeEntry[]> {
	const collections = await Promise.all(
		ALL_COLLECTIONS.map(async (collection) => {
			const entries = await getPublishedCollection(collection);
			return entries.map((entry) => normalizeKnowledgeEntry(collection, entry));
		}),
	);

	return collections.flat();
}

function rankRelatedEntries(
	source: NormalizedKnowledgeEntry,
	candidates: NormalizedKnowledgeEntry[],
	limit = DEFAULT_RELATED_LIMIT,
): ScoredRelatedEntry[] {
	return candidates
		.filter((candidate) => !isSameEntry(source, candidate))
		.map((candidate) => {
			const { score, sharedFactors } = scoreRelationship(source.metadata, candidate.metadata);
			return {
				collection: candidate.collection,
				entry: candidate.entry,
				score,
				sharedFactors,
			};
		})
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);
}

function groupRelatedEntries(related: ScoredRelatedEntry[]): RelatedContentGroups {
	const groups: RelatedContentGroups = {
		all: related,
		articles: [],
		projects: [],
		'threat-hunts': [],
		detections: [],
		homelab: [],
		products: [],
	};

	for (const item of related) {
		groups[item.collection].push(item);
	}

	return groups;
}

export async function getRelatedContent(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_RELATED_LIMIT,
): Promise<RelatedContentGroups> {
	const source = normalizeKnowledgeEntry(sourceCollection, sourceEntry);
	const allEntries = await loadNormalizedEntries();
	const related = rankRelatedEntries(source, allEntries, limit);
	return groupRelatedEntries(related);
}

async function getRelatedByCollection(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	targetCollection: ContentCollectionName,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	const source = normalizeKnowledgeEntry(sourceCollection, sourceEntry);
	const targetEntries = (await getPublishedCollection(targetCollection)).map((entry) =>
		normalizeKnowledgeEntry(targetCollection, entry),
	);
	return rankRelatedEntries(source, targetEntries, limit);
}

export async function getRelatedArticles(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	return getRelatedByCollection(sourceCollection, sourceEntry, 'articles', limit);
}

export async function getRelatedProjects(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	return getRelatedByCollection(sourceCollection, sourceEntry, 'projects', limit);
}

export async function getRelatedThreatHunts(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	return getRelatedByCollection(sourceCollection, sourceEntry, 'threat-hunts', limit);
}

export async function getRelatedDetections(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	return getRelatedByCollection(sourceCollection, sourceEntry, 'detections', limit);
}

export async function getRelatedHomelab(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	return getRelatedByCollection(sourceCollection, sourceEntry, 'homelab', limit);
}

export async function getRelatedProducts(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
	limit = DEFAULT_SECTION_LIMIT,
): Promise<ScoredRelatedEntry[]> {
	return getRelatedByCollection(sourceCollection, sourceEntry, 'products', limit);
}

export function getSharedTags(
	source: KnowledgeMetadata,
	target: KnowledgeMetadata,
): string[] {
	return intersect(source.tags, target.tags);
}

export function getSharedMitreTechniques(
	source: KnowledgeMetadata,
	target: KnowledgeMetadata,
): string[] {
	return intersect(source.mitreTechniques, target.mitreTechniques);
}

function entryMatchesTag(
	entry: NormalizedKnowledgeEntry,
	tagSlug: string,
): boolean {
	const metadata = entry.metadata;
	const fields = [
		...metadata.tags,
		...metadata.mitreTechniques,
		...metadata.technologies,
		...metadata.categories,
		...metadata.platforms,
		...(metadata.author ? [metadata.author] : []),
		...(metadata.difficulty ? [metadata.difficulty] : []),
	];

	return fields.some((value) => slugifyTag(value) === tagSlug);
}

export async function getEntriesByTag(tagSlug: string): Promise<TagPageGroup[]> {
	const allEntries = await loadNormalizedEntries();
	const matched = allEntries.filter((entry) => entryMatchesTag(entry, tagSlug));

	return ALL_COLLECTIONS.map((collection) => ({
		collection,
		label: COLLECTION_ROUTES[collection].label,
		entries: matched
			.filter((entry) => entry.collection === collection)
			.map((entry) => entry.entry),
	})).filter((group) => group.entries.length > 0);
}

export async function getAllTagSlugs(): Promise<string[]> {
	const allEntries = await loadNormalizedEntries();
	const slugs = new Set<string>();

	for (const entry of allEntries) {
		const metadata = entry.metadata;
		for (const value of [
			...metadata.tags,
			...metadata.mitreTechniques,
			...metadata.technologies,
			...metadata.categories,
			...metadata.platforms,
			...(metadata.author ? [metadata.author] : []),
			...(metadata.difficulty ? [metadata.difficulty] : []),
		]) {
			slugs.add(slugifyTag(value));
		}
	}

	return [...slugs].sort();
}

export async function getTagIndex(): Promise<TagIndexEntry[]> {
	const allEntries = await loadNormalizedEntries();
	const index = new Map<string, TagIndexEntry>();

	const register = (value: string, kind: TagIndexEntry['kind']) => {
		const slug = slugifyTag(value);
		const existing = index.get(slug);

		if (existing) {
			existing.count += 1;
			return;
		}

		index.set(slug, {
			slug,
			label: value,
			kind,
			count: 1,
		});
	};

	for (const entry of allEntries) {
		const metadata = entry.metadata;
		metadata.tags.forEach((tag) => register(tag, 'tags'));
		metadata.mitreTechniques.forEach((technique) => register(technique, 'mitreTechniques'));
		metadata.technologies.forEach((technology) => register(technology, 'technologies'));
		metadata.categories.forEach((category) => register(category, 'categories'));
		metadata.platforms.forEach((platform) => register(platform, 'platforms'));
		if (metadata.author) register(metadata.author, 'author');
		if (metadata.difficulty) register(metadata.difficulty, 'difficulty');
	}

	return [...index.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function getTagLabel(tagSlug: string, index: TagIndexEntry[]): string {
	return index.find((entry) => entry.slug === tagSlug)?.label ?? tagSlug.replace(/-/g, ' ');
}

export async function getDetailPageRelatedSections(
	sourceCollection: ContentCollectionName,
	sourceEntry: CollectionEntry<ContentCollectionName>,
) {
	const [all, articles, projects, threatHunts, detections, homelab] = await Promise.all([
		getRelatedContent(sourceCollection, sourceEntry, DEFAULT_RELATED_LIMIT),
		getRelatedArticles(sourceCollection, sourceEntry),
		getRelatedProjects(sourceCollection, sourceEntry),
		getRelatedThreatHunts(sourceCollection, sourceEntry),
		getRelatedDetections(sourceCollection, sourceEntry),
		getRelatedHomelab(sourceCollection, sourceEntry),
	]);

	return {
		all: all.all,
		articles,
		projects,
		threatHunts,
		detections,
		homelab,
	};
}

export function getMitreTechniques(
	collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
): string[] {
	return extractKnowledgeMetadata(collection, entry).mitreTechniques;
}

export function getTechnologies(
	collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
): string[] {
	return extractKnowledgeMetadata(collection, entry).technologies;
}

export function toContentCardProps(
	collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
) {
	const data = entry.data as {
		title: string;
		description: string;
		tags?: string[];
		coverImage?: string;
	};

	return {
		title: data.title,
		description: data.description,
		href: getEntryUrl(collection, entry),
		tags: data.tags ?? [],
		coverImage: data.coverImage,
	};
}
