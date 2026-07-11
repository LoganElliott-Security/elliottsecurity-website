// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkCallouts } from './src/lib/remark-callouts.ts';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://elliottsecurity.net',

  markdown: {
      remarkPlugins: [remarkCallouts],
	},

  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [sitemap()],
});