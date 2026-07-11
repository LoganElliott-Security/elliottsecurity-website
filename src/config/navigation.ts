import type { FooterNavGroup, NavItem } from '../types/navigation';

export const MAIN_NAV: NavItem[] = [
	{
		label: 'Articles',
		href: '/articles',
		description: 'Educational technical content',
	},
	{
		label: 'Projects',
		href: '/projects',
		description: 'Infrastructure and engineering projects',
	},
	{
		label: 'Threat Hunts',
		href: '/threat-hunts',
		description: 'Documented investigations and methodologies',
	},
	{
		label: 'Detection Engineering',
		href: '/detection-engineering',
		description: 'Detection logic and engineering work',
	},
	{
		label: 'Homelab',
		href: '/homelab',
		description: 'Infrastructure and lab documentation',
	},
	{
		label: 'Products',
		href: '/products',
		description: 'Guides, templates, and resources',
	},
];

export const FOOTER_NAV: FooterNavGroup[] = [
	{
		title: 'Platform',
		items: [
			{ label: 'Articles', href: '/articles' },
			{ label: 'Projects', href: '/projects' },
			{ label: 'Threat Hunts', href: '/threat-hunts' },
			{ label: 'Tags', href: '/tags' },
		],
	},
	{
		title: 'Engineering',
		items: [
			{ label: 'Detection Engineering', href: '/detection-engineering' },
			{ label: 'Homelab', href: '/homelab' },
			{ label: 'Products', href: '/products' },
		],
	},
];
