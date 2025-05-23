import { CalendarData } from "../_data/calendar"
import { CalendarSizeOptions } from "../_types/calendar"
import SingleArrow from "../svg/SingleArrow"
import CalendarDay from "./CalendarDay"

const weekNames: {[key: string]: string[]} = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default function Calendar({ size = 'mini' }: { size?: CalendarSizeOptions }) {
	const cal = new CalendarData()
	cal.nextMonth()
	cal.nextMonth()

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" />
				{ cal.visibleMonth } { cal.visibleYear }
				<SingleArrow id="prev-month" direction="right" />
			</div>
			<div className={ `calendar ${ size }` }>
				{ weekNames[size].map(name => (
					<div className="calendar-dayofweek" key={ 'day-' + name }>
						<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
					</div>
				))}
				{ cal.activeCalendar.map(day => (
					<CalendarDay key={ day.id } day={ day } />
				))}
			</div>
		</div>
	)
}