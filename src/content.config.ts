import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const difficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);

const tagsSchema = z.array(z.string()).default([]);

const optionalUrl = z.union([z.string().url(), z.literal('')]).optional();

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		author: z.string(),
		category: z.string(),
		tags: tagsSchema,
		coverImage: z.string().optional(),
		readingTime: z.number().int().positive().optional(),
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		status: z.enum(['planning', 'in-progress', 'completed', 'archived']),
		featured: z.boolean().default(false),
		github: optionalUrl,
		demo: optionalUrl,
		technologies: z.array(z.string()).default([]),
		difficulty: difficultySchema,
		startDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		coverImage: z.string().optional(),
		tags: tagsSchema,
	}),
});

const threatHunts = defineCollection({
	loader: glob({ base: './src/content/threat-hunts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		huntDate: z.coerce.date(),
		status: z.enum(['planned', 'in-progress', 'completed']),
		mitreTechniques: z.array(z.string()).default([]),
		tools: z.array(z.string()).default([]),
		hypothesis: z.string(),
		difficulty: difficultySchema,
		featured: z.boolean().default(false),
		tags: tagsSchema,
		coverImage: z.string().optional(),
	}),
});

const detections = defineCollection({
	loader: glob({ base: './src/content/detections', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		detectionId: z.string(),
		version: z.string(),
		severity: z.enum(['informational', 'low', 'medium', 'high', 'critical']),
		ruleType: z.enum(['sigma', 'kql', 'eql', 'yara', 'spl', 'custom']),
		platform: z.string(),
		language: z.string(),
		status: z.enum(['experimental', 'testing', 'production', 'deprecated']),
		validationStatus: z
			.enum(['not-started', 'in-progress', 'validated', 'failed'])
			.default('not-started'),
		dataSources: z.array(z.string()).default([]),
		requiredLogs: z.array(z.string()).default([]),
		requiredTools: z.array(z.string()).default([]),
		detectionLogic: z
			.array(
				z.object({
					language: z.enum([
						'sigma',
						'kql',
						'eql',
						'spl',
						'yara',
						'powershell',
						'python',
						'bash',
						'json',
						'xml',
						'yaml',
					]),
					title: z.string().optional(),
					code: z.string(),
					fileName: z.string().optional(),
					downloadPath: z.string().optional(),
				}),
			)
			.default([]),
		falsePositives: z
			.array(
				z.object({
					description: z.string(),
					mitigation: z.string().optional(),
				}),
			)
			.default([]),
		tuningGuidance: z.string().optional(),
		testingProcedure: z
			.object({
				summary: z.string().optional(),
				steps: z.array(z.string()).default([]),
				expectedResults: z.string().optional(),
			})
			.optional(),
		detectionCoverage: z
			.array(
				z.object({
					category: z.string(),
					percentage: z.number().min(0).max(100).optional(),
					description: z.string().optional(),
				}),
			)
			.default([]),
		revisions: z
			.array(
				z.object({
					version: z.string(),
					date: z.coerce.date(),
					status: z.enum(['current', 'deprecated', 'draft']).default('current'),
					summary: z.string().optional(),
					downloadPath: z.string().optional(),
					fileName: z.string().optional(),
				}),
			)
			.default([]),
		mitreTechniques: z.array(z.string()).default([]),
		relatedThreatHunts: z.array(z.string()).default([]),
		relatedProjects: z.array(z.string()).default([]),
		relatedArticles: z.array(z.string()).default([]),
		relatedHomelab: z.array(z.string()).default([]),
		relatedDetections: z.array(z.string()).default([]),
		references: z
			.array(
				z.object({
					title: z.string(),
					url: z.string().url(),
				}),
			)
			.default([]),
		author: z.string(),
		reviewer: z.string().optional(),
		reviewDate: z.coerce.date().optional(),
		tags: tagsSchema,
		github: optionalUrl,
		coverImage: z.string().optional(),
	}),
});

const homelab = defineCollection({
	loader: glob({ base: './src/content/homelab', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		category: z.string(),
		platform: z.string(),
		difficulty: difficultySchema,
		featured: z.boolean().default(false),
		technologies: z.array(z.string()).default([]),
		tags: tagsSchema,
		updatedDate: z.coerce.date(),
		coverImage: z.string().optional(),
	}),
});

const products = defineCollection({
	loader: glob({ base: './src/content/products', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		price: z.string(),
		status: z.enum(['available', 'coming-soon', 'deprecated']),
		featured: z.boolean().default(false),
		download: optionalUrl,
		github: optionalUrl,
		tags: tagsSchema,
		coverImage: z.string().optional(),
	}),
});

const milestoneSchema = z.object({
	id: z.string(),
	title: z.string(),
	summary: z.string(),
	completed: z.string().optional(),
});

const status = defineCollection({
	loader: glob({ base: './src/content/status', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		slug: z.string().optional(),
		pageTitle: z.string().default('Lab Progress'),
		eyebrow: z.string().default('Now Building'),
		overallProgress: z.number().min(0).max(100),
		currentMilestone: z.string(),
		currentPhase: z.string(),
		nextObjective: z.string(),
		nextMilestone: z.string(),
		currentFocus: z.string(),
		lastUpdated: z.coerce.date(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(true),
		tags: tagsSchema,
		timeline: z
			.array(
				z.object({
					date: z.string(),
					label: z.string(),
				}),
			)
			.default([]),
		completedMilestones: z.array(milestoneSchema).default([]),
		upcomingMilestones: z.array(milestoneSchema).default([]),
		roadmap: z
			.array(
				z.object({
					phase: z.string(),
					status: z.string(),
					progress: z.number().min(0).max(100),
					items: z.array(z.string()).default([]),
				}),
			)
			.default([]),
		recentChanges: z
			.array(
				z.object({
					date: z.string(),
					title: z.string(),
					detail: z.string(),
				}),
			)
			.default([]),
		recentlyCompleted: z.array(z.string()).default([]),
		progressFlags: z
			.array(
				z.object({
					name: z.string(),
					status: z.enum(['complete', 'in-progress', 'planned']),
				}),
			)
			.default([]),
		infrastructureInventory: z
			.array(
				z.object({
					name: z.string(),
					role: z.string(),
					status: z.string(),
					detail: z.string(),
				}),
			)
			.default([]),
		architectureOverview: z.string(),
		screenshotsPlaceholder: z.string(),
		architectureDiagramPlaceholder: z.string(),
	}),
});

export const collections = {
	articles,
	projects,
	'threat-hunts': threatHunts,
	detections,
	homelab,
	products,
	status,
};
