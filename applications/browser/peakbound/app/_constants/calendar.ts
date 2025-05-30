const miniStingMonth: string[] = [
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

const fullStringMonth: string[] = [
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

function getMonthString(month: number, size: string = 'full') {
	if (month < 1 || month > 12) throw new RangeError('Month must be a number between 0 and 11')
	switch(size) {
		case 'mini':
			return miniStingMonth[month - 1]
		case 'full':
			return fullStringMonth[month - 1]
		default:
			throw new SyntaxError('Invalid size property. Must be "full" or "mini".')
	}
}

export { getMonthString }