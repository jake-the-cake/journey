'use client'

import { ReactNode, useEffect, useRef, useState } from "react"
import { publicCalendar } from "./read"
import { CalendarContext } from "@/features/calendar/context"
import { CalendarData } from "@/features/calendar/preload"

export function CalendarProvider({ children }: { children: ReactNode }) {
	const [context, setContext] = useState<any>({})
	useEffect(() => {
		publicCalendar().then(data => {
			const calendar = useRef<CalendarData | null>(data)
			calendar.current!.changeCurrentCalendar = changeCurrentCalendar
			setContext((prev: any) => ({ ...prev, calendar }))
		})
	}, [])

	function changeCurrentCalendar(name: string, args: number[] = []) {
		return function() {
			if (!context.calendar)	throw new Error('Calendar data is not loaded yet')
			if (Object.keys(context.calendar).includes(name)) {
				context.calendar[name](...args)
			} 
			else throw new Error(`Function ${ name } does not exist on CalendarData`)
		}
	}
  
	// const nextMonth = () => {
	// 	ref.current.nextMonth()
	// 	forceUpdate()
  // }

  // const prevMonth = () => {
	// 	ref.current.prevMonth()
	// 	forceUpdate()
  // }
	
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

	// Create a context value with the calendar data and navigation methods
	// const ctxValue: CalendarContextType = {
	// 	calendar: ref as any,
	// 	changeCurrentCalendar
	// }

	// Provide the context value to children components
	return (
			<CalendarContext.Provider value={ context }>
				{children}
			</CalendarContext.Provider>
		)
}