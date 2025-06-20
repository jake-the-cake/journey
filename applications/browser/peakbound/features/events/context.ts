'use client'

import { createContext, useContext } from 'react'
import { EventsData } from './data'

export type EventsContextType = {
	events: EventsData
}

export const EventsContext = createContext<EventsContextType | null>(null)

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used within EventsProvider')
  return ctx
}