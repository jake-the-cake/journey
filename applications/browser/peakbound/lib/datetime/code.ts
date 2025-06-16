import { DateCodeType } from "@/features/calendar/types"

/**
 * Utility functions to create unique identifiers for months and days.
 * These IDs are used to reference specific months and days in the calendar.
 * The format is `YYYYMM` for months and `YYYYMMDD` for days.
 */
function createMonthId({ year, month }: DateCodeType): string {
	return Number(year).toString() + Number(month).toString().padStart(2, '0')
}

function createDateId({ year, month, date }: DateCodeType): string {
	return createMonthId({ year, month }) + Number(date).toString().padStart(2, '0')
}

function parseCalendarId(id: string): DateCodeType {
	const dateInfo: DateCodeType = {
		year: null,
		month: null,
		date: null
	}
	if (id.length >= 4) dateInfo.year = parseInt(id.slice(0, 4), 10)
	if (id.length >= 6) dateInfo.month = parseInt(id.slice(4, 6), 10)
	if (id.length >= 8) dateInfo.date = parseInt(id.slice(6, 8), 10)
	return dateInfo
}

function getMonthIdFromDateId(id: string): string {
	return id.slice(0, 6)
}

function getYearFromId(id: string): number | null {
	return parseCalendarId(id).year
}

function getMonthFromId(id: string): number | null {
	return parseCalendarId(id).month
}

function getDateFromId(id: string): number | null {
	return parseCalendarId(id).date!
}

function getYearAndMonthFromId(id: string): DateCodeType {
	const { year, month } = parseCalendarId(id)
	return { year, month }
}

function getMonthAndDateFromId(id: string): Partial<DateCodeType> {
	const { month, date } = parseCalendarId(id)
	return { month, date }
}

function getPrevMonthIdFromId(id: string): string {
	let { year, month } = parseCalendarId(id)
	if (month === 1) year!--
	month = ((month! + 11) % 12) || 12
	return createMonthId({ year, month })
}

function getNextMonthIdFromId(id: string): string {
	let { year, month } = parseCalendarId(id)
	if (month === 12) year!++
	month = ((month! + 1) % 12) || 12
	return createMonthId({ year, month })
}

function getPrevYearMonthIdFromID(id: string): string {
	let { year, month } = parseCalendarId(id)
	return createMonthId({ year: year! - 1, month })
}

function getNextYearMonthIdFromID(id: string): string {
	let { year, month } = parseCalendarId(id)
	return createMonthId({ year: year! + 1, month })
}

function getDateAndTimeFromCode(code: string): string[] {
	return code.split(':')
}

function parseTimeCode(code: string): any {
// function parseTimeCode(code: string): TimeCodeTime {
	return {
		hours: parseInt(code.slice(0, 2), 10),
		minutes: parseInt(code.slice(2, 4), 10),
		seconds: parseInt(code.slice(4, 6), 10),
		ms: parseInt(code.slice(6), 10),
	}
}

function getTimeFromCode(code: string, structure: string = 'h:m:s.x', format: number = 24, suffix: string = 'upper'): string {
	let { hours, minutes, seconds, ms } = parseTimeCode(code.padEnd(9, '0'));
	let ending = 'am'
	if (format === 12 && hours >= 12) {
		ending = 'pm'
		hours = (hours % 12) || 12
	}
	structure = structure.replace('h', hours.toString())
		.replace('m', minutes.toString().padStart(2, '0'))
		.replace('s', seconds.toString().padStart(2, '0'))
		.replace('x', ms.toString())
	if (format === 12) {
		switch (suffix) {
			case 'upper': {
				ending = ending.toUpperCase()
			} 
			default: structure += ending
		}
	}
	return structure
}

export {
	createDateId,
	createMonthId,
	getMonthIdFromDateId,
	getDateFromId,
	getMonthFromId,
	getYearFromId,
	getYearAndMonthFromId,
	getMonthAndDateFromId,
	getPrevMonthIdFromId,
	getNextMonthIdFromId,
	getPrevYearMonthIdFromID,
	getNextYearMonthIdFromID,
	getDateAndTimeFromCode,
	getTimeFromCode
}