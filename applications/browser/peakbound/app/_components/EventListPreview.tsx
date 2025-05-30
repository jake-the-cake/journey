'use client'

import Link from "next/link"
import { useCalendar } from "../_context/CalendarContext"
import { getMonthString } from "../_constants/calendar"
import MoreInfo from "../svg/MoreInfo"

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
								<div className="event-date">
									<div className="month">{ getMonthString(value.month, 'mini') }</div>
									<div className="day">{ value.dayNumber }</div>
									<div className="year">{ value.year }</div>
									  </div>
								<div className="event-details">
									<div className="event-title">{ value.events[0].name }</div>
									<div className="event-location">This location</div>
								</div>
								<div className="event-link">
									<Link href="/">
										<MoreInfo color="secondary" />
										<span className="text-c">Info</span>
									</Link>
								</div>
							</div>
						)) }
					</>) : <div className="event-item">No Events Found</div> 
				}

			</div>
			<Link href="schedule" className="event-link-normal text-c">View The Full Schedule</Link>
		</div>
	)
}