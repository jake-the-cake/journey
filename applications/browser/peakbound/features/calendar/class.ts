import { createDateId, getYearFromId } from '@/lib/datetime/code'
import { getMonthDayCount, newMonth } from '@/lib/datetime/month'

// imported types
import { 
	CalendarDataType, 
	CalendarDateDataType, 
	CalendarMonthDataType, 
	CalendarYearDataType, 
	CurrentDateDataType, 
	DateCodeType
} from './types'

// imported constants
import { 
	CALENDAR_END_YEAR, 
	CALENDAR_START_DAY_OF_WEEK, 
	CALENDAR_START_YEAR, 
	DAY_LABELS, 
	DAY_LABELS_SHORT
} from './constants'

class CalendarData {

	data: CalendarDataType
	current!: CurrentDateDataType

	constructor(
		startYear: number = CALENDAR_START_YEAR, 
		endYear: number = CALENDAR_END_YEAR, 
		startDayOfWeek: number = CALENDAR_START_DAY_OF_WEEK
	) {
		this.data = this.generateCalendarData(startYear, endYear, startDayOfWeek)
		this.resetCurrent()	
	}
	
	resetCurrent(): void {
		this.current = {
			year: null, 
			month: null,
			date: null
		}
	}

	setCurrent(year: number, month: number, date?: number): void {
		this.resetCurrent()
		this.current.year = year
		this.current.month = this.data[year][month]
		this.current.month.dates.unshift(...this.getPrevMonthDates(this.current.month.startDay))
		this.current.month.dates.push(...this.getNextMonthDates(6 - this.current.month.endDay))
		if (date) this.current.date = this.current.month.dates[date - 1]
	}

	getPrevMonthDates(count: number): CalendarDateDataType[] {
		const dates = this.getPrevMonthData().dates
		return dates.slice(dates.length - count)
	}

	getPrevMonthData(): CalendarMonthDataType {
		let year = this.current.year!
		const month = ((this.current.month!.month + 11) % 12) || 12
		if (month === 12) year--
		if (!this.data[year]) {
			const data = newMonth(year, month, (this.current.month!.startDay - 31) % 7)
			return this.addMonthData(data, data.startDay)[0]
		}
		return this.data[year][month]
	}

	getNextMonthDates(count: number): CalendarDateDataType[] {
		return this.getNextMonthData().dates.slice(0, count)
	}

	getNextMonthData(): CalendarMonthDataType {
		let year = this.current.year!
		const month = ((this.current.month!.month + 1) % 12) || 12
		if (month === 1) year++
		if (!this.data[year]) {
			const data = newMonth(year, month, (this.current.month!.endDay + 31) % 7)
			return this.addMonthData(data, data.startDay)[0]	
		}
		return this.data[year][month]
	}

	getMonth(): number {
		if (this.current.month !== null) return this.current.month.month
		return 0
	}

	getYear(): number {
		if (this.current.year !== null) return this.current.year
		return 0
	}

	getMonthLabel(): string {
		if (this.current.month) return this.current.month.monthLabel
		return '' 
	}
	getMonthLabelShort(): string {
		if (this.current.month) return this.current.month.monthLabelShort
		return '' 
	}

	generateCalendarData(startYear: number, endYear: number, startDayOfWeek: number): CalendarDataType {
		const data: CalendarDataType = {}
		for (let i=startYear; i<=endYear; i++) {
			const year = String(i);
			const [newYear, nextStartDayOfWeek] = this.addYearData(year, startDayOfWeek)
			data[year] = newYear
			startDayOfWeek = nextStartDayOfWeek
		}
		return data
	}

	newDate(year: number, month: number, date: number, day: number): CalendarDateDataType {
		const id = createDateId({ year, month, date })
		day = day % 7
		return {
			id,
			year,
			month,
			date,
			day,
			weekdayLabel: DAY_LABELS[day],
			weekdayLabelShort: DAY_LABELS_SHORT[day],
		}
	}

	addYearData(year: string, day: number): [CalendarYearDataType, number] {
		const newYear: CalendarYearDataType = {}
		for (let i=1; i<=12; i++) {
			const month: CalendarMonthDataType = newMonth(parseInt(year), i, day)
			const [newMonthWithDays, nextDayOfWeek] = this.addMonthData(month, day)
			day = nextDayOfWeek
			newYear[i] = newMonthWithDays
		}
		return [newYear, day++ % 7]
	}

	addMonthData(month: CalendarMonthDataType, day: number): [CalendarMonthDataType, number] {
		const dateInfo: DateCodeType = {
			year: getYearFromId(month.id), 
			month: month.month
		}
		for (let i=1; i<=getMonthDayCount(dateInfo); i++) {
			month.dates.push(this.newDate(month.year, month.month, i, day))
			day++
		}
		return [month, day % 7]
	}
}

export { CalendarData }