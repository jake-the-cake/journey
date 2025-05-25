'use client'

import { CalendarSizeOptions } from "../_types/calendar"
import SingleArrow from "../svg/SingleArrow"
import CalendarDay from "./CalendarDay"
import { useCalendar } from "../_context/CalendarContext"

const weekNames: {[key: string]: string[]} = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default function Calendar({ size = 'mini' }: { size?: CalendarSizeOptions }) {
	const { cal, nextMonth, prevMonth } = useCalendar()

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" onClick={ prevMonth } />
				<div className="calendar-label">
					{ cal.getStringMonth(size) } { cal.visibleYear }
				</div>
				<SingleArrow id="next-month" direction="right" onClick={ nextMonth } />
			</div>
			<div className={ `calendar ${ size }` }>
				<div className="calendar-content">
					{ weekNames[size].map(name => (
						<div className="calendar-dayofweek" key={ 'day-' + name }>
							<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
						</div>
					)) }
				</div>
				<div className="calendar-content">
					{ cal.activeCalendar.map(day => (
						<CalendarDay key={ day.id } day={ day } />
					)) }
				</div>
			</div>
		</div>
	)
}