import type { SeoDefaults, SiteConfig, SocialLink } from '../types/site';

export const SITE: SiteConfig = {
	name: 'ElliottSecurity',
	title: 'ElliottSecurity Platform',
	description:
		'Practical cybersecurity engineering documentation covering threat hunting, detection engineering, homelab infrastructure, and technical research.',
	url: import.meta.env.SITE_URL ?? 'https://elliottsecurity.com',
	author: {
		name: 'Elliott Security',
		url: 'https://github.com/elliottsecurity',
	},
	locale: 'en-US',
	motto: 'Document the work. Share the knowledge. Keep building.',
	version: '1.0.0-rc.1',
	keywords: [
		'cybersecurity',
		'threat hunting',
		'detection engineering',
		'security research',
		'DFIR',
		'homelab',
		'security engineering',
	],
};

export const SEO_DEFAULTS: SeoDefaults = {
	titleTemplate: '%s | ElliottSecurity',
	description: SITE.description,
	ogType: 'website',
	twitterCard: 'summary_large_image',
};

export const SOCIAL_LINKS: SocialLink[] = [
	{
		label: 'GitHub',
		href: 'https://github.com/elliottsecurity',
	},
];

export const DEFAULT_OG_IMAGE = '/og-default.svg';
