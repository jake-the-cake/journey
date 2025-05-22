import { CalendarDayData } from "../_types/calendar"

function twoDigits(num: number): string {
	let str: string = String(num)
	if (str.length == 1) str = '0' + str
	return str
}

const calendarDays: { [key: string]: CalendarDayData } = {}

const startYear = 2025
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
		this.day = { year, month, dayNumber, dayOfWeek, events: [], isInactive: false }
		if (year > 2026) return
		this.addDay()
		this.next()
	}

	addDay() {
		const dataCode: string = String(this.day.year) + twoDigits(this.day.month) + twoDigits(this.day.dayNumber)
		calendarDays[dataCode] = {
			year: this.day.year,
			month: this.day.month,
			dayNumber: this.day.dayNumber,
			dayOfWeek: this.day.dayOfWeek,
			events: [],
			isInactive: false
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

const calendars: {
		[key: string]: {
			[key: string]: CalendarDayData[]
		}
	} = {}
let year = startYear
while (Object.values(calendarDays).filter(val => val.year == year).length > 0) {
	const calendarYear = String(year)
	if (Object.keys(calendars).includes(calendarYear)) {
		for (let i = 1; i < 13; i++) {
			calendars[calendarYear][i] = Object.values(calendarDays).filter(val => String(val.year) == calendarYear && val.month == i)
		}
		year++
	}
	else {
		calendars[calendarYear] = {}
	}
}	

class CalendarData {
	data: {
		[key: string]: {
			[key: string]: CalendarDayData[]
		}
	}
	today!: CalendarDayData
	visibleMonth!: number
	visibleYear!: number
	activeCalendar!: CalendarDayData[]

	constructor() {
		this.data = calendars
		this.setToday()
	}

	setToday() {
		const date = new Date()
		this.today = {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			dayNumber: date.getDate(),
			dayOfWeek: date.getDay(),
			events: [],
			isInactive: false
		}
		this.thisMonth()
		this.changeMonth(6, 2026)
	}

	thisMonth() {
		this.visibleMonth = this.today.month
		this.visibleYear = this.today.year
	}

	changeMonth(month: number, year: number) {
		const data = this.data[String(year)][String(month)]
		const firstDayOfMonth = data[0].dayOfWeek
		const lastDayOfMonth = data[data.length - 1].dayOfWeek
		const prev = this.data[String(year)][String(month - 1)]
		const next = this.data[String(year)][String(month + 1)]
		for (let i=0; i<firstDayOfMonth; i++) {
			const item = prev[prev.length - i - 1]
			item.isInactive = true
			data.unshift(item)
		}
		for (let i=0; i<6-lastDayOfMonth; i++) {
			next[i].isInactive = true
			data.push(next[i])
		}
		this.activeCalendar = data
	}
}

export { CalendarData }