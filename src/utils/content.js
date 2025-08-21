import { getCollection } from 'astro:content'

// Only return posts without `draft: true` in the frontmatter

export const latestPosts = (
	await getCollection('blog', ({ data }) => {
		return data.draft !== true
	})
).sort(
	(a, b) =>
		new Date(b.data.publishDate).valueOf() -
		new Date(a.data.publishDate).valueOf()
)

export const getSpiritualPosts = (
	await getCollection('blog', ({ data }) => {
		const requiredCategories = ['philosophy', 'mental-health', 'psychology']
		return requiredCategories.some((category) =>
			data.categories.includes(category)
		)
	})
).sort(
	(a, b) =>
		new Date(b.data.publishDate).valueOf() -
		new Date(a.data.publishDate).valueOf()
)

export const getInvestmentPosts = (
	await getCollection('blog', ({ data }) => {
		const requiredCategories = ['investment']
		return requiredCategories.some((category) =>
			data.categories.includes(category)
		)
	})
).sort(
	(a, b) =>
		new Date(b.data.publishDate).valueOf() -
		new Date(a.data.publishDate).valueOf()
)
