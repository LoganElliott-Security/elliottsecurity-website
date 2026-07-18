import {
	getHomepageCurrentFocus,
	getSortedCurrentFocusProjects,
	type CurrentFocusProject,
} from '../data/currentFocus';
import type {
	ActiveTechnology,
	EngineeringProject,
	LearningItem,
	PublishingItem,
	RoadmapMilestone,
} from '../types/currentFocus';

export const CURRENT_FOCUS_UPDATED = '2026-07-18';

export const CURRENT_FOCUS_SEO = {
	title: 'Current Focus',
	pageTitle: 'Current Focus | ElliottSecurity',
	description:
		'Flagship engineering initiatives spanning cybersecurity homelab, detection engineering, and threat hunting.',
	subtitle: "Major portfolio initiatives I'm actively building and publishing.",
} as const;

/**
 * Flagship Current Focus projects.
 * Source of truth: src/data/currentFocus.ts
 */
export const ENGINEERING_PROJECTS: EngineeringProject[] = getSortedCurrentFocusProjects();

export type { CurrentFocusProject };

export const LEARNING_ITEMS: LearningItem[] = [
	{
		title: 'HTB CDSA',
		description: 'Certified Defensive Security Analyst preparation and practical defensive security labs.',
	},
	{
		title: 'Detection Engineering',
		description: 'Advanced detection query development, tuning, and validation workflows.',
	},
	{
		title: 'Malware Analysis',
		description: 'Sandbox analysis, IOC extraction, and behavioral classification techniques.',
	},
	{
		title: 'Windows Internals',
		description: 'Deep-dive into process, memory, and registry mechanics for hunt and forensic work.',
	},
	{
		title: 'MITRE ATT&CK',
		description: 'Mapping detections and hunt outcomes to adversary techniques and sub-techniques.',
	},
];

export const PUBLISHING_QUEUE: PublishingItem[] = [
	{
		title: 'ELK Deployment Guide',
		status: 'in-progress',
		description: 'Step-by-step homelab Elastic Stack deployment and hardening.',
	},
	{
		title: 'Fleet Server',
		status: 'planned',
		description: 'Elastic Agent Fleet server configuration and endpoint enrollment.',
	},
	{
		title: 'Sysmon Configuration',
		status: 'planned',
		description: 'Baseline Sysmon config for detection engineering and threat hunting.',
	},
	{
		title: 'Velociraptor Deployment',
		status: 'planned',
		description: 'DFIR artifact collection and hunt automation with Velociraptor.',
	},
	{
		title: 'Threat Hunt #1',
		status: 'draft',
		description: 'First published threat hunt case study from lab telemetry.',
	},
	{
		title: 'Sigma Rule Collection',
		status: 'planned',
		description: 'Curated detection rules with validation notes and MITRE mapping.',
	},
];

export const LAB_ROADMAP: RoadmapMilestone[] = [
	{
		phase: 'current',
		title: 'Lab Foundation',
		description: 'Establish core infrastructure for detection engineering and log collection.',
		items: [
			'Proxmox cluster on HP Z820',
			'Windows Server and Active Directory domain',
			'Initial Elastic Stack deployment',
		],
	},
	{
		phase: 'next',
		title: 'Detection Pipeline',
		description: 'Deploy endpoint telemetry and validate detection rules in the lab.',
		items: [
			'Fleet server and Elastic Agent enrollment',
			'Sysmon baseline across lab endpoints',
			'Velociraptor for artifact collection',
		],
	},
	{
		phase: 'future',
		title: 'Research & Publishing',
		description: 'Run purple team exercises and publish engineering documentation.',
		items: [
			'Threat hunt case studies',
			'Sigma rule collection publication',
			'Full lab architecture documentation series',
		],
	},
];

export const ACTIVE_TECH_STACK: ActiveTechnology[] = [
	{ name: 'Proxmox' },
	{ name: 'Windows Server' },
	{ name: 'Elastic' },
	{ name: 'Fleet' },
	{ name: 'Velociraptor' },
	{ name: 'Sysmon' },
	{ name: 'PowerShell' },
	{ name: 'Python' },
	{ name: 'Sigma' },
	{ name: 'MITRE ATT&CK' },
	{ name: 'Microsoft Defender' },
	{ name: 'Active Directory' },
];

/** Top priorities shown on the homepage Current Focus section. */
export function getHomepagePriorities(limit = 3): EngineeringProject[] {
	return getHomepageCurrentFocus(limit);
}
