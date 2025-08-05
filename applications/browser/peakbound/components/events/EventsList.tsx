'use client'

import { useEffect, useState } from "react"
import { useEvents } from "@/features/events/context"

import MiniCalendar from "@/components/calendar/MiniCalendar"
import Loader from "@/components/Loader"

import { 
	getMonthFromId, 
	getYearFromId
} from "@/lib/datetime/code"
import { MONTH_LABELS } from "@/features/calendar/constants"
import EventsListEvent from "./EventsListEvent"

export default function EventsList() {
	const [eventList, setEventList] = useState<any>([])
	const { events } = useEvents()

	useEffect(() => {
		if (events.isLoaded && eventList.length === 0) {
			const data = events.getAllUpcomingEvents()
			setEventList(data)
		}
	}, [events])

	return (
		<>
		<Loader id='eventslist' loads={['events']} />
		<div className="row-10 flip-col">
			<div className="col-10 f-1">
				{ Object.keys(eventList).length > 0 ? (
					<>
					{ Object.keys(eventList).map(key => (
						<>
							<h3>{ MONTH_LABELS[getMonthFromId(key)! - 1] } { getYearFromId(key) }</h3>
							<div className="event-list card accent">
								{ eventList[key].map((event: any) => (
									<EventsListEvent event={ event }/>
								)) }
							</div>
						</>
					)) }
					</>
				) : (
					'No Data'
				) }
			</div>
			<MiniCalendar />
		</div>
		</>
	)
}