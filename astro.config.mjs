// https://astro.build/config
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import { remarkReadingTime } from './src/utils/all'

export default defineConfig({
	site: 'https://lazypod.org',
	redirects: {
		'/spiritual': '/self-growth',
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: ['rehype-plugin-image-native-lazy-loading'],
		extendDefaultPlugins: true,
	},
	integrations: [tailwind(), mdx(), sitemap(), icon()],
	server: {
		port: 4322,
	},
})
