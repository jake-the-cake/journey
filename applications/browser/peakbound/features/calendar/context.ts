'use client'

import { createContext, useContext } from 'react'
import { CalendarData } from './data'

type CalendarContextType = {
	calendar: CalendarData
	nextMonth: () => void
	prevMonth: () => void
	nextYear: () => void
	prevYear: () => void
	goToMonth: (e: any) => void
	goToYear: (e: any) => void
}

export const CalendarContext = createContext<CalendarContextType | null>(null)

export function useCalendar() {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('useCalendar must be used within CalendarProvider')
  return ctx
}