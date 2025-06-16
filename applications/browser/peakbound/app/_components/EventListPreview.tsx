'use client'

import Link from "next/link"
import MoreInfo from "../svg/MoreInfo"
import { CalendarDateDataType } from "@/features/calendar/types"
import { MONTH_LABELS_SHORT } from "@/features/calendar/constants"
import { useEvents } from "@/features/events/context"
import { getDateFromId, getMonthFromId, getYearFromId } from "@/lib/datetime/code"

export default function EventListPreview() {
	const { events } = useEvents()
	const data = Object.entries(events.data)
	return (
		<div id='event-preview-list'>
			<div className="event-filter">
				Next 2 Weeks
			</div>
			<div className="event-item-list">
				{
					data.length > 0 ? (<>
						{ data.map(([k, v]: any) => (
							v.map((d: any) => 
								<div className="event-item" id={ d.id } key={ d.id }>
									<div className="event-date">
										<div className="month">{ MONTH_LABELS_SHORT[getMonthFromId(d.startDate)! - 1] }</div>
										<div className="date">{ getDateFromId(d.startDate) }</div>
										<div className="year">{ getYearFromId(d.startDate) }</div>
											</div>
									<div className="event-details">
										<div className="event-title">{ d.title }</div>
										<div className="event-location">{ d.location }</div>
									</div>
									<div className="event-link">
										<Link href="/">
											<MoreInfo color="secondary" />
											<span className="text-c">Info</span>
										</Link>
									</div>
								</div>
							)
						)) }
					</>) : <div className="event-item none p10">No Events Found</div> 
				}

			</div>
			<Link href="schedule" className="event-link-normal text-c">View The Full Schedule</Link>
		</div>
	)
}