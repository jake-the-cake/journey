'use client'

import { ReactNode, useEffect, useState } from "react"
import { EventsData } from '@/features/events/data'
import { EventsContext, EventsContextType } from "@/features/events/context"

export function EventsProvider({ children }: { children: ReactNode }) {
	const [eventsData, setEventsData] = useState<EventsData>(new EventsData())

	useEffect(() => {
		eventsData.populateData()
		.then((data) => {
			const events = new EventsData(data)
			events.isLoaded = true
			setEventsData(events)
		})
		return () => setEventsData(new EventsData())
	}, [])

	const ctxValue: EventsContextType = {
		events: eventsData,
	}

	return (
			<EventsContext.Provider value={ ctxValue }>
				{children}
			</EventsContext.Provider>
		)
}