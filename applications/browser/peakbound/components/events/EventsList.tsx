'use client'

import { useEvents } from "@/features/events/context"
import MiniCalendar from "../calendar/MiniCalendar"
import { useEffect, useState } from "react"
import { MONTH_LABELS } from "@/features/calendar/constants"
import { getMonthFromId, getTimeFromCode, getYearFromId } from "@/lib/datetime/code"
import Loader from "../Loader"

export default function EventsList() {
	const [ eventList, setEventList] = useState<any>([])
	const { events } = useEvents()

	console.log(eventList)

	useEffect(() => {
		if (events.isLoaded && eventList.length === 0) {
			const data = events.getAllUpcomingEvents()
			console.log(data)
			setEventList(data)
		}
	}, [events])

	function formatTime(time: string): string {
		return getTimeFromCode(time, 'h:m', 12, 'lower')
	}

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
									<div key={ event.id } className="event-item">
										<h4>{ event.title }</h4>
										<p>{ event.description }</p>
										<p><strong>Date: </strong> 
											{ event.startDate + ' @ ' + formatTime(event.startTime) } - {( event.startDate !== event.endDate ? event.endDate + ' @ ' : '' ) + formatTime(event.endTime) }
										</p>
										{ event.location && <p><strong>Location:</strong> { event.location }</p> }
										{ event.directions && <p><strong>Directions:</strong> { event.directions }</p> }
									</div>
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