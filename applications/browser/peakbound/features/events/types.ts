export interface EventDataType {
	id: string
	slug: string
	start: string
	end: string
	location: string
	title: string
	host: string
	directions?: string
	description?: string
	attending: any[]
	invited: any[]
}

export interface EventsDataType {
	[key: string]: EventDataType[]
}