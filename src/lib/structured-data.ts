import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config/site';
import { PROFILE } from '../config/profile';
import { getSocialSameAsUrls } from '../config/social';
import type { ContentCollectionName } from '../types/content';
import type { BreadcrumbItem } from '../types/knowledge';
import { getEntryUrl } from './content';
import { getCanonicalUrl } from './seo';

export interface JsonLdObject {
	'@context': 'https://schema.org';
	'@type': string;
	[key: string]: unknown;
}

export function buildOrganizationSchema(): JsonLdObject {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE.name,
		url: SITE.url,
		description: SITE.description,
		sameAs: getSocialSameAsUrls(),
	};
}

export function buildPersonSchema(): JsonLdObject {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: `${PROFILE.name}, ${PROFILE.credential}`,
		givenName: PROFILE.name.split(' ')[0],
		familyName: PROFILE.name.split(' ').slice(1).join(' '),
		url: getCanonicalUrl('/about'),
		jobTitle: PROFILE.titles,
		description: PROFILE.summary,
		email: PROFILE.email,
		address: {
			'@type': 'PostalAddress',
			addressLocality: PROFILE.location,
		},
		sameAs: getSocialSameAsUrls(),
		worksFor: {
			'@type': 'Organization',
			name: SITE.name,
			url: SITE.url,
		},
	};
}

export function buildWebsiteSchema(): JsonLdObject {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE.title,
		url: SITE.url,
		description: SITE.description,
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			url: SITE.url,
		},
		inLanguage: SITE.locale,
	};
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: getCanonicalUrl(item.path),
		})),
	};
}

export function buildWebPageSchema({
	title,
	description,
	url,
}: {
	title: string;
	description: string;
	url: string;
}): JsonLdObject {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: title,
		description,
		url: getCanonicalUrl(url),
		isPartOf: {
			'@type': 'WebSite',
			name: SITE.title,
			url: SITE.url,
		},
	};
}

export function buildCollectionPageSchema({
	title,
	description,
	url,
}: {
	title: string;
	description: string;
	url: string;
}): JsonLdObject {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: title,
		description,
		url: getCanonicalUrl(url),
		isPartOf: {
			'@type': 'WebSite',
			name: SITE.title,
			url: SITE.url,
		},
	};
}

export function buildArticleSchema(entry: CollectionEntry<'articles'>): JsonLdObject {
	const { title, description, author, publishDate, updatedDate, coverImage } = entry.data;
	const url = getEntryUrl('articles', entry);

	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		author: {
			'@type': 'Person',
			name: author,
		},
		datePublished: publishDate.toISOString(),
		dateModified: (updatedDate ?? publishDate).toISOString(),
		mainEntityOfPage: getCanonicalUrl(url),
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			url: SITE.url,
		},
		...(coverImage ? { image: getCanonicalUrl(coverImage) } : {}),
	};
}

export function buildTechArticleSchema(
	collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
): JsonLdObject | null {
	if (collection !== 'articles') {
		return null;
	}

	return buildArticleSchema(entry as CollectionEntry<'articles'>);
}

export function buildDetailBreadcrumbs(
	collection: ContentCollectionName,
	entry: CollectionEntry<ContentCollectionName>,
	collectionLabel: string,
	collectionPath: string,
): BreadcrumbItem[] {
	const data = entry.data as { title: string };

	return [
		{ name: 'Home', path: '/' },
		{ name: collectionLabel, path: collectionPath },
		{ name: data.title, path: getEntryUrl(collection, entry) },
	];
}

export function buildListingBreadcrumbs(title: string, path: string): BreadcrumbItem[] {
	return [
		{ name: 'Home', path: '/' },
		{ name: title, path },
	];
}

export function buildTagBreadcrumbs(tagLabel: string, tagSlug: string): BreadcrumbItem[] {
	return [
		{ name: 'Home', path: '/' },
		{ name: 'Tags', path: '/tags' },
		{ name: tagLabel, path: `/tags/${tagSlug}` },
	];
}

export function getGlobalStructuredData(): JsonLdObject[] {
	return [buildOrganizationSchema(), buildWebsiteSchema()];
}
