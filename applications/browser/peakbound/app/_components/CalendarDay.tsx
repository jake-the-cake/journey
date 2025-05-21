import { CalendarDayData } from "../_types/calendar"

export default function CalendarDay({ day }: { day: CalendarDayData }) {
	const { dayNumber, events, dayOfWeek, month, year } = day
	return (
		<>
			{
				typeof dayNumber === 'string' ? 
					<div className="calendar-day-top">
						<div className="day-number" id={ 'day-' + dayOfWeek }>{ dayNumber }</div>
					</div>
				 : 
					<div className="calendar-day">
						<div className="day-number" id={ String(year + month + dayNumber)  }>{ dayNumber }</div>
						{
							events.length > 0 ? (
								<div className="event-count">{ events.length }</div>
							) : (
								<div className="event-count-none"></div>
							)
						}
					</div>
			}
		</>
	)
}