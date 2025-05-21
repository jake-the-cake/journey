import { calendarData, startYear } from "../_data/calendar"
import { CalendarDayData, CalendarSizeOptions } from "../_types/calendar"

const weekNames: {[key: string]: string[]} = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default function Calendar({ size = 'mini' }: { size?: CalendarSizeOptions }) {
	const date = new Date()
	const today: CalendarDayData = {
		year: date.getFullYear(),
		month: date.getMonth(),
		dayNumber: date.getDate(),
		dayOfWeek: date.getDay(),
		events: []
	}
	console.log(today)
	const calendars: any = {}
	let year = startYear
	while (Object.values(calendarData).filter(val => val.year == year).length > 0) {
		const calendarYear = String(year)
		if (Object.keys(calendars).includes(calendarYear)) {
			for (let i = 1; i < 13; i++) {
				calendars[calendarYear][i] = Object.values(calendarData).filter(val => val.year == calendarYear && val.month == i)
			}
			console.log(calendars)
			year++
		}
		else {
			calendars[calendarYear] = {}
		}
	}
	

	return (
		<div className={ `calendar ${ size }` }>
			{ weekNames[size].map(name => (
				<div className="calendar-dayofweek" key={ 'day-' + name }>
					<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
				</div>
			))}
		</div>
	)
}