export interface SiteAuthor {
	name: string;
	url: string;
	email?: string;
}

export interface SocialLink {
	label: string;
	href: string;
}

export interface SiteConfig {
	name: string;
	title: string;
	description: string;
	url: string;
	author: SiteAuthor;
	locale: string;
	motto: string;
	version: string;
	keywords: string[];
}

export interface SeoDefaults {
	titleTemplate: string;
	description: string;
	ogType: string;
	twitterCard: 'summary' | 'summary_large_image';
}

export interface SeoMetadata {
	title: string;
	description: string;
	canonical: string;
	ogTitle: string;
	ogDescription: string;
	ogImage: string;
	ogType: string;
	twitterCard: string;
	noindex: boolean;
}
