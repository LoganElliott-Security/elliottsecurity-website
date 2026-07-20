/**
 * Homepage / Current Focus — flagship portfolio initiatives.
 *
 * Edit this file to update the Current Focus section.
 * The homepage and /current-focus dashboard read from this data automatically.
 *
 * HOW TO UPDATE
 * -------------
 * • Progress only:
 *     Edit the `progress` number (0–100).
 *
 * • Mark complete:
 *     status: 'completed'
 *     progress: 100
 *
 * • Rotate projects:
 *     Remove a completed object and replace it with a new initiative.
 *     Keep three flagship cards for the homepage preview.
 *
 * Technologies (ELK, Sigma, Proxmox, etc.) belong on individual project pages —
 * not as separate homepage Current Focus cards.
 */

import type { CurrentFocusProject, CurrentFocusStatus } from '../types/currentFocus';

export type { CurrentFocusProject, CurrentFocusStatus };

export const currentFocusProjects: CurrentFocusProject[] = [
	{
		title: 'Cybersecurity Homelab',
		status: 'in-progress',
		progress: 15,
		href: '/lab-progress',
		description:
			'Enterprise Homelab at 15% — DCP-002 networking/edge foundation complete (OPNsense, WiFi bridge, lab network). Active Directory on ES-DC-01 is in progress.',
	},
	{
		title: 'Detection Engineering',
		status: 'planning',
		progress: 0,
		href: '/detection-engineering',
		description:
			'Developing Sigma rules, YARA signatures, detection logic, ATT&CK mappings, validation labs, and engineering documentation.',
	},
	{
		title: 'Threat Hunting',
		status: 'planning',
		progress: 0,
		href: '/threat-hunts',
		description:
			'Conducting hypothesis-driven threat hunts, telemetry analysis, purple team exercises, and publishing hunt reports.',
	},
];

const STATUS_SORT_ORDER: Record<CurrentFocusStatus, number> = {
	'in-progress': 0,
	planning: 1,
	completed: 2,
};

/** Sorted: in-progress → planning → completed */
export function getSortedCurrentFocusProjects(): CurrentFocusProject[] {
	return [...currentFocusProjects].sort(
		(a, b) => STATUS_SORT_ORDER[a.status] - STATUS_SORT_ORDER[b.status],
	);
}

/** Homepage Current Focus preview (defaults to three flagship cards). */
export function getHomepageCurrentFocus(limit = 3): CurrentFocusProject[] {
	return getSortedCurrentFocusProjects().slice(0, limit);
}
