'use client'

import { notFound, useParams } from "next/navigation"
import Loader from "@/components/Loader"
import { useEvents } from "@/features/events/context"
import { EventDataType } from "@/features/events/types"
import { DateTool } from "@/lib/datetime/date"
import { getDateAndTimeFromCode } from "@/lib/datetime/code"

export default function EventPage() {
	const params: { slug: string } = useParams()
	const { events } = useEvents()
	const event: EventDataType | null = events.getDataByParam('slug', params.slug)
	if (events.isLoaded && !event) { notFound() }
	const [startDate, startTime] = getDateAndTimeFromCode(event?.start ?? '00000000:0000')
	const [endDate, endTime] = getDateAndTimeFromCode(event?.end ?? '00000000:0000')
	const eventStartDate = new DateTool(startDate)
	const eventEndDate = new DateTool(endDate)
	const dateOptions = {
		format: 'w, m d, y'
	}
	return (
		<main>
			<section>
				<Loader id='eventpageloader' loads={ ['events'] } />
				{ events.isLoaded && event && (
					<div className="col-10 event-page">
						<div className="col">
							<h1 className="text-c">{ event.title }</h1>
							<span className="text-c italic text-sm">Hosted by { event?.host ?? 'No one, it seems...' }</span>
							<p className="mt-10 card m-auto accent">{ event?.description ?? 'No description' }</p>
						</div>
						<div className="row-10 row-c">
							<h3>Date:</h3>
							<span>
								{ eventStartDate.getFullDate(dateOptions) }
								{ 
									eventStartDate !== eventEndDate 
									&& ' - ' + eventEndDate.getFullDate(dateOptions) 
								}
							</span>
						</div>
						<div className="row-10 row-c">
							<h3>Starts At:</h3>
							<span>{ event.start }</span>
						</div>
						<button className="m-auto primary">Add To Your Calendar</button>
						<div className="row-10 row-c">
							<h3>Location:</h3>
							<span>{ event.location }</span>
						</div>
						<div className="row-10 row-c">
							<h3>Directions:</h3>
							<span>{ event.directions ?? 'Not Provided' }</span>
						</div>
					</div>
			 ) }
			</section>
		</main>
	)
}