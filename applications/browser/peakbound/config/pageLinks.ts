import { LinkDataType } from "@/lib/types";

const pages: { [key: string]: LinkDataType} = {
	events: {
		href: '/events',
		label: 'Events'
	},
	programs: {
		href: '/programs',
		label: 'Programs'
	},
	media: {
		href: '/media',
		label: 'Media'
	},
	info: {
		href: '/info',
		label: 'Info'
	},
	support: {
		href: '/support',
		label: 'Support'
	}
}

function getLinks(...links: string[]): LinkDataType[] {
	const query: LinkDataType[] = []
	links.forEach(link => {
		if (link in pages) {
			query.push(pages[link])
		} 
		else {
			throw new Error(`Link "${ link }" does not exist in the links configuration.`)
		}
	})
	return query
}

export { getLinks }