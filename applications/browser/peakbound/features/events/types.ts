// export interface EventDataTypeServer {
// 	_id: string
// 	start: string
// 	end: string
// 	location: string
// 	title: string
// 	host: string
// 	directions?: string
// 	description?: string
// 	attending: any[]
// 	invited: any[]
// }

export interface EventDataType {
	id: string
	start: string
	// startDate: string
	end: string
	// endDate: string
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