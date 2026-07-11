import { DEFAULT_OG_IMAGE, SEO_DEFAULTS, SITE } from '../config/site';
import type { SeoMetadata } from '../types/site';

export interface SeoInput {
	title?: string;
	description?: string;
	image?: string;
	canonical?: string;
	noindex?: boolean;
}

export function getCanonicalUrl(path: string = '/'): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return new URL(normalizedPath, SITE.url).href;
}

export function getSeoMetadata({
	title,
	description,
	image,
	canonical,
	noindex = false,
}: SeoInput = {}): SeoMetadata {
	const pageTitle = title ?? SITE.title;
	const resolvedTitle = title
		? SEO_DEFAULTS.titleTemplate.replace('%s', title)
		: SITE.title;
	const resolvedDescription = description ?? SEO_DEFAULTS.description;
	const resolvedImage = image ?? DEFAULT_OG_IMAGE;
	const resolvedCanonical = canonical ?? getCanonicalUrl('/');

	return {
		title: resolvedTitle,
		description: resolvedDescription,
		canonical: resolvedCanonical,
		ogTitle: pageTitle,
		ogDescription: resolvedDescription,
		ogImage: new URL(resolvedImage, SITE.url).href,
		ogType: SEO_DEFAULTS.ogType,
		twitterCard: SEO_DEFAULTS.twitterCard,
		noindex,
	};
}
