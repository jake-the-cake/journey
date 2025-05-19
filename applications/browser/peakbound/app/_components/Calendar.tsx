import { calendarData } from "../_data/calendar"
import { CalendarDayData, CalendarSizeOptions } from "../_types/calendar"
import CalendarDay from "./CalendarDay"
import CalendarRow from "./CalendarRow"

console.log(calendarData)

const weekNames: {[key: string]: string[]} = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default function Calendar({ size = 'mini' }: { size?: CalendarSizeOptions }) {
	const firstRowData: CalendarDayData[] = []
	for (let i = 0; i < 7; i++) {
		const data: CalendarDayData = {
			dayNumber: weekNames[size][i],
			eventCount: 0,
			dayOfWeek: 0,
			month: 0,
			year: 0
		}
		firstRowData.push(data)
	}
	return (
		<div className="calendar">
			<div className={ `calendar-top-row-${ size }` }>
				{ firstRowData.map(day => <CalendarDay key={ String(day.year) + day.month + day.dayNumber + day.dayOfWeek + day.eventCount } day={ day }/>) }
			</div>
			<CalendarRow data={ [
				{ dayNumber: 1, eventCount: 0, dayOfWeek: 0, month: 0, year: 2024 },
				{ dayNumber: 2, eventCount: 0, dayOfWeek: 1, month: 0, year: 2024 },
				{ dayNumber: 3, eventCount: 0, dayOfWeek: 2, month: 0, year: 2024 },
				{ dayNumber: 4, eventCount: 0, dayOfWeek: 3, month: 0, year: 2024 },
				{ dayNumber: 5, eventCount: 0, dayOfWeek: 4, month: 0, year: 2024 },
				{ dayNumber: 6, eventCount: 0, dayOfWeek: 5, month: 0, year: 2024 },
				{ dayNumber: 7, eventCount: 1, dayOfWeek: 6, month: 1, year: 2024 }
			] } size={ size } />
			<CalendarRow data={ [
				{ dayNumber: 1, eventCount: 0, dayOfWeek: 0, month: 0, year: 2024 },
				{ dayNumber: 2, eventCount: 0, dayOfWeek: 1, month: 0, year: 2024 },
				{ dayNumber: 3, eventCount: 0, dayOfWeek: 2, month: 0, year: 2024 },
				{ dayNumber: 4, eventCount: 0, dayOfWeek: 3, month: 0, year: 2024 },
				{ dayNumber: 5, eventCount: 0, dayOfWeek: 4, month: 0, year: 2024 },
				{ dayNumber: 6, eventCount: 0, dayOfWeek: 5, month: 0, year: 2024 },
				{ dayNumber: 7, eventCount: 1, dayOfWeek: 6, month: 1, year: 2024 }
			] } size={ size } />
		</div>
	)
}