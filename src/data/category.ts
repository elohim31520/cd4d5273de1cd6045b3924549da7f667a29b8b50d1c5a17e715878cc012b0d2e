export interface Props {
	title: string
	slug: string
	color: string
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
		color: 'cyan',
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
		color: 'purple',
	},
	{
		title: 'Health',
		slug: 'health',
		color: 'yellow',
	},
	{
		title: 'Art & Culture',
		slug: 'art-culture',
		color: 'pink',
	},
]
