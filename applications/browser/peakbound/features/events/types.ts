export interface EventDataTypeServer {
	_id: string
	start: string
	end: string
	location: string
	title: string
	directions?: string
	description?: string
	attending: any[]
	invited: any[]
}

export interface EventDataType {
	id: string
	startTime: string
	startDate: string
	endTime: string
	endDate: string
	location: string
	title: string
	directions?: string
	description?: string
	attending: any[]
	invited: any[]
}

export interface EventsDataType {
	[key: string]: EventDataType[]
}