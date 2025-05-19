const calendarData: {[key: string]: any} = {}

const startYear = 2025
const startDayOfWeek = 3

const has30 = [4, 6, 9, 11]
const has31 = [1, 3, 5, 7, 8, 10, 12]
function febDayCount(year: number) {
	if (year % 4 == 0) return 29
	return 28
}

class DayGenerator {
	day: {
		year: number
		month: number
		day: number
		dayOfWeek: number
	}

	constructor(year = startYear, month = 1, day = 1, dayOfWeek = startDayOfWeek) {
		this.day = { year, month, day, dayOfWeek }
		if (year > 2026) return
		this.addDay()
		this.next()
	}

	twoDigits(num: number) {
		let str: string = String(num)
		if (str.length == 1) str = '0' + str
		return str
	}

	addDay() {
		const dataCode: string = String(this.day.year) + this.twoDigits(this.day.month) + this.twoDigits(this.day.day)
		calendarData[dataCode] = this.day
	}

	next() {
		if (this.day.dayOfWeek == 6) this.day.dayOfWeek = 0
		else this.day.dayOfWeek++
		if (this.day.day < 28) this.day.day++
		else if (
			(has30.includes(this.day.month) && this.day.day == 30) || 
			(has31.includes(this.day.month) && this.day.day == 31) || 
			(this.day.month == 2 && this.day.day == febDayCount(this.day.year))
		) {
			this.day.day = 1
			if (this.day.month == 12) {
				this.day.month = 1
				this.day.year++
			}
			else this.day.month++
		}
		else this.day.day++
		new DayGenerator(this.day.year, this.day.month, this.day.day, this.day.dayOfWeek)
	}
}

new DayGenerator()

export { calendarData }