import { CalendarDayData } from "../_types/calendar";

/**
 * Utility function to pad a number to two digits.
 */
function twoDigits(num: number): string {
	return num.toString().padStart(2, '0');
}

/**
 * Helper arrays for month day counts.
 */
const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

/**
 * Returns the number of days in February for a given year.
 */
function getFebruaryDays(year: number): number {
	return year % 4 === 0 ? 29 : 28;
}

function createDateCode({year, month, dayNumber}: {year: number, month: number, dayNumber: number}): string {
	return `${year}${twoDigits(month)}${twoDigits(dayNumber)}`
}

/**
 * Generates all calendar days between startYear and endYear (inclusive).
 */
function generateCalendarDays(startYear: number, endYear: number, startDayOfWeek: number): Record<string, CalendarDayData> {
	const calendarDays: Record<string, CalendarDayData> = {};
	let year = startYear;
	let month = 1;
	let dayNumber = 1;
	let dayOfWeek = startDayOfWeek;

	while (year <= endYear) {
		const dataCode: string = createDateCode({ year, month, dayNumber })
		calendarDays[dataCode] = {
			id: dataCode,
			year,
			month,
			dayNumber,
			dayOfWeek,
			events: [],
			isInactive: false,
		}

		// Advance to next day
		dayOfWeek = (dayOfWeek + 1) % 7;

		let daysInMonth = 31
		if (month === 2) {
			daysInMonth = getFebruaryDays(year)
		} else if (MONTHS_WITH_30_DAYS.includes(month)) {
			daysInMonth = 30
		}

		if (dayNumber < daysInMonth) {
			dayNumber++
		} else {
			dayNumber = 1
			if (month === 12) {
				month = 1
				year++
			} else {
				month++
			}
		}
	}
	return calendarDays
}

/**
 * Organizes calendar days into a nested year->month->days structure.
 */
function organizeCalendarDays(calendarDays: Record<string, CalendarDayData>): Record<string, Record<string, CalendarDayData[]>> {
	const calendars: Record<string, Record<string, CalendarDayData[]>> = {};
	Object.values(calendarDays).forEach(day => {
		const yearKey = String(day.year)
		const monthKey = String(day.month)
		if (!calendars[yearKey]) calendars[yearKey] = {}
		if (!calendars[yearKey][monthKey]) calendars[yearKey][monthKey] = []
		calendars[yearKey][monthKey].push(day)
	})
	return calendars
}

/**
 * Main CalendarData class for managing calendar state and logic.
*/
class CalendarData {
	data: Record<string, Record<string, CalendarDayData[]>>;
	today: CalendarDayData;
	visibleMonth: number;
	visibleYear: number;
	activeCalendar: CalendarDayData[];
	miniStingMonth: string[] = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]
	fullStringMonth: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	constructor(startYear = 2025, endYear = 2026, startDayOfWeek = 3) {
		const calendarDays = generateCalendarDays(startYear, endYear, startDayOfWeek)
		this.data = organizeCalendarDays(calendarDays)
		this.today = this.getToday()
		this.visibleMonth = this.today.month
		this.visibleYear = this.today.year
		this.activeCalendar = []
		this.setActiveMonth()
	}

	/**
	 * Returns today's date as a CalendarDayData object.
	 */
	private getToday(): CalendarDayData {
		const date = new Date()
		return this.data[String(date.getFullYear())][String(date.getMonth() + 1)][date.getDate() - 1]
	}

	/**
	 * Sets the visible month and year to today.
	 */
	setToCurrentMonth(): void {
		this.visibleMonth = this.today.month
		this.visibleYear = this.today.year
		this.setActiveMonth()
	}

	/**
	 * Changes the visible month and year, and updates the active calendar.
	 * Pads the calendar with inactive days from previous/next months as needed.
	 */
	setActiveMonth(): void {
		const yearStr = String(this.visibleYear)
		const monthStr = String(this.visibleMonth)
		const prevMonthStr = String(this.visibleMonth - 1)
		const nextMonthStr = String(this.visibleMonth + 1)

		const data = [...(this.data[yearStr]?.[monthStr] ?? [])]
		if (data.length === 0) {
			this.activeCalendar = []
			return
		}

		const firstDayOfMonth = data[0].dayOfWeek
		const lastDayOfMonth = data[data.length - 1].dayOfWeek

		// Pad with previous month's days
		const prev = this.data[yearStr]?.[prevMonthStr]
		if (prev && firstDayOfMonth > 0) {
			for (let i = 0; i < firstDayOfMonth; i++) {
				const item = { ...prev[prev.length - i - 1], isInactive: true }
				data.unshift(item)
			}
		}

		// Pad with next month's days
		const next = this.data[yearStr]?.[nextMonthStr]
		if (next && lastDayOfMonth < 6) {
			for (let i = 0; i < 6 - lastDayOfMonth; i++) {
				const item = { ...next[i], isInactive: true }
				data.push(item)
			}
		}
		this.activeCalendar = data
	}

	nextMonth() {
		if (this.visibleMonth == 12) this.visibleYear++
		this.visibleMonth = (this.visibleMonth + 1) % 12
		this.setActiveMonth()
	}

	prevMonth() {
		if (this.visibleMonth == 1) this.visibleYear--
		this.visibleMonth = (this.visibleMonth + 11) % 12
		this.setActiveMonth()
	}

	gotoMonth(month: number, year: number | undefined = undefined) {
		this.visibleMonth = month
		if (year) this.visibleYear = year
		this.setActiveMonth()
	}

	gotoYear(year: number) {
		this.visibleYear = year
		this.setActiveMonth()
	}

	getStringMonth(size: string) {
		const names: any = {
			mini: this.miniStingMonth,
			med: this.fullStringMonth,
			full: this.fullStringMonth
		}
		return names[size][this.visibleMonth - 1]
	}
}

export { CalendarData };