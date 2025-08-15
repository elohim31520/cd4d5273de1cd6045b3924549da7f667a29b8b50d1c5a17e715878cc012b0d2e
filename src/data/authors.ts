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
		name: 'Dr. K',
		slug: 'dr-k',
		image: aimage,
		bio: 'HealthyGamerGG 的共同創辦人，專注於解決遊戲玩家和年輕人的心理健康問題。',
	},
	{
		name: 'Naval Ravikant',
		slug: 'naval-ravikant',
		image: aimage,
		bio: 'AngelList 的共同創辦人，知名的企業家與投資人，以其關於財富、幸福和人生哲學的深刻見解而聞名。',
	},
	{
		name: 'Morgan Housel',
		slug: 'morgan-housel',
		image: aimage,
		bio: 'The Collaborative Fund 的合夥人，著有《致富心態》（The Psychology of Money），專長於行為金融學和投資心理學。',
	},
	{
		name: 'Cathie Wood',
		slug: 'cathie-wood',
		image: aimage,
		bio: '方舟投資（ARK Invest）的創辦人、執行長兼投資長，以專注於投資顛覆性創新技術而聞名。',
	},
	{
		name: 'Gelang Tupton',
		slug: 'gelang-tupton',
		image: aimage,
		bio: '一位在喜馬拉雅山區接受嚴格訓練的藏傳佛教僧侶，致力於將古老的智慧與現代生活相結合，幫助人們應對壓力、焦慮和憂鬱。',
	},
	{
		name: 'Donald Hoffman',
		slug: 'donald-hoffman',
		image: aimage,
		bio: '加州大學爾灣分校的認知科學家，以其「介面理論」聞名，挑戰了我們對現實和意識的傳統理解。',
	},
	{
		name: 'Mo Gawdat',
		slug: 'mo-gawdat',
		image: aimage,
		bio: '前 Google X 的商務長，著有《解開你腦中幸福的方程式》，致力於研究幸福和人工智慧的未來。',
	},
	{
		name: 'Raoul Pal',
		slug: 'raoul-pal',
		image: aimage,
		bio: '金融分析師和投資策略師，Real Vision 的共同創辦人，專注於宏觀經濟和加密貨幣領域。',
	},
	{
		name: 'Andrew Huberman',
		slug: 'huberman',
		image: aimage,
		bio: '史丹佛大學的神经科學家和教授，以其主持的 Huberman Lab 播客而聞名，致力於向公眾普及神經科學知識。',
	},
	{
		name: 'Dr. Rhonda Patrick',
		slug: 'rhonda-patrick',
		image: aimage,
		bio: '擁有生物醫學博士學位的科學家，專注於營養、衰老和健康長壽的研究，以其主持的 FoundMyFitness 播客而聞名。',
	},
	{
		name: 'Gemini',
		slug: 'gemini',
		image: aimage,
		bio: '由 Google 開發的大型語言模型。',
	},
	{
		name: 'Alex Hormozi',
		slug: 'alex-hormozi',
		image: aimage,
		bio: '企業家、投資者和作家，以其在業務擴展和收購方面的專業知識而聞名，著有《$100M Offers》。',
	},
	{
		name: 'DR. Courtney',
		slug: 'dr-courtney',
		image: aimage,
		bio: '物理治療師和足部健康專家，專注於功能性鞋履和足部生物力學，致力於幫助人們改善足部健康和整體運動表現。',
	},
	{
		name: 'Dr. Anna Machin',
		slug: 'anna-machin',
		image: aimage,
		bio: '演化人類學家，專注於研究人類的愛情、親密關係和友誼的科學。',
	},
]
