import { MONTH_LABELS, MONTH_LABELS_SHORT, MONTHS_WITH_30_DAYS } from "@/features/calendar/constants"
import { CalendarMonthDataType, DateCodeType, MonthLabelsType } from "@/features/calendar/types"
import { createMonthId } from "./code"

function getMonthLabels(month: number): MonthLabelsType {
	if (month < 1 || month > 12) throw new RangeError('Month must be a number between 0 and 11')
	return {
		monthLabel: MONTH_LABELS[month - 1],
		monthLabelShort: MONTH_LABELS_SHORT[month - 1]
	}
}

function getMonthLabelLong(month: number): string {
	return getMonthLabels(month).monthLabel
}

function getMonthLabelShort(month: number): string {
	return getMonthLabels(month).monthLabelShort
}

function getMonthDayCount({ year, month }: DateCodeType): number {
	if (!year || !month ) throw SyntaxError('Missing required information.')
	if (MONTHS_WITH_30_DAYS.includes(month)) {
		return 30
	} else if (month === 2) {
		return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28
	}
	return 31
}

function newMonth(year: number, month: number, day: number): CalendarMonthDataType {
	const id = createMonthId({ year, month })
	const dayCount = getMonthDayCount({ year, month })
	return {
		id,
		year,
		month,
		dayCount,
		dates: [],
		startDay: day,
		endDay: (day + dayCount - 1) % 7,
		...getMonthLabels(month)
	}
}

export { 
	getMonthLabels,
	getMonthLabelShort,
	getMonthLabelLong,
	getMonthDayCount,
	newMonth
}