export interface Props {
	title: string
	slug: string
	color: 'green' | 'blue' | 'orange' | 'purple' | 'pink'
	description: string
}

// 定義文章的分類類型
export interface PostCategory {
	categories: string[] // 允許多個分類
}

export type Category = Props

export const categories: Props[] = [
	{
		title: 'Technology',
		slug: 'technology',
		color: 'blue',
		description:
			'Keep up with the latest tech trends and learn about the latest innovations in software development, hardware design, cybersecurity, and more.',
	},
	{
		title: 'Philosophy',
		slug: 'philosophy',
		color: 'green',
		description: '一些真相',
	},
	{
		title: 'Lifestyle',
		slug: 'lifestyle',
		color: 'orange',
		description:
			'Explore the latest trends and ideas in fashion, food, home design, and more, and get inspiration for living your best life.',
	},
	{
		title: 'Personal',
		slug: 'personal',
		color: 'green',
		description:
			'Discover tips and strategies for self-improvement, personal development, and achieving your goals, and find resources to help you grow as a person.',
	},
	{
		title: 'Travel',
		slug: 'travel',
		color: 'pink',
		description:
			'Plan your next adventure and get travel tips and inspiration from experienced travelers, with articles covering destinations, cultures, and more.',
	},
	{
		title: 'Design',
		slug: 'design',
		color: 'purple',
		description:
			'Get insights and inspiration from the world of design, with articles covering graphic design, product design, interior design, and more.',
	},
	{
		title: 'Business',
		slug: 'business',
		color: 'blue',
		description:
			'Insights on entrepreneurship, market trends, and business strategies to help you navigate the corporate world.',
	},
	{
		title: 'Science',
		slug: 'science',
		color: 'purple',
		description:
			'Explore the wonders of the universe, from the latest scientific breakthroughs to the fundamental principles that govern our world.',
	},
	{
		title: 'Health',
		slug: 'health',
		color: 'green',
		description:
			'Your guide to a healthier life, with tips on nutrition, fitness, mental wellness, and building sustainable habits.',
	},
	{
		title: 'Art & Culture',
		slug: 'art-culture',
		color: 'pink',
		description:
			'Immerse yourself in the world of art and culture, exploring everything from classical masterpieces to contemporary creative movements.',
	},
]
