export interface CalendarDayData {
  dayNumber: number
  dayOfWeek: number
  month: number
  year: number
  events: any[]
	isInactive: boolean
}

export type CalendarSizeOptions = 'full' | 'med' | 'mini'

export interface CalendarRowProps {
  data: CalendarDayData[]
  size?: CalendarSizeOptions
}