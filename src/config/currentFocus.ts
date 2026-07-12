import type {
	ActiveTechnology,
	EngineeringProject,
	LearningItem,
	PublishingItem,
	RoadmapMilestone,
} from '../types/currentFocus';

export const CURRENT_FOCUS_UPDATED = '2026-07-11';

export const CURRENT_FOCUS_SEO = {
	title: 'Current Focus',
	pageTitle: 'Current Focus | ElliottSecurity',
	description:
		'Current engineering projects, research, threat hunting, homelab development, and cybersecurity learning in progress.',
	subtitle: "What I'm actively building, researching, publishing, and learning.",
} as const;

export const ENGINEERING_PROJECTS: EngineeringProject[] = [
	{
		title: 'Enterprise Detection Engineering Lab',
		status: 'in-progress',
		description:
			'Building a full-stack detection engineering lab for rule development, validation, and purple team exercises.',
		progress: 45,
		href: '/homelab',
	},
	{
		title: 'HP Z820 Homelab',
		status: 'in-progress',
		description: 'Proxmox-based virtualization host powering lab VMs, log ingestion, and attack simulation workloads.',
		progress: 60,
		href: '/homelab',
	},
	{
		title: 'ELK Stack',
		status: 'in-progress',
		description: 'Deploying Elastic Security for centralized log ingestion, detection testing, and hunt queries.',
		progress: 35,
	},
	{
		title: 'Detection Engineering Platform',
		status: 'in-progress',
		description: 'ElliottSecurity Platform — Markdown-driven publishing for detections, hunts, and engineering documentation.',
		progress: 70,
		href: '/detection-engineering',
	},
	{
		title: 'Threat Hunting Research',
		status: 'planning',
		description: 'Documenting hunt hypotheses, methodologies, and findings from lab and enterprise telemetry analysis.',
		progress: 15,
		href: '/threat-hunts',
	},
];

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

/** Top priorities shown on the homepage preview section. */
export function getHomepagePriorities(limit = 3): EngineeringProject[] {
	return ENGINEERING_PROJECTS.filter((project) => project.status !== 'completed').slice(0, limit);
}
