'use client'

import { useRef, useState } from "react"
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
	const calRef = useRef(new CalendarData())
  const [_, forceUpdate] = useState<number>(0)

  const update = () => forceUpdate((prev: number) => prev + _)

  const handlePrevMonth = () => {
    calRef.current.prevMonth()
    update()
  }

  const handleNextMonth = () => {
    calRef.current.nextMonth()
    update()
  }

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" onClick={ handlePrevMonth } />
				<div className="calendar-label">
					{ calRef.current.getStringMonth(size) } { calRef.current.visibleYear }
				</div>
				<SingleArrow id="next-month" direction="right" onClick={ handleNextMonth } />
			</div>
			<div className={ `calendar ${ size }` }>
				{ weekNames[size].map(name => (
					<div className="calendar-dayofweek" key={ 'day-' + name }>
						<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
					</div>
				))}
				{ calRef.current.activeCalendar.map(day => (
					<CalendarDay key={ day.id } day={ day } />
				))}
			</div>
		</div>
	)
}