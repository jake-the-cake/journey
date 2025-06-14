import { createMonthId, getMonthIdFromDateId } from '@/lib/datetime/code'
import { CalendarMonth } from '@/lib/datetime/month'
import { CalendarDataType, CalendarMonthDataType } from './types'
import { CALENDAR_END_YEAR, CALENDAR_START_YEAR } from './constants'

class CalendarData {
	data: CalendarDataType
	current: string

	constructor(current: string | null = null) {
		if (!current) current = this.thisMonth()
		this.current = current
		this.data = this.populateData()
	}

	currentData(): CalendarMonthDataType & { data?: CalendarMonthDataType } {
		return this.data[this.current] || { data: null }
	}
	
	thisMonth(): string {
		const date = new Date()
		return createMonthId({ year: date.getFullYear(), month: date.getMonth() + 1 })
	}

	populateData(): CalendarDataType {
		const data: CalendarDataType = {}
		for (let i = CALENDAR_START_YEAR; i <= CALENDAR_END_YEAR; i++) {
			for (let j = 1; j <= 12; j++) {
				const id: string = createMonthId({ year: i, month: j })
				data[id] = new CalendarMonth(id, true)
			}			
		}
		return data
	}

	getMonthLabel(): string {
		return this.currentData().monthLabel
	}

	getMonthLabelShort(): string {
		return this.currentData().monthLabelShort
	}

	getMonth(): number {
		return this.currentData().month
	}

	getYear(): number {
		return this.currentData().year
	}

	getMonthId(): string {
		return this.currentData().id
	}

	getDate(): number {
		const month = this.data[getMonthIdFromDateId(this.current)]
		return month.dates.filter(date => date.date === parseInt(this.current.slice(6), 10))[0]?.date ?? 0
	}
}

export { CalendarData }