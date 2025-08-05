import { createDateId, getDateAndTimeFromCode, getMonthIdFromDateId } from "@/lib/datetime/code"
import { EventDataType, EventsDataType } from "./types"

type EventsByMonthDataType = Record<string, EventDataType[]>

class EventsData {
	data: EventsDataType
	isLoaded: boolean


	constructor(data: EventsDataType | {} = {}) {
		this.data = data as EventsDataType
		this.isLoaded = false
	}
	
	async populateData(): Promise<EventsDataType> {
		if (!this.isLoaded) {
			this.data = {}
			const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + '/events')
			if (!response.ok) {
				throw new Error('Failed to fetch events data')
			}
			const events = await response.json()
			events.forEach((event: EventDataType) => {
				// const e: EventDataType = this.parseEventFromServer(event)
				if (!this.data[event.start]) this.data[event.start] = []
				this.data[event.start].push(event)
			})
			return this.data 
		} else {
			return Promise.resolve(this.data)
		}
	}

	// parseEventFromServer(event: EventDataType): EventDataType {
	// 	const [startDate, startTime] = getDateAndTimeFromCode(event.start)
	// 	const [endDate, endTime] = getDateAndTimeFromCode(event.end)
	// 	const { attending, invited, title, host, location, description, directions } = event
	// 	return {
	// 		id: event.id,
	// 		attending,
	// 		invited,
	// 		start: event.start,
	// 		end: event.end,
	// 		title,
	// 		host,
	// 		location,
	// 		description,
	// 		directions
	// 	}
	// }

	getAllUpcomingEvents(): EventsByMonthDataType {
		this.isLoaded = false
		const today = new Date()
		const dateId = createDateId({
			year: today.getFullYear(),
			month: today.getMonth() + 1,
			date: today.getDate()
		})
		const data: EventsByMonthDataType = {}
		const query = Object.keys(this.data).filter(key => key >= dateId)
		query.forEach(q => {
			const monthId = getMonthIdFromDateId(q)
			if (!data[monthId])data[monthId] = []
			data[monthId].push(...this.data[q])
		})
		this.isLoaded = true
		return data
	}

	getDataByNumLastDays(days: number): EventDataType[] {
		const events: EventDataType[] = []
		const today = new Date()
		const start = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000))
		const startId = createDateId({ year: start.getFullYear(), month: start.getMonth() + 1, date: start.getDate() })
		const endId = createDateId({ year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate() })
		Object.entries(this.data).filter(([key]) => key >= startId && key <= endId).forEach(value => events.push(...value[1]))
		return [...events]
	}

	getDataByNumDays(days: number, direction: string = 'next'): EventDataType[] {
		if (direction === 'next') return this.getDataByNumNextDays(days)
		else return this.getDataByNumLastDays(days)
	}

	getDataByNumNextDays(days: number): EventDataType[] {
		const events: EventDataType[] = []
		const today = new Date()
		const end = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000))
		const startId = createDateId({ year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate() })
		const endId = createDateId({ year: end.getFullYear(), month: end.getMonth() + 1, date: end.getDate() })
		Object.entries(this.data).filter(([key]) => key >= startId && key <= endId).forEach(value => events.push(...value[1]))
		return [...events]
	}

	getDataByMonth(monthId: string): EventDataType[] {
		const events: EventDataType[] = []
		Object.entries(this.data).filter(([key]) => key.startsWith(monthId)).forEach(value => events.push(...value[1]))
		return [...events]
	}

	getDataById(id: string): EventDataType | null {
		for (const monthId in this.data) {
			const events = this.data[monthId]
			const event = events.find(event => event.id === id)
			if (event) return event
		}
		return null
	}
}

export { EventsData }