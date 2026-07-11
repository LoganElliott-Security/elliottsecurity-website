export type DetectionSeverity = 'informational' | 'low' | 'medium' | 'high' | 'critical';

export type DetectionValidationStatus =
	| 'not-started'
	| 'in-progress'
	| 'validated'
	| 'failed';

export type DetectionLogicLanguage =
	| 'sigma'
	| 'kql'
	| 'eql'
	| 'spl'
	| 'yara'
	| 'powershell'
	| 'python'
	| 'bash'
	| 'json'
	| 'xml'
	| 'yaml';

export type RevisionStatus = 'current' | 'deprecated' | 'draft';

export interface DetectionRevision {
	version: string;
	date: Date;
	status: RevisionStatus;
	summary?: string;
	downloadPath?: string;
	fileName?: string;
}

export interface DetectionLogicBlock {
	language: DetectionLogicLanguage;
	title?: string;
	code: string;
	fileName?: string;
	downloadPath?: string;
}

export interface FalsePositive {
	description: string;
	mitigation?: string;
}

export interface DetectionReference {
	title: string;
	url: string;
}

export interface DetectionCoverageItem {
	category: string;
	percentage?: number;
	description?: string;
}

export interface TestingProcedure {
	summary?: string;
	steps: string[];
	expectedResults?: string;
}

export interface ResolvedDetectionRelated {
	articles: Array<{ id: string; title: string; href: string; description: string }>;
	projects: Array<{ id: string; title: string; href: string; description: string }>;
	threatHunts: Array<{ id: string; title: string; href: string; description: string }>;
	homelab: Array<{ id: string; title: string; href: string; description: string }>;
	detections: Array<{ id: string; title: string; href: string; description: string }>;
}

export interface DetectionDownload {
	label: string;
	path: string;
	fileName?: string;
}
