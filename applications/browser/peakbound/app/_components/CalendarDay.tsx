import { CalendarDateDataType } from "../../features/calendar/types"
import { useEvents } from "@/features/events/context"

export default function CalendarDay({ date, isInactive }: { date: CalendarDateDataType, isInactive: boolean }) {
	const { events } = useEvents()
	console.log(events)


	return (
		<div className={ `calendar-day ${ isInactive && 'inactive' } }` }>
			<div className="date-number" id={ date.id }>{ date.date }</div>
			{ 
				events.data[date.id] ?
				<div className="event-count">{ events.data[date.id].length }</div> :
				<div className="event-count none"></div>
			}
		</div>
	)
}