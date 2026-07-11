import type { CollectionEntry } from 'astro:content';
import type { ContentCollectionName, Difficulty } from './content';

export interface KnowledgeMetadata {
	tags: string[];
	mitreTechniques: string[];
	technologies: string[];
	categories: string[];
	platforms: string[];
	difficulty?: Difficulty;
	author?: string;
}

export interface NormalizedKnowledgeEntry {
	collection: ContentCollectionName;
	id: string;
	slug: string;
	title: string;
	description: string;
	metadata: KnowledgeMetadata;
	entry: CollectionEntry<ContentCollectionName>;
}

export interface ScoredRelatedEntry {
	collection: ContentCollectionName;
	entry: CollectionEntry<ContentCollectionName>;
	score: number;
	sharedFactors: string[];
}

export interface RelatedContentGroups {
	all: ScoredRelatedEntry[];
	articles: ScoredRelatedEntry[];
	projects: ScoredRelatedEntry[];
	'threat-hunts': ScoredRelatedEntry[];
	detections: ScoredRelatedEntry[];
	homelab: ScoredRelatedEntry[];
	products: ScoredRelatedEntry[];
}

export type RelationshipField =
	| 'tags'
	| 'mitreTechniques'
	| 'technologies'
	| 'categories'
	| 'platforms'
	| 'difficulty'
	| 'author';

export interface TagIndexEntry {
	slug: string;
	label: string;
	kind: RelationshipField | 'tag';
	count: number;
}

export interface TagPageGroup {
	collection: ContentCollectionName;
	label: string;
	entries: CollectionEntry<ContentCollectionName>[];
}

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export interface SearchIndexDocument {
	id: string;
	collection: ContentCollectionName;
	title: string;
	description: string;
	url: string;
	tags: string[];
	mitreTechniques: string[];
	technologies: string[];
	categories: string[];
	platforms: string[];
	author?: string;
	difficulty?: string;
	publishedAt?: string;
	updatedAt?: string;
	body: string;
}
