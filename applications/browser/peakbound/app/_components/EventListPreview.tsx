'use client'

import Link from "next/link";
import { useCalendar } from "../_context/CalendarContext";

export default function EventListPreview() {
	const { cal } = useCalendar()
	const data = cal.getEventsByRange('20260101','20260131')
	return (
		<div id='event-preview-list'>
			<div className="event-filter">
				Next 2 Weeks
			</div>
			<div className="event-item-list">
				{
					data.length > 0 ? (<>
						{ data.map(([key, value]) => (
							<div className="event-item" id={ key } key={ key }>
								<div className="event-title">This event</div>
								<div className="event-date">{ value.dayNumber} { value.month }, { value.year}</div>
								<div className="event-location">This location</div>
								<div className="event-link"><Link href="/">See More Info</Link></div>
							</div>
						)) }
					</>) : <div className="event-item">No Events Found</div> 
				}

			</div>
			<Link href="schedule" className="box-link">Click Here To View The Full Schedule</Link>
		</div>
	)
}