export type LabelTheme =
	| 'green'
	| 'blue'
	| 'orange'
	| 'purple'
	| 'pink'
	| 'red'
	| 'yellow'

export interface Props {
	title: string
	slug: string
	color: LabelTheme
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
	},
	{
		title: 'Finance',
		slug: 'finance',
		color: 'green',
	},
	{
		title: 'Philosophy',
		slug: 'philosophy',
		color: 'green',
	},
	{
		title: 'Lifestyle',
		slug: 'lifestyle',
		color: 'orange',
	},
	{
		title: 'Personal',
		slug: 'personal',
		color: 'orange',
	},
	{
		title: 'Travel',
		slug: 'travel',
		color: 'pink',
	},
	{
		title: 'Design',
		slug: 'design',
		color: 'purple',
	},
	{
		title: 'Business',
		slug: 'business',
		color: 'blue',
	},
	{
		title: 'Science',
		slug: 'science',
		color: 'yellow',
	},
	{
		title: 'Health',
		slug: 'health',
		color: 'orange',
	},
	{
		title: 'Art & Culture',
		slug: 'art-culture',
		color: 'pink',
	},
	{
		title: 'Mental Health',
		slug: 'mental-health',
		color: 'pink',
	},
	{
		title: 'Culture',
		slug: 'culture',
		color: 'orange',
	},
	{
		title: 'Psychology',
		slug: 'psychology',
		color: 'purple',
	},
	{
		title: 'Crypto',
		slug: 'crypto',
		color: 'blue',
	},
	{
		title: 'Investment',
		slug: 'investment',
		color: 'blue',
	},
	{
		title: 'AI',
		slug: 'ai',
		color: 'red',
	},
	{
		title: 'Neuroscience',
		slug: 'neuroscience',
		color: 'red',
	},
	{
		title: 'Info',
		slug: 'info',
		color: 'orange',
	},
]
