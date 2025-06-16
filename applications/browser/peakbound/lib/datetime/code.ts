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

function getDateAndTimeFromCode(code: string): string[] {
	return code.split(':')
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
	getDateAndTimeFromCode
}