// 'use client'

import SingleArrow from "../svg/SingleArrow"
import CalendarDay from "./CalendarDay"
import { getMonthLabelShort } from "../../lib/datetime/month"
import { useCalendar } from "@/features/calendar/context"
import { CalendarData } from "@/features/calendar/class"
import { DAY_LABELS_SHORT } from "@/features/calendar/constants"

const weekNames: {[key: string]: string[]} = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default async function Calendar({ size = 'mini' }: { size?: any }) {
	const cal = new CalendarData(2025, 2026, 3)
	console.log(cal.data)

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" />
				<div className="calendar-label">
					{ 'Month' } { 'Year' }
				</div>
				<SingleArrow id="next-month" direction="right" />
			</div>
			<div className={ `calendar ${ size }` }>
				<div className="calendar-content">
					{ DAY_LABELS_SHORT.map(name => (
						<div className="calendar-dayofweek" key={ 'day-' + name }>
							<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
						</div>
					)) }
				</div>
				{ /* calendar.activeCalendar.length === 0 ?
					<div className="text-c italic p10">
						{ calendar.outOfRangeMessage }
					</div> :
					<div className="calendar-content">
						{ calendar.activeCalendar.map(day => <CalendarDay key={ day.id } day={ day } /> )}
					</div>
				*/ }
			</div>
		</div>
	)
}