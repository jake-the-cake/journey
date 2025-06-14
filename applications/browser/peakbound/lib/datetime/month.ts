import { createDateId, getNextMonthIdFromId, getPrevMonthIdFromId, getYearAndMonthFromId } from "./code"
import { 
	CalendarDateDataType,
	CalendarMonthDataType, 
	MonthLabelsType 
} from "@/features/calendar/types"
import { 
	CALENDAR_END_YEAR,
	CALENDAR_START_YEAR,
	MONTH_LABELS, 
	MONTH_LABELS_SHORT, 
	MONTHS_WITH_30_DAYS 
} from "@/features/calendar/constants"

class CalendarMonth {
	id: string
	year: number
	month: number
	dayCount: number
	monthLabel: string
	monthLabelShort: string
	startDay: number
	endDay: number
	dates: CalendarDateDataType[]
	extendedDates: CalendarDateDataType[] = []
	data: CalendarMonthDataType

	constructor(id: string, extend: boolean = false) {
		const { year, month } = getYearAndMonthFromId(id)
		if (!year || !month ) throw SyntaxError('Missing required information.')
		this.id = id
		this.year = year
		this.month = month
		this.dayCount = this.getDayCount()
		this.monthLabel = this.getLabels().monthLabel
		this.monthLabelShort = this.getLabels().monthLabelShort
		this.startDay = new Date(this.year, this.month - 1, 1).getDay()
		this.endDay = (this.startDay + this.dayCount - 1) % 7
		this.dates = []
		this.setDates()
		if (extend) this.extendedDates = this.setExtendedDates()
		this.data = this.getData()
	}

	setExtendedDates(): CalendarDateDataType[] {
		const prevDates = new CalendarMonth(getPrevMonthIdFromId(this.id)).dates
		const prev = prevDates.slice(prevDates.length - this.startDay)
		const next = new CalendarMonth(getNextMonthIdFromId(this.id)).dates.slice(0, 6 - this.endDay)
		return [...prev, ...this.dates, ...next]
	}

	setDates(): void {
		let day = this.startDay
		for (let i = 1; i <= this.dayCount; i++) {
			this.dates.push({
				id: createDateId({ ...getYearAndMonthFromId(this.id), date: i }),
				year: this.year,
				month: this.month,
				date: i,
				day,
				weekdayLabel: '',
				weekdayLabelShort: ''
			})
			day = (day + 1) % 7
		}
	}

	getDayCount(): number {
		if (MONTHS_WITH_30_DAYS.includes(this.month)) {
			return 30
		} else if (this.month === 2) {
			return (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0) ? 29 : 28
		}
		return 31
	}

	getLabels(): MonthLabelsType {
		return {
			monthLabel: MONTH_LABELS[this.month - 1],
			monthLabelShort: MONTH_LABELS_SHORT[this.month - 1]
		}
	}

	getData(): CalendarMonthDataType {
		return {
			id: this.id,
			year: this.year,
			month: this.month,
			dayCount: this.dayCount,
			monthLabel: this.monthLabel,
			monthLabelShort: this.monthLabelShort,
			startDay: this.startDay,
			endDay: this.endDay,
			dates: this.dates,
			extendedDates: this.extendedDates
		}
	}
}

export { CalendarMonth }