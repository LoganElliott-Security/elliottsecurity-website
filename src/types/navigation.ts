export interface NavItem {
	label: string;
	href: string;
	description?: string;
}

export interface FooterNavGroup {
	title: string;
	items: NavItem[];
}
