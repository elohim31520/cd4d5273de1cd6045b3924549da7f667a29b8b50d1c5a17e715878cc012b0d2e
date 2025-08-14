import type { ImageMetadata } from 'astro'
import aimage from '../assets/authors/00020-1353009138.png'

export interface Props {
	name: string
	slug: string
	image: ImageMetadata
	bio: string
}

export type Author = Props

export const authors: Props[] = [
	{
		name: 'Lewis',
		slug: 'lewis',
		image: aimage,
		bio: '秉持斯多葛哲學，追求理性與自由。',
	},
]
