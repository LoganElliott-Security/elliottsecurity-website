import type { SocialProfile, SocialProfileId } from '../types/profile';
import { PROFILE, RESUME_PATH } from './profile';

/** Profiles displayed on the Contact page, in order. */
export const CONTACT_PROFILE_IDS: SocialProfileId[] = ['github', 'linkedin', 'resume', 'website'];

/**
 * Central configuration for all public profiles and contact links.
 * Email and resume path are sourced from profile.ts.
 */
export const SOCIAL_PROFILES: SocialProfile[] = [
	{
		id: 'github',
		label: 'GitHub',
		href: 'https://github.com/LoganElliott-Security',
		description: 'Open-source projects, detection rules, and engineering work.',
		showInFooter: true,
		showInContact: true,
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/loganelliott01/',
		description: 'Professional networking and career updates.',
		showInFooter: true,
		showInContact: true,
	},
	{
		id: 'email',
		label: 'Email',
		href: `mailto:${PROFILE.email}`,
		description: 'Direct contact for collaboration and research inquiries.',
		showInFooter: true,
		showInContact: true,
	},
	{
		id: 'website',
		label: 'Website',
		href: 'https://elliottsecurity.net',
		description: 'ElliottSecurity Platform — primary engineering knowledge base.',
		showInContact: true,
	},
	{
		id: 'hackthebox',
		label: 'Hack The Box',
		href: 'https://profile.hackthebox.com/profile/019ddc63-4e34-73b8-b5c2-3eb99499864a',
		description: 'Offensive security practice and continuous skill development.',
		showInContact: false,
	},
	{
		id: 'resume',
		label: 'Resume',
		footerLabel: 'Download Resume',
		href: RESUME_PATH,
		description: 'Professional resume and experience summary.',
		showInFooter: true,
		showInContact: true,
	},
];

export function getSocialProfiles(options?: {
	footer?: boolean;
	contact?: boolean;
	includeOptional?: boolean;
}): SocialProfile[] {
	return SOCIAL_PROFILES.filter((profile) => {
		if (!profile.href) return false;
		if (profile.optional && !options?.includeOptional) return false;
		if (options?.footer && !profile.showInFooter) return false;
		if (options?.contact) {
			if (!profile.showInContact) return false;
			return CONTACT_PROFILE_IDS.includes(profile.id);
		}
		return true;
	});
}

export function getSocialProfile(id: SocialProfile['id']): SocialProfile | undefined {
	return SOCIAL_PROFILES.find((profile) => profile.id === id);
}

export function getSocialSameAsUrls(): string[] {
	return SOCIAL_PROFILES.filter(
		(profile) =>
			profile.href &&
			profile.id !== 'email' &&
			profile.id !== 'resume' &&
			!profile.href.startsWith('mailto:') &&
			!profile.href.startsWith('/'),
	).map((profile) => profile.href);
}

export function getFooterSocialLabel(profile: SocialProfile): string {
	return profile.footerLabel ?? profile.label;
}
