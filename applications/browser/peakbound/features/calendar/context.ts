'use client'

import { createContext, useContext } from 'react'
import { CalendarDataType } from './types'

type CalendarContextType = {
	// events: EventData[]
	calendar: CalendarDataType
	changeCurrentCalendar: (name: string, args?: number[]) => void
}

/**
 * Context for managing calendar state and actions.
 * Provides methods to navigate between months and access calendar data.
 */
export const CalendarContext = createContext<CalendarContextType | null>(null)

/**
 * Custom hook to access the calendar context.
 * Throws an error if used outside of CalendarProvider.
 */
export function useCalendar() {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('useCalendar must be used within CalendarProvider')
  return ctx
}