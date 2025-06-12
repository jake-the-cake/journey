import { CalendarDayData } from "../../features/calendar/types"

export default function CalendarDay({ day }: { day: CalendarDayData }) {
	const { dayNumber, events, month, year, isInactive } = day
	return (
		<div className={ `calendar-day ${ isInactive && "inactive" }` }>
			<div className="day-number" id={ String(year + month + dayNumber)  }>{ dayNumber }</div>
			{
				events.length > 0 && (
					<div className="event-count">{ events.length }</div>
				) 
			}
		</div>
	)
}