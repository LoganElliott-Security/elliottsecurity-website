export type ProjectStatus = 'planning' | 'in-progress' | 'testing' | 'completed';

export interface EngineeringProject {
	title: string;
	status: ProjectStatus;
	description: string;
	progress: number;
	href?: string;
}

export interface LearningItem {
	title: string;
	description?: string;
	href?: string;
}

export type PublicationStatus = 'planned' | 'in-progress' | 'draft';

export interface PublishingItem {
	title: string;
	status: PublicationStatus;
	description?: string;
}

export type RoadmapPhase = 'current' | 'next' | 'future';

export interface RoadmapMilestone {
	phase: RoadmapPhase;
	title: string;
	description: string;
	items: string[];
}

export interface ActiveTechnology {
	name: string;
}
