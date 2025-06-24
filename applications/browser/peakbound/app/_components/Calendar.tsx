'use client'

import { useCalendar } from "@/features/calendar/context"
import SingleArrow from "../../svg/SingleArrow"
import CalendarDay from "./CalendarDay"
import { CALENDAR_END_YEAR, CALENDAR_START_YEAR, DAY_LABELS_SHORT, MONTH_LABELS_SHORT } from "@/features/calendar/constants"
import DoubleArrow from "../../svg/DoubleArrow"

export default function Calendar({ size = 'mini' }: { size?: any }) {
	const { calendar, prevMonth, nextMonth, prevYear, nextYear, goToMonth, goToYear } = useCalendar()
	let YEARS: any = []
	for (let i = CALENDAR_START_YEAR; i <= CALENDAR_END_YEAR; i++) {
		YEARS.push(i)
	}

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<DoubleArrow id="prev-month" direction="left" onClick={ prevYear } />
				<SingleArrow id="prev-month" direction="left" onClick={ prevMonth } />
				<div className="calendar-label">
					<select 
						name="calendar-month" 
						id="calendar-month" 
						value={ calendar.currentMonth().month } 
						onChange={ goToMonth }
					>
						{	MONTH_LABELS_SHORT.map((label: string, index: number) => (
								<option value={ index + 1 } key={ label + index }>{ label }</option>
						)) }
					</select>
					<select 
						name="calendar-year" 
						id="calendar-year" 
						value={ calendar.currentMonth().year } 
						onChange={ goToYear }
					>
						{	YEARS.map((year: number) => (
								<option value={ year } key={ year }>{ year }</option>
						)) }
					</select>
				</div>
				<SingleArrow id="next-month" direction="right" onClick={ nextMonth } />
				<DoubleArrow id="next-month" direction="right" onClick={ nextYear } />
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