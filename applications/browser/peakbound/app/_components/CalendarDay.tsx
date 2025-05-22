import { CalendarDayData } from "../_types/calendar"

export default function CalendarDay({ day }: { day: CalendarDayData }) {
	const { dayNumber, events, dayOfWeek, month, year, isInactive } = day
	return (
		<div className={ `calendar-day ${ isInactive && "inactive" }` } key={ String(day.year) + day.month + day.dayNumber}>
			<div className="day-number" id={ String(year + month + dayNumber)  }>{ dayNumber }</div>
			{
				events.length > 0 && (
					<div className="event-count">{ events.length }</div>
				) 
			}
		</div>
	)
}