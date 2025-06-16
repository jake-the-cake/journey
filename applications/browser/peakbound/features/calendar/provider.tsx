'use client'

import { ReactNode, useRef, useState } from "react"
import { CalendarData } from "./data"
import { CalendarContext } from "@/features/calendar/context"
import { createMonthId, getMonthFromId, getYearFromId } from "@/lib/datetime/code"

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
	
	const prevYear = () => {
		calendarRef.current.goToPrevYear()
		forceUpdate()
	}

	const nextYear = () => {
		calendarRef.current.goToNextYear()
		forceUpdate()
	}
	
	const goToMonth = (e: any) => {
		const year = getYearFromId(calendarRef.current.current)
		calendarRef.current.switchMonth(createMonthId({ year, month: Number(e.target.value) }))
		forceUpdate()
	}
	
	const goToYear = (e: any) => {
		const month = getMonthFromId(calendarRef.current.current)
		calendarRef.current.switchMonth(createMonthId({ year: e.target.value, month }))
		console.log(calendarRef.current.current)
		forceUpdate()
	}

	const ctxValue = {
		calendar: calendarRef.current,
		nextMonth,
		prevMonth,
		prevYear,
		nextYear,
		goToMonth,
		goToYear
	}

	return (
			<CalendarContext.Provider value={ ctxValue }>
				{children}
			</CalendarContext.Provider>
		)
}