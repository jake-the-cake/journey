import { LabelListDictionaryType } from "@/lib/types"

// Dictionary for month labels
const MONTH_LABELS_DICT: LabelListDictionaryType = {
	full: [
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
	],
	short: [
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
}
	
// Dictionary for day labels
const DAY_LABELS_DICT: LabelListDictionaryType = {
	full: [
		'Sunday', 
		'Monday', 
		'Tuesday', 
		'Wednesday', 
		'Thursday', 
		'Friday', 
		'Saturday'
	],
	short: [
		'Sun', 
		'Mon', 
		'Tue', 
		'Wed', 
		'Thu', 
		'Fri', 
		'Sat'
	]
}

// Start year and day of the week for the calendar (0[Sunday] to 6[Saturday])
const CALENDAR_START_YEAR:        number = 2025
const CALENDAR_END_YEAR:        number = 2028
const CALENDAR_START_DAY_OF_WEEK: number = 3

// Month numbers with 30 days
const MONTHS_WITH_30_DAYS: number[] = [4, 6, 9, 11]

// Exported constants for month and day labels
const MONTH_LABELS:       string[] = MONTH_LABELS_DICT.full
const MONTH_LABELS_SHORT: string[] = MONTH_LABELS_DICT.short!
const DAY_LABELS:         string[] = DAY_LABELS_DICT.full
const DAY_LABELS_SHORT:   string[] = DAY_LABELS_DICT.short!

export {
	MONTH_LABELS,
	MONTH_LABELS_SHORT,
	MONTHS_WITH_30_DAYS,
	DAY_LABELS,
	DAY_LABELS_SHORT,
	CALENDAR_START_YEAR,
	CALENDAR_END_YEAR,
	CALENDAR_START_DAY_OF_WEEK
}