export interface CalendarDayData {
  dayNumber: number
  dayOfWeek: number
  month: number
  year: number
  events: any[]
}

export type CalendarSizeOptions = 'full' | 'med' | 'mini'

export interface CalendarRowProps {
  data: CalendarDayData[]
  size?: CalendarSizeOptions
}