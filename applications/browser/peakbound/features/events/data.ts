import { getDateAndTimeFromCode } from "@/lib/datetime/code"
import { EventDataType, EventsDataType, EventDataTypeServer } from "./types"

class EventsData {
	data: EventsDataType
	isPopulated: boolean

	constructor(data: EventsDataType | {} = {}) {
		this.data = data as EventsDataType
		this.isPopulated = false
	}
	
	async populateData(): Promise<EventsDataType> {
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
}

export { EventsData }