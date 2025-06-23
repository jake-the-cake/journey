import { createDateId, getDateAndTimeFromCode } from "@/lib/datetime/code"
import { EventDataType, EventsDataType, EventDataTypeServer } from "./types"

class EventsData {
	data: EventsDataType
	isPopulated: boolean

	constructor(data: EventsDataType | {} = {}) {
		this.data = data as EventsDataType
		this.isPopulated = false
	}
	
	async populateData(): Promise<EventsDataType> {
		if (!this.isPopulated) {
			this.data = {}
			const response = await fetch('http://localhost:8000/events')
			if (!response.ok) {
				throw new Error('Failed to fetch events data')
			}
			const events = await response.json()
			events.forEach((event: EventDataTypeServer) => {
				const e: EventDataType = this.parseEventFromServer(event)
				if (!this.data[e.startDate]) this.data[e.startDate] = []
				this.data[e.startDate].push(e)
			})
			return this.data 
		} else {
			return Promise.resolve(this.data)
		}
	}

	parseEventFromServer(event: EventDataTypeServer): EventDataType {
		const [startDate, startTime] = getDateAndTimeFromCode(event.start)
		const [endDate, endTime] = getDateAndTimeFromCode(event.end)
		const { attending, invited, title, location, description, directions } = event
		return {
			id: event._id,
			attending,
			invited,
			startDate,
			startTime,
			endDate,
			endTime,
			title,
			location,
			description,
			directions
		}
	}

	getDataByNumLastDays(days: number): EventDataType[] {
		const events: EventDataType[] = []
		const today = new Date()
		const start = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000))
		const startId = createDateId({ year: start.getFullYear(), month: start.getMonth() + 1, date: start.getDate() })
		const endId = createDateId({ year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate() })
		Object.entries(this.data).filter(([key]) => key >= startId && key <= endId).forEach(value => events.push(...value[1]))
		return events
	}
}

export { EventsData }