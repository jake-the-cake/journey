import Link from "next/link"
import { EventDataType } from "@/features/events/types"
import { getDateAndTimeFromCode, getTimeFromCode } from "@/lib/datetime/code"

interface IEventsListEvent {
	event: EventDataType
}

function formatTime(time: string): string {
	return getTimeFromCode(time, 'h:m', 12, 'lower')
}

export default function EventsListEvent({ event }: IEventsListEvent) {
	const [startDate, startTime] = getDateAndTimeFromCode(event.start)
	const [endDate, endTime] = getDateAndTimeFromCode(event.end)

	return (
		<div key={ event.id } className="event-item">
			<h4>{ event.title }</h4>
			<p>{ event.description || <>Click <Link href={ `/events/${ event.slug }` }>Here</Link> for more info.</> }</p>
			<p>
				<strong>Date: </strong> 
				{ startDate + ' @ ' + formatTime(startTime) } - {( startDate !== endDate ? endDate + ' @ ' : '' ) + formatTime(endTime) }
			</p>
			{ event.location && <p><strong>Location:</strong> { event.location }</p> }
			{ event.directions && <p><strong>Directions:</strong> { event.directions }</p> }
		</div>				
	)
}