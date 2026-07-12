export type SocialProfileId =
	| 'github'
	| 'linkedin'
	| 'email'
	| 'website'
	| 'hackthebox'
	| 'resume';

export interface SocialProfile {
	id: SocialProfileId;
	label: string;
	href: string;
	description?: string;
	footerLabel?: string;
	showInFooter?: boolean;
	showInContact?: boolean;
	optional?: boolean;
}

export type CertificationStatus = 'earned' | 'in-progress' | 'planned';

export interface Certification {
	name: string;
	status: CertificationStatus;
	issueDate?: string;
	credentialUrl?: string;
}

export type ExperienceKind = 'work' | 'education';

export interface ExperienceEntry {
	kind?: ExperienceKind;
	role: string;
	organization: string;
	period: string;
	description: string;
	highlights?: string[];
}

export interface Technology {
	name: string;
	category: 'security' | 'platform' | 'development' | 'infrastructure' | 'forensics' | 'skills';
}

export interface ProfileConfig {
	name: string;
	credential: string;
	primaryTitle: string;
	titles: string[];
	headline: string;
	tagline: string;
	summary: string;
	location: string;
	email: string;
	clearance: string;
}

export interface ProfileIdentity {
	name: string;
	titles: string[];
	tagline: string;
}

export interface EducationEntry {
	degree: string;
	institution: string;
}
