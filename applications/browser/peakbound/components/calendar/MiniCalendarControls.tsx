'use client'

import SingleArrow from "@/svg/SingleArrow"
import DoubleArrow from "@/svg/DoubleArrow"
import { useCalendar } from "@/features/calendar/context"
import { 
	CALENDAR_END_YEAR, 
	CALENDAR_START_YEAR, 
	MONTH_LABELS_SHORT } from "@/features/calendar/constants"

export default function MiniCalendarControls() {
	const {
		calendar,
		prevMonth,
		nextMonth,
		prevYear,
		nextYear,
		goToMonth,
		goToYear
	} = useCalendar()
	const currentMonth = calendar.currentMonth()
	
  const YEARS = Array.from(
    { length: CALENDAR_END_YEAR - CALENDAR_START_YEAR + 1 },
    (_, i) => CALENDAR_START_YEAR + i
  )
	return (
		<div className='calendar-controls'>
			<DoubleArrow 
				id='prev-year' 
				direction='left' 
				onClick={ prevYear } 
			/>
			<SingleArrow 
				id='prev-month' 
				direction='left' 
				onClick={ prevMonth } 
			/>
			<div className='calendar-label'>
				<select
					name='calendar-month'
					id='calendar-month'
					value={ currentMonth.month }
					onChange={ goToMonth }
				>
					{ MONTH_LABELS_SHORT.map((label, index) => (
						<option 
							value={ index + 1 } 
							key={ label + index }
						>
							{ label }
						</option>
					)) }
				</select>
				<select
					name='calendar-year'
					id='calendar-year'
					value={ currentMonth.year }
					onChange={ goToYear }
				>
					{ YEARS.map(year => (
						<option value={ year } key={ year }>
							{ year }
						</option>
					)) }
				</select>
			</div>
			<SingleArrow 
				id='next-month' 
				direction='right' 
				onClick={ nextMonth } 
			/>
			<DoubleArrow 
				id='next-year' 
				direction='right' 
				onClick={ nextYear } 
			/>
		</div>
	)
}