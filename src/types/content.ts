export type ContentCollectionName =
	| 'articles'
	| 'projects'
	| 'threat-hunts'
	| 'detections'
	| 'homelab'
	| 'products';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'archived';

export type HuntStatus = 'planned' | 'in-progress' | 'completed';

export type DetectionStatus = 'experimental' | 'testing' | 'production' | 'deprecated';

export type RuleType = 'sigma' | 'kql' | 'eql' | 'yara' | 'spl' | 'custom';

export type ProductStatus = 'available' | 'coming-soon' | 'deprecated';

export interface CollectionRouteConfig {
	path: string;
	label: string;
}

export const COLLECTION_ROUTES: Record<ContentCollectionName, CollectionRouteConfig> = {
	articles: { path: '/articles', label: 'Articles' },
	projects: { path: '/projects', label: 'Projects' },
	'threat-hunts': { path: '/threat-hunts', label: 'Threat Hunts' },
	detections: { path: '/detection-engineering', label: 'Detection Engineering' },
	homelab: { path: '/homelab', label: 'Homelab' },
	products: { path: '/products', label: 'Products' },
};
