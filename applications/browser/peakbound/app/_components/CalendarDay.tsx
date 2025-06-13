import { createDateId } from "@/lib/datetime/code"
import { CalendarDateDataType } from "../../features/calendar/types"

export default function CalendarDay({ date, isInactive }: { date: CalendarDateDataType, isInactive: boolean }) {
	const id = createDateId({
		year: date.year,
		month: date.month,
		date: date.date
	})
	return (
		<div className={ `calendar-day ${ isInactive && 'inactive' } }` }>
			<div className="date-number" id={ id }>{ date.date }</div>
			<div className="event-count">{ '0' }</div>
		</div>
	)
}