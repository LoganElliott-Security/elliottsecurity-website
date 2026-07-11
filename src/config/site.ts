import type { SeoDefaults, SiteConfig } from '../types/site';
import { PROFILE } from './profile';

export const SITE: SiteConfig = {
	name: 'ElliottSecurity',
	title: 'ElliottSecurity Platform',
	description:
		'Senior Cybersecurity Analyst specializing in threat hunting, incident response, DFIR, and detection engineering. DoD cybersecurity operations, detection query development, and threat intelligence.',
	url: import.meta.env.SITE_URL ?? 'https://elliottsecurity.net',
	author: {
		name: PROFILE.name,
		url: 'https://github.com/LoganElliott-Security',
		email: PROFILE.email,
	},
	locale: 'en-US',
	motto: 'Document the work. Share the knowledge. Keep building.',
	version: '1.0.0-rc.1',
	keywords: [
		'Logan Elliott',
		'cybersecurity',
		'threat hunting',
		'detection engineering',
		'incident response',
		'DFIR',
		'threat intelligence',
		'DoD',
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

export const DEFAULT_OG_IMAGE = '/og-default.svg';
