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

	currentData(): CalendarMonthDataType {
		return this.data[this.current]
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
				data[id] = new CalendarMonth(id)
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

	// getPrevMonthDates(count: number): CalendarDateDataType[] {
	// 	const dates = this.getPrevMonthData().dates
	// 	return dates.slice(dates.length - count)
	// }

	// getPrevMonthData(): CalendarMonthDataType {
	// 	let year = this.current.year!
	// 	const month = ((this.current.month!.month + 11) % 12) || 12
	// 	if (month === 12) year--
	// 	if (!this.data[year]) {
	// 		const data = newMonth(year, month, (this.current.month!.startDay - 31) % 7)
	// 		return this.addMonthData(data, data.startDay)[0]
	// 	}
	// 	return this.data[year][month]
	// }

	// getNextMonthDates(count: number): CalendarDateDataType[] {
	// 	return this.getNextMonthData().dates.slice(0, count)
	// }

	// getNextMonthData(): CalendarMonthDataType {
	// 	let year = this.current.year!
	// 	const month = ((this.current.month!.month + 1) % 12) || 12
	// 	if (month === 1) year++
	// 	if (!this.data[year]) {
	// 		const data = newMonth(year, month, (this.current.month!.endDay + 31) % 7)
	// 		return this.addMonthData(data, data.startDay)[0]	
	// 	}
	// 	return this.data[year][month]
	// }


	// generateCalendarData(startYear: number, endYear: number, startDayOfWeek: number): CalendarDataType {
	// 	const data: CalendarDataType = {}
	// 	for (let i=startYear; i<=endYear; i++) {
	// 		const year = String(i);
	// 		const [newYear, nextStartDayOfWeek] = this.addYearData(year, startDayOfWeek)
	// 		data[year] = newYear
	// 		startDayOfWeek = nextStartDayOfWeek
	// 	}
	// 	return data
	// }

	// newDate(year: number, month: number, date: number, day: number): CalendarDateDataType {
	// 	const id = createDateId({ year, month, date })
	// 	day = day % 7
	// 	return {
	// 		id,
	// 		year,
	// 		month,
	// 		date,
	// 		day,
	// 		weekdayLabel: DAY_LABELS[day],
	// 		weekdayLabelShort: DAY_LABELS_SHORT[day],
	// 	}
	// }

	// addYearData(year: string, day: number): [CalendarYearDataType, number] {
	// 	const newYear: CalendarYearDataType = {}
	// 	for (let i=1; i<=12; i++) {
	// 		const month: CalendarMonthDataType = newMonth(parseInt(year), i, day)
	// 		const [newMonthWithDays, nextDayOfWeek] = this.addMonthData(month, day)
	// 		day = nextDayOfWeek
	// 		newYear[i] = newMonthWithDays
	// 	}
	// 	return [newYear, day++ % 7]
	// }

	// addMonthData(month: CalendarMonthDataType, day: number): [CalendarMonthDataType, number] {
	// 	const dateInfo: DateCodeType = {
	// 		year: getYearFromId(month.id), 
	// 		month: month.month
	// 	}
	// 	for (let i=1; i<=getMonthDayCount(dateInfo); i++) {
	// 		month.dates.push(this.newDate(month.year, month.month, i, day))
	// 		day++
	// 	}
	// 	return [month, day % 7]
	// }
}

export { CalendarData }