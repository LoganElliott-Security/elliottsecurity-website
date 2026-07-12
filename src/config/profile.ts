import type {
	Certification,
	EducationEntry,
	ExperienceEntry,
	ProfileConfig,
	Technology,
} from '../types/profile';

/** Public resume PDF served from /documents/Logan-Elliott-Resume.pdf */
export const RESUME_PATH = '/documents/Logan-Elliott-Resume.pdf';

export const PROFILE: ProfileConfig = {
	name: 'Logan Elliott',
	credential: 'CASP+',
	primaryTitle: 'Senior Cybersecurity Analyst',
	titles: ['Senior Cybersecurity Analyst', 'Detection Engineer', 'Threat Hunter'],
	headline: 'Threat Hunting · Incident Response · DFIR · Threat Intelligence',
	tagline:
		'Cybersecurity professional supporting Department of Defense operations across incident response, threat hunting, digital forensics, detection engineering, and threat intelligence.',
	summary:
		'Cybersecurity professional with 5+ years of experience supporting Department of Defense operations across incident response, threat hunting, digital forensics, vulnerability management, detection engineering, and threat intelligence. Led 73% of enterprise cybersecurity incidents and 78% of threat hunting operations across 120+ Air Force and Space Force locations. Built 94% of detection queries used by the analyst team, improving detection fidelity and response efficiency. Strong background in SIEM analysis, malware triage, ICS security, and intelligence-driven defense.',
	location: 'Panama City Beach, FL',
	email: 'logan@elliottsecurity.net',
	clearance: 'Active Secret Clearance',
};

export const PROFESSIONAL_SKILLS = [
	'Threat Hunting',
	'Incident Response',
	'Detection Engineering',
	'Threat Intelligence',
	'Digital Forensics',
	'Malware Analysis',
	'SIEM Analysis',
	'ICS Security',
	'Vulnerability Management',
	'Security Consulting',
];

export const PLATFORM_TOPICS = [
	'Detection Engineering',
	'Threat Hunting',
	'Digital Forensics',
	'Incident Response',
	'Homelab Engineering',
	'Security Automation',
	'Open Source Projects',
];

export const CURRENT_FOCUS = [
	'Enterprise Detection Engineering Lab',
	'Threat Hunting',
	'Detection Engineering',
	'Incident Response',
	'DFIR',
	'ELK Stack',
	'Proxmox',
	'Fleet',
	'Velociraptor',
	'Sysmon',
	'Security Automation',
];

export const EDUCATION: EducationEntry = {
	degree: 'B.S. Cybersecurity and Information Assurance',
	institution: 'Western Governors University',
};

export const EXPERIENCE: ExperienceEntry[] = [
	{
		kind: 'work',
		role: 'Senior Cybersecurity Analyst',
		organization: 'General Dynamics',
		period: 'Mar 2024 – Present',
		description:
			'Lead enterprise cybersecurity operations across 120+ Air Force and Space Force locations, securing Industrial Control System environments while driving incident response, threat hunting, and detection engineering at scale.',
		highlights: [
			'Lead 73% of enterprise cybersecurity incidents from triage through containment, eradication, recovery, and root cause analysis.',
			'Lead 78% of enterprise threat hunting operations across multiple security platforms.',
			'Develop and maintain 94% of threat detection queries, improving detection fidelity and analyst efficiency.',
			'Produce daily threat intelligence briefings using CISA KEV, BleepingComputer, SANS, and DFIR research to prioritize emerging threats.',
			'Perform digital forensics, log correlation, artifact collection, and timeline reconstruction mapped to MITRE ATT&CK.',
			'Conduct malware sandbox analysis to identify indicators of compromise and malicious behavior.',
			'Tune Trellix endpoint firewall, threat prevention, and Data Loss Prevention policies.',
			'Author incident response playbooks, mentor analysts, and prepare executive reporting for security leadership.',
		],
	},
	{
		kind: 'work',
		role: 'System Administrator',
		organization: 'General Dynamics',
		period: 'Jul 2023 – Mar 2024',
		description:
			'Supported AFNORTH/1AF technology refresh initiatives and enterprise endpoint operations during a critical infrastructure modernization period.',
		highlights: [
			'Led AFNORTH/1AF technology refresh initiative with executive project status reporting.',
			'Deployed endpoint equipment and resolved hardware and software issues with minimal user disruption.',
			'Managed technology refresh inventory, tracking hardware assets, deployments, and lifecycle replacements.',
		],
	},
	{
		kind: 'work',
		role: 'System Administrator',
		organization: 'Forge Forward',
		period: 'Sep 2022 – Aug 2023',
		description:
			'Maintained Navy enterprise systems and infrastructure, combining vulnerability management with Active Directory administration and cross-platform patching.',
		highlights: [
			'Supported 140+ Navy systems and resolved 80+ daily support requests with 85% first-contact resolution.',
			'Used ACAS to identify, assess, and remediate vulnerabilities across enterprise systems.',
			'Managed Active Directory administration including user accounts, group policies, and access management.',
			'Maintained RHEL Ansible playbooks and PowerShell scripts for system administration and automation.',
		],
	},
	{
		kind: 'work',
		role: 'IT Specialist',
		organization: 'Florida State University',
		period: 'Oct 2021 – Oct 2022',
		description:
			'Provided enterprise endpoint support, Active Directory administration, and physical network infrastructure maintenance for campus IT operations.',
		highlights: [
			'Delivered enterprise endpoint support and Active Directory administration.',
			'Installed, maintained, and troubleshot physical network rack infrastructure including cable management and hardware replacements.',
		],
	},
	{
		kind: 'education',
		role: EDUCATION.degree,
		organization: EDUCATION.institution,
		period: '',
		description:
			'Bachelor of Science in Cybersecurity and Information Assurance, building the academic foundation for enterprise security operations, forensics, and defense work.',
	},
];

/** Completed certifications first, ordered by credential level. */
export const CERTIFICATIONS: Certification[] = [
	{
		name: 'CompTIA CASP+',
		status: 'earned',
		credentialUrl: 'https://www.comptia.org/certifications/casp',
	},
	{
		name: 'CompTIA PenTest+',
		status: 'earned',
		credentialUrl: 'https://www.comptia.org/certifications/pentest',
	},
	{
		name: 'CompTIA CySA+',
		status: 'earned',
		credentialUrl: 'https://www.comptia.org/certifications/cysa',
	},
	{
		name: 'CompTIA Security+',
		status: 'earned',
		credentialUrl: 'https://www.comptia.org/certifications/security',
	},
];

export const TECHNOLOGIES: Technology[] = [
	{ name: 'Microsoft Defender for Endpoint', category: 'security' },
	{ name: 'Elastic Security', category: 'security' },
	{ name: 'Trellix', category: 'security' },
	{ name: 'ACAS', category: 'security' },
	{ name: 'HBSS', category: 'security' },
	{ name: 'Cisco ASDM', category: 'security' },
	{ name: 'Windows Server', category: 'platform' },
	{ name: 'Active Directory', category: 'platform' },
	{ name: 'RHEL', category: 'platform' },
	{ name: 'SCCM', category: 'platform' },
	{ name: 'WSUS', category: 'platform' },
	{ name: 'PowerShell', category: 'development' },
	{ name: 'KQL', category: 'development' },
	{ name: 'ES|QL', category: 'development' },
	{ name: 'MITRE ATT&CK', category: 'security' },
	{ name: 'Digital Forensics', category: 'forensics' },
	{ name: 'Threat Hunting', category: 'skills' },
	{ name: 'Detection Engineering', category: 'skills' },
	{ name: 'Malware Analysis', category: 'forensics' },
	{ name: 'IOC Analysis', category: 'forensics' },
	{ name: 'Sandbox Analysis', category: 'forensics' },
];

/** SEO descriptions derived from profile — use across pages. */
export const SEO = {
	homepage: {
		title: 'Logan Elliott, CASP+ | Senior Cybersecurity Analyst',
		description:
			'Senior Cybersecurity Analyst specializing in threat hunting, incident response, DFIR, and detection engineering. 5+ years supporting DoD cybersecurity operations across 120+ locations.',
	},
	about: {
		title: 'About',
		description:
			'Professional profile of Logan Elliott, CASP+ — Senior Cybersecurity Analyst, Detection Engineer, and Threat Hunter with 5+ years of DoD cybersecurity experience.',
	},
	contact: {
		title: 'Contact',
		description:
			'Connect with Logan Elliott for cybersecurity engineering, detection engineering, threat hunting, DFIR collaboration, and research.',
	},
} as const;
