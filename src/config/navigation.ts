import type { FooterNavGroup, NavItem } from '../types/navigation';

export const MAIN_NAV: NavItem[] = [
	{
		label: 'Home',
		href: '/',
		description: 'Platform homepage',
	},
	{
		label: 'Projects',
		href: '/projects',
		description: 'Infrastructure and engineering projects',
	},
	{
		label: 'Detection Engineering',
		href: '/detection-engineering',
		description: 'Detection logic and engineering work',
	},
	{
		label: 'Threat Hunts',
		href: '/threat-hunts',
		description: 'Documented investigations and methodologies',
	},
	{
		label: 'Homelab',
		href: '/homelab',
		description: 'Infrastructure and lab documentation',
	},
	{
		label: 'Articles',
		href: '/articles',
		description: 'Educational technical content',
	},
	{
		label: 'About',
		href: '/about',
		description: 'Professional profile and background',
	},
	{
		label: 'Contact',
		href: '/contact',
		description: 'Connect and collaborate',
	},
	{
		label: 'Current Focus',
		href: '/current-focus',
		description: 'Active engineering dashboard',
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
	{
		title: 'About',
		items: [
			{ label: 'About', href: '/about' },
			{ label: 'Current Focus', href: '/current-focus' },
			{ label: 'Contact', href: '/contact' },
		],
	},
];

export function isNavItemActive(href: string, currentPath: string): boolean {
	if (href === '/') {
		return currentPath === '/';
	}
	return currentPath === href || currentPath.startsWith(`${href}/`);
}
