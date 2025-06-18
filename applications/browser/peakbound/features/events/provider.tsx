'use client'

import { ReactNode, useEffect, useState } from "react"
import { EventsData } from '@/features/events/data'
import { EventsContext } from "@/features/events/context"

export function EventsProvider({ children }: { children: ReactNode }) {
	const [eventsData, setEventData] = useState(new EventsData())

	useEffect(() => {
		eventsData.populateData()
		.then(() => {
			const event = new EventsData(eventsData.data)
			event.isPopulated = true
			setEventData(event)
		})
		return () => setEventData(new EventsData())
	}, [])

	const ctxValue = {
		events: eventsData,
	}

	return (
			<EventsContext.Provider value={ ctxValue }>
				{children}
			</EventsContext.Provider>
		)
}