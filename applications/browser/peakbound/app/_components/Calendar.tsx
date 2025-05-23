import { CalendarData } from "../_data/calendar"
import { CalendarSizeOptions } from "../_types/calendar"
import CalendarDay from "./CalendarDay"

const weekNames: {[key: string]: string[]} = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default function Calendar({ size = 'mini' }: { size?: CalendarSizeOptions }) {
	const calendarData = new CalendarData()
	console.log(calendarData)

	return (
		<div className={ `calendar ${ size }` }>
			{ weekNames[size].map(name => (
				<div className="calendar-dayofweek" key={ 'day-' + name }>
					<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
				</div>
			))}
			{ calendarData.activeCalendar.map(day => (
				<CalendarDay key={ String(day.year) + day.month + day.dayNumber} day={ day } />
			))}
		</div>
	)
}