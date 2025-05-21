import { CalendarDayData } from "../_types/calendar"

export function twoDigits(num: number): string {
	let str: string = String(num)
	if (str.length == 1) str = '0' + str
	return str
}
const calendarData: {[key: string]: any} = {}

export const startYear = 2025
const startDayOfWeek = 3

const has30 = [4, 6, 9, 11]
const has31 = [1, 3, 5, 7, 8, 10, 12]
function febDayCount(year: number) {
	if (year % 4 == 0) return 29
	return 28
}

class DayGenerator {
	day: CalendarDayData

	constructor(year = startYear, month = 1, dayNumber = 1, dayOfWeek = startDayOfWeek) {
		this.day = { year, month, dayNumber, dayOfWeek, events: [] }
		if (year > 2026) return
		this.addDay()
		this.next()
	}

	addDay() {
		const dataCode: string = String(this.day.year) + twoDigits(this.day.month) + twoDigits(this.day.dayNumber)
		calendarData[dataCode] = {
			year: this.day.year,
			month: this.day.month,
			dayNumber: this.day.dayNumber,
			dayOfWeek: this.day.dayOfWeek,
			events: []
		}
	}

	next() {
		if (this.day.dayOfWeek == 6) this.day.dayOfWeek = 0
		else this.day.dayOfWeek++
		if (this.day.dayNumber < 28) this.day.dayNumber++
		else if (
			(has30.includes(this.day.month) && this.day.dayNumber == 30) || 
			(has31.includes(this.day.month) && this.day.dayNumber == 31) || 
			(this.day.month == 2 && this.day.dayNumber == febDayCount(this.day.year))
		) {
			this.day.dayNumber = 1
			if (this.day.month == 12) {
				this.day.month = 1
				this.day.year++
			}
			else this.day.month++
		}
		else this.day.dayNumber++
		new DayGenerator(this.day.year, this.day.month, this.day.dayNumber, this.day.dayOfWeek)
	}
}
new DayGenerator()

export { calendarData }