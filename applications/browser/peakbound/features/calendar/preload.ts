import { createDateId } from "@/lib/datetime/code";
import { MONTHS_WITH_30_DAYS } from "./constants";
import { getFebruaryDayCount } from "./tools";
import { CalendarDateDataType } from "./types";

/**
 * Utility function to pad a number to two digits.
 */
function twoDigits(num: number): string {
	return num.toString().padStart(2, '0');
}

/**
 * Helper arrays for month day counts.
 */


/**
 * Returns the number of days in February for a given year.
 */




/**
 * Generates all calendar days between startYear and endYear (inclusive).
 */
function generateCalendarDays(startYear: number, endYear: number, startDayOfWeek: number): Record<string, CalendarDateDataType> {
	const calendarDays: Record<string, CalendarDateDataType> = {};
	let year = startYear;
	let month = 1;
	let date = 1;
	let dayOfWeek = startDayOfWeek;

	while (year <= endYear) {
		const dataCode: string = createDateId({year, month, date})
		// calendarDays[dataCode] = {
		// 	id: dataCode,
		// 	year,
		// 	month,
		// 	date,
		// 	dayOfWeek,
		// 	events: [],
		// 	isInactive: false,
		// }

		// Advance to next day
		dayOfWeek = (dayOfWeek + 1) % 7;

		let daysInMonth = 31
		if (month === 2) {
			daysInMonth = getFebruaryDayCount(year)
		} else if (MONTHS_WITH_30_DAYS.includes(month)) {
			daysInMonth = 30
		}

		if (date < daysInMonth) {
			date++
		} else {
			date = 1
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
function organizeCalendarDays(calendarDays: Record<string, CalendarDateDataType>): Record<string, Record<string, CalendarDateDataType[]>> {
	const calendars: Record<string, Record<string, CalendarDateDataType[]>> = {};
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
	calendarDays: Record<string, CalendarDateDataType>
	data: Record<string, Record<string, CalendarDateDataType[]>>
	today: CalendarDateDataType
	visibleMonth: number
	visibleYear: number
	activeCalendar: CalendarDateDataType[]
	outOfRangeMessage: string
	changeCurrentCalendar?: (name: string, args?: number[]) => void

	constructor(startYear = 2025, endYear = 2027, startDayOfWeek = 3) {
		this.calendarDays = generateCalendarDays(startYear, endYear, startDayOfWeek)
		this.createEvent()
		this.outOfRangeMessage = `Calendar data is only available from ${startYear} to ${endYear}.`
		this.data = organizeCalendarDays(this.calendarDays)
		this.today = this.getToday()
		this.visibleMonth = this.today.month
		this.visibleYear = this.today.year
		this.activeCalendar = []
		this.setActiveMonth()
	}

	createEvent() {
		this.calendarDays['20260103'].events.push({name: 'Event'})
	}

	/**
	 * Returns today's date as a CalendarDateDataType object.
	 */
	private getToday(): CalendarDateDataType {
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
		if (this.visibleMonth == 0) this.visibleMonth = 12
		const yearStr = String(this.visibleYear)
		const monthStr = String(this.visibleMonth)
		const prevMonthStr = String((this.visibleMonth + 11) % 12 || 12)
		const nextMonthStr = String((this.visibleMonth + 1) % 12 || 12)

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
		if (this.visibleMonth == 0) this.visibleMonth = 12
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

	getDaysByRange(startDate: string, endDate: string) {
		const data = Object.entries(this.calendarDays).filter(day => Number(day[0]) >= Number(startDate) && Number(day[0]) <= Number(endDate))
		return data
	}

	getEventsByRange(startDate: string, endDate: string) {
		const days = this.getDaysByRange(startDate, endDate)
		const events: Record<string, CalendarDateDataType> = {}
		days.forEach(([key, value]) => {
			if (value.events.length > 0) {
				events[key] = value
			}
		})
		return Object.entries(events)
	}
}

export { CalendarData }