import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

function sortByTime(posts: CollectionEntry<'blog'>[]) {
	return posts.sort(
		(a, b) =>
			new Date(b.data.publishDate).valueOf() -
			new Date(a.data.publishDate).valueOf()
	)
}

export async function getMainPosts() {
	const posts = await getCollection('blog', ({ data }) => {
		return data.draft !== true && !data.categories.includes('info')
	})
	return sortByTime(posts)
}

export const getSpiritualPosts = async () => {
	const posts = await getCollection('blog', ({ data }) => {
		const requiredCategories = ['philosophy', 'mental-health', 'psychology']
		return requiredCategories.some((category) =>
			data.categories.includes(category)
		)
	})
	return sortByTime(posts)
}

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

export const getInfoPosts = (
	await getCollection('blog', ({ data, slug }) => {
		return slug.startsWith('info/zh/') && data.categories.includes('info')
	})
).sort(
	(a, b) =>
		new Date(b.data.publishDate).valueOf() -
		new Date(a.data.publishDate).valueOf()
)

export const getEnglishInfoPosts = (
	await getCollection('blog', ({ data, slug }) => {
		return slug.startsWith('info/en/') && data.categories.includes('info')
	})
).sort(
	(a, b) =>
		new Date(b.data.publishDate).valueOf() -
		new Date(a.data.publishDate).valueOf()
)

export const getHealthPosts = (
	await getCollection('blog', ({ data }) => {
		return data.categories.includes('health')
	})
).sort(
	(a, b) =>
		new Date(b.data.publishDate).valueOf() -
		new Date(a.data.publishDate).valueOf()
)

export async function getRelationshipPosts() {
	const posts = await getCollection('blog', ({ data, slug }) => {
		return (
			slug.startsWith('relationship/') &&
			data.categories.includes('relationship')
		)
	})
	return sortByTime(posts)
}

export async function getSocialIssuesPosts() {
	const posts = await getCollection('blog', ({ data, slug }) => {
		return (
			slug.startsWith('social-issues/') &&
			data.categories.includes('social-issues')
		)
	})
	return sortByTime(posts)
}
