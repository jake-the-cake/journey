'use client'

import { ReactNode, useEffect, useRef, useState } from "react"
import { EventsData } from '@/features/events/data'
import { EventsContext } from "@/features/events/context"

export function EventsProvider({ children }: { children: ReactNode }) {
	const [eventsData, setEventData] = useState(new EventsData())

	useEffect(() => {
		eventsData.populateData()
		.then(() => {
			eventsData.isPopulated = true
	 		setEventData(new EventsData(eventsData.data))
		})
	}, [])

	const ctxValue = {
		events: eventsData,
		// update: forceUpdate
	}

	return (
			<EventsContext.Provider value={ ctxValue }>
				{children}
			</EventsContext.Provider>
		)
}