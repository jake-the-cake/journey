// export type CalendarLabelSizeOptions = 'long' | 'short'

export interface CalendarDateDataType {
	id: string
	year: number
	month: number
	date: number
	day: number
	weekdayLabel: string
	weekdayLabelShort: string
}

export interface CalendarMonthDataType {
	id: string
	year: number
	month: number
	dayCount: number
	monthLabel: string
	monthLabelShort: string
	startDay: number
	endDay: number
	dates: CalendarDateDataType[]
}

export interface CalendarYearDataType {
	[key: string]: CalendarMonthDataType
}

export interface CalendarDataType {
	[key: string]: CalendarYearDataType
}

export interface MonthLabelsType {
	monthLabel: string
	monthLabelShort: string
}

export interface DateCodeType {
	year: number | null
	month: number | null
	date?: number | null
}

export interface CurrentDateDataType {
	year: number | null
	month: CalendarMonthDataType | null,
	date: CalendarDateDataType | null
}