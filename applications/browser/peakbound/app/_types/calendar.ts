export interface CalendarDayData {
  dayNumber: number | string
  eventCount: number
  dayOfWeek: number
  month: number
  year: number
}

export type CalendarSizeOptions = 'full' | 'med' | 'mini'

export interface CalendarRowProps {
  data: CalendarDayData[]
  size?: CalendarSizeOptions
}