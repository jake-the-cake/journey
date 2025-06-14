'use client'

import Link from "next/link"
import MoreInfo from "../svg/MoreInfo"
import { useCalendar } from "@/features/calendar/context"
import { CalendarDateDataType } from "@/features/calendar/types"
import { MONTH_LABELS_SHORT } from "@/features/calendar/constants"

export default function EventListPreview() {
	const { calendar } = useCalendar()
	const data = (calendar as any)?.currentMonth().dates ?? []
	return (
		<div id='event-preview-list'>
			<div className="event-filter">
				Next 2 Weeks
			</div>
			<div className="event-item-list">
				{
					data.length > 0 ? (<>
						{ data.map((d: CalendarDateDataType) => (
							<div className="event-item" id={ d.id } key={ d.id }>
								<div className="event-date">
									<div className="month">{ MONTH_LABELS_SHORT[d.month - 1] }</div>
									<div className="date">{ d.date }</div>
									<div className="year">{ d.year }</div>
									  </div>
								<div className="event-details">
									<div className="event-title">n/a</div>
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
					</>) : <div className="event-item none p10">No Events Found</div> 
				}

			</div>
			<Link href="schedule" className="event-link-normal text-c">View The Full Schedule</Link>
		</div>
	)
}