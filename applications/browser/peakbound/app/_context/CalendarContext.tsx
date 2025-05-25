// context/CalendarContext.tsx
'use client'

import { createContext, useContext, useState, useRef, ReactNode } from 'react'
import { CalendarData } from '../_data/calendar'

type CalendarContextType = {
  cal: CalendarData
  nextMonth: () => void
  prevMonth: () => void
}

const CalendarContext = createContext<CalendarContextType | null>(null)

export function useCalendar() {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('useCalendar must be used within CalendarProvider')
  return ctx
}

export function CalendarProvider({ children }: { children: ReactNode }) {
  const calRef = useRef(new CalendarData())
  const [, update] = useState(0)
  const forceUpdate = () => update(n => n + 1)

  const nextMonth = () => {
    calRef.current.nextMonth()
    forceUpdate()
  }

  const prevMonth = () => {
    calRef.current.prevMonth()
    forceUpdate()
  }

  return (
    <CalendarContext.Provider value={{ cal: calRef.current, nextMonth, prevMonth }}>
      {children}
    </CalendarContext.Provider>
  )
}