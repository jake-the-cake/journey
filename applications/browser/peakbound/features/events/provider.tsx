'use client'

import { ReactNode, useEffect, useState } from "react"
import { EventsData } from '@/features/events/data'
import { EventsContext, EventsContextType } from "@/features/events/context"

export function EventsProvider({ children }: { children: ReactNode }) {
	const [eventsData, setEventData] = useState<EventsData>(new EventsData())

	useEffect(() => {
		eventsData.populateData()
		.then((data) => {
			setEventData(new EventsData(data))
		})
		return () => setEventData(new EventsData())
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