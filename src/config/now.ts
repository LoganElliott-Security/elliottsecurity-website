import type { NowSection } from '../types/profile';

/**
 * Current engineering priorities for the /now page.
 * Update this file as focus areas change — no hardcoding in page components.
 */
export const NOW_UPDATED = '2026-07-11';

export const NOW_SECTIONS: NowSection[] = [
	{
		title: 'Current Projects',
		items: [
			'Enterprise Detection Engineering Lab infrastructure on Proxmox',
			'ElliottSecurity Platform content publishing workflow',
			'Detection query development and validation pipeline',
		],
	},
	{
		title: 'Current Learning',
		items: [
			'Advanced Velociraptor artifact development',
			'Elastic Security detection engineering and ES|QL',
			'Fleet and Sysmon deployment hardening',
		],
	},
	{
		title: 'Current Lab',
		items: [
			'Proxmox virtualization cluster for purple team exercises',
			'ELK Stack log ingestion and detection testing',
			'Active Directory attack and detection simulation',
		],
	},
	{
		title: 'Upcoming Research',
		items: [
			'ICS security monitoring and detection coverage',
			'Threat intelligence-driven hunt hypothesis development',
			'MITRE ATT&CK mapping for enterprise detection gaps',
		],
	},
	{
		title: 'Publishing Queue',
		items: [
			'First public detection engineering writeup',
			'Homelab architecture documentation',
			'Threat hunt case study publication',
		],
	},
	{
		title: 'Roadmap',
		items: [
			'Expand detection artifact library on ElliottSecurity Platform',
			'Publish open-source automation tooling to GitHub',
			'Document Enterprise Detection Engineering Lab build series',
		],
	},
];
