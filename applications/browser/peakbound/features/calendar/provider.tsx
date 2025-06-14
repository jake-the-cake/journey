'use client'

import { ReactNode, useRef, useState } from "react"
import { CalendarData } from "./data"
import { CalendarContext } from "@/features/calendar/context"

export function CalendarProvider({ children }: { children: ReactNode }) {
  const calendarRef = useRef<CalendarData>(new CalendarData())
  const [, setVersion] = useState(0)
  const forceUpdate = () => setVersion(v => v + 1)

	const prevMonth = () => {
		calendarRef.current.goToPrevMonth()
		forceUpdate()
	}

  const nextMonth = () => {
    calendarRef.current.goToNextMonth()
    forceUpdate()
  }

	
	// const nextYear = () => {
	// 	ref.current.nextYear()
	// 	forceUpdate()
	// }
	
	// const prevYear = () => {
	// 	ref.current.prevYear()
	// 	forceUpdate()
	// }
	
	// const gotoMonth = (month: number, year?: number) => {
	// 	ref.current.gotoMonth(month, year)
	// 	forceUpdate()
	// }
	
	// const gotoYear = (year: number) => {
	// 	ref.current.gotoYear(year)
	// 	forceUpdate()
	// }

	const ctxValue = {
		calendar: calendarRef.current,
		nextMonth,
		prevMonth
	}

	return (
			<CalendarContext.Provider value={ ctxValue }>
				{children}
			</CalendarContext.Provider>
		)
}