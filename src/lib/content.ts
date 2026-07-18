import { getCollection, type CollectionEntry } from 'astro:content';
import {
	COLLECTION_ROUTES,
	type ContentCollectionName,
} from '../types/content';

export async function getPublishedCollection<T extends ContentCollectionName>(
	collection: T,
): Promise<CollectionEntry<T>[]> {
	return getCollection(collection, ({ data }) => {
		if (import.meta.env.PROD && 'draft' in data && data.draft === true) {
			return false;
		}
		return true;
	});
}

export function getEntrySlug(entry: { id: string; data: { slug?: string } }): string {
	return entry.data.slug ?? entry.id;
}

export function getEntryUrl(collection: ContentCollectionName, entry: { id: string; data: { slug?: string } }): string {
	const basePath = COLLECTION_ROUTES[collection].path;
	return `${basePath}/${getEntrySlug(entry)}`;
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function sortByDateDesc<T extends { data: Record<string, unknown> }>(
	entries: T[],
	field: string,
): T[] {
	return [...entries].sort((a, b) => {
		const dateA = a.data[field] as Date | undefined;
		const dateB = b.data[field] as Date | undefined;
		if (!dateA || !dateB) return 0;
		return dateB.valueOf() - dateA.valueOf();
	});
}

export async function getLatestArticles(limit = 3): Promise<CollectionEntry<'articles'>[]> {
	const articles = await getPublishedCollection('articles');
	return sortByDateDesc(articles, 'publishDate').slice(0, limit);
}

export async function getFeaturedProjects(limit = 3): Promise<CollectionEntry<'projects'>[]> {
	const projects = await getPublishedCollection('projects');
	return projects.filter((entry) => entry.data.featured).slice(0, limit);
}

export async function getFeaturedThreatHunts(limit = 3): Promise<CollectionEntry<'threat-hunts'>[]> {
	const hunts = await getPublishedCollection('threat-hunts');
	return hunts.filter((entry) => entry.data.featured).slice(0, limit);
}

export async function getHomelabFocus(limit = 3): Promise<CollectionEntry<'homelab'>[]> {
	const entries = await getPublishedCollection('homelab');
	const featured = entries.filter((entry) => entry.data.featured);
	const source = featured.length > 0 ? featured : entries;
	return sortByDateDesc(source, 'updatedDate').slice(0, limit);
}

export async function getLatestDetections(limit = 3): Promise<CollectionEntry<'detections'>[]> {
	const detections = sortDetectionsByRecency(await getPublishedCollection('detections'));
	return detections.slice(0, limit);
}

export function sortDetectionsByRecency(
	detections: CollectionEntry<'detections'>[],
): CollectionEntry<'detections'>[] {
	return [...detections].sort((a, b) => {
		const dateA = a.data.reviewDate ?? a.data.revisions.at(-1)?.date ?? new Date(0);
		const dateB = b.data.reviewDate ?? b.data.revisions.at(-1)?.date ?? new Date(0);
		return dateB.valueOf() - dateA.valueOf();
	});
}

export function formatLabel(value: string): string {
	return value
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export async function getCollectionStaticPaths<T extends ContentCollectionName>(
	collection: T,
): Promise<Array<{ params: { slug: string }; props: { entry: CollectionEntry<T> } }>> {
	const entries = await getPublishedCollection(collection);
	return entries.map((entry) => ({
		params: { slug: getEntrySlug(entry) },
		props: { entry },
	}));
}
