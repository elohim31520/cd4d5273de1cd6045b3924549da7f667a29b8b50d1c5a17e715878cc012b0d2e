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
		name: 'Grok',
		slug: 'grok',
		image: aimage,
		bio: '由 X AI 開發的大型語言模型。',
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
	{
		name: 'Dr. Tara Swart',
		slug: 'tara-swart',
		image: aimage,
		bio: '神經科學家、精神科醫師與作家，專注於研究大腦優化、心智潛能與身心連結。',
	},
	{
		name: 'Tali Sharot',
		slug: 'tali',
		image: aimage,
		bio: '認知神經科學家，專注於研究人類的樂觀偏見、情感與決策之間的關係。',
	},
	{
		name: 'David Pinsof',
		slug: 'david-pinsof',
		image: aimage,
		bio: 'David Pinsof 是一位專注於臨床和研究的心理學家，他的工作核心是將科學和心理學療法結合，以提升心理治療的效果。',
	},
	{
		name: 'Mohnish Pabrai',
		slug: 'mohnish-pabrai',
		image: aimage,
		bio: 'Mohnish Pabrai是一位印度裔美籍的價值投資者、慈善家，同時也是Pabrai Investment Funds的創辦人。',
	},
	{
		name: 'Salim Ismail',
		slug: 'salim-ismail',
		image: aimage,
		bio: 'Salim Ismail 是一位企業家、投資者和作家，他專注於研究技術創新、商業模式和組織變革。',
	},
	{
		name: 'Lisa Feldman Barrett',
		slug: 'lisa-feldman-barrett',
		image: aimage,
		bio: 'Lisa Feldman Barrett是一位美國心理學家，她的研究核心挑戰了關於情緒是普世且內建反應的傳統觀點，認為情緒是大腦根據個人經驗和當下情境所「建構」出來的',
	},
	{
		name: 'Dr. Alan Goldhammer',
		slug: 'alan-goldhammer',
		image: aimage,
		bio: 'Dr. Alan Goldhammer是一位美國醫師，他專注於研究慢性疾病和逆轉慢性疾病的療法。',
	},
	{
		name: 'Roman Yampolskiy',
		slug: 'roman-yampolskiy',
		image: aimage,
		bio: 'Roman Yampolskiy是一位烏克蘭裔美國計算機科學家，以研究人工智能安全、偏見和超智能體控制而聞名。',
	},
	{
		name: 'James Sexton',
		slug: 'james-sexton',
		image: aimage,
		bio: 'James Sexton是一位紐約的家庭法律師，以專精於離婚案件，以及其幽默、直率且非傳統的行事風格而聞名。',
	},
	{
		name: 'Paul Brunson',
		slug: 'paul-brunson',
		image: aimage,
		bio: 'Paul Brunson 是一位屢獲殊榮的企業家、婚姻與關係專家，以主持電視節目《Married at First Sight》（在英國和美國播出）和《Celebs Go Dating》而聞名。',
	},
	{
		name: 'Brian Johnson',
		slug: 'brian-johnson',
		image: aimage,
		bio: 'Brian Johnson是一位美國企業家，透過嚴格的科學方法與生活紀律，致力於延緩人類老化。',
	},
	{
		name: 'Dr. Robert Lustig',
		slug: 'robert-lustig',
		image: aimage,
		bio: 'Dr. Robert Lustig 是「糖是有毒物質，是導致全球代謝性疾病和肥胖的主要元兇」這一觀點的權威倡導者。',
	},
]
