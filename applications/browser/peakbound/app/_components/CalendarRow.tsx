import { CalendarRowProps } from "../_types/calendar";
import CalendarDay from "./CalendarDay";

export default function CalendarRow({ data, size = 'mini' }: CalendarRowProps) {

	return (
		<>
		<div className={ `calendar-row-${ size }` }>
			{ data.map(day => <CalendarDay key={ String(day.year) + day.month + day.dayNumber + day.dayOfWeek + day.eventCount } day={ day }/>) }
		</div>
		</>
	)
}