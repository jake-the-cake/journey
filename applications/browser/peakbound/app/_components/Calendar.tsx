'use client'

import { useCalendar } from "@/features/calendar/context"
import SingleArrow from "../svg/SingleArrow"
import CalendarDay from "./CalendarDay"
import { DAY_LABELS_SHORT, MONTH_LABELS_SHORT } from "@/features/calendar/constants"
import { getMonthFromId, getYearFromId } from "@/lib/datetime/code"

export default function Calendar({ size = 'mini' }: { size?: any }) {
	const { calendar, prevMonth, nextMonth } = useCalendar()

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" onClick={ prevMonth } />
				<div className="calendar-label">
					{ MONTH_LABELS_SHORT[getMonthFromId(calendar.current)! - 1] } { getYearFromId(calendar.current) }
				</div>
				<SingleArrow id="next-month" direction="right" onClick={ nextMonth } />
			</div>
			<div className={ `calendar ${ size }` }>
				<div className="calendar-content">
					{ DAY_LABELS_SHORT.map(name => (
						<div className="calendar-dayofweek" key={ 'day-' + name }>
							<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
						</div>
					)) }
				</div>
				{ !calendar.data[calendar.current] ?
					<div className="text-c italic p10">
						Out Of Range
					</div> :
					<div className="calendar-content">
						{ calendar.currentMonth().extendedDates.map(day => (
								<CalendarDay key={ day.id } date={ day } isInactive={ calendar.getMonth() !== day.month } /> 
							)
						)}
					</div>
				}
			</div>
		</div>
	)
}