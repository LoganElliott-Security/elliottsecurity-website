export type CurrentFocusStatus = 'planning' | 'in-progress' | 'completed';

/** Includes legacy `testing` for cards that still support it. */
export type ProjectStatus = CurrentFocusStatus | 'testing';

export interface CurrentFocusProject {
	title: string;
	description: string;
	status: CurrentFocusStatus;
	progress: number;
	href?: string;
}

export interface EngineeringProject {
	title: string;
	description: string;
	status: ProjectStatus;
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
