interface CalendarDayData {
  dayNumber: number | string
  eventCount: number
  dayOfWeek: number
  month: number
  year: number
}

interface CalendarRowProps {
  data: CalendarDayData[]
  size?: 'full' | 'med' | 'mini'
}

function CalendarDay({ day }: { day: CalendarDayData }) {
	const { dayNumber, eventCount, dayOfWeek, month, year } = day
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
							eventCount > 0 ? (
								<div className="event-count">{ eventCount }</div>
							) : (
								<div className="event-count-none"></div>
							)
						}
					</div>
			}
		</>
	)
}

const weekNames = {
	full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	med: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	mini: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export default function CalendarRow({ data, size = 'mini' }: CalendarRowProps) {

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
		<>
		<div className={ `calendar-top-row-${ size }` }>
			{ firstRowData.map(day => <CalendarDay key={ String(day.year) + day.month + day.dayNumber + day.dayOfWeek + day.eventCount } day={ day }/>) }
		</div>
		<div className={ `calendar-row-${ size }` }>
			{ data.map(day => <CalendarDay key={ String(day.year) + day.month + day.dayNumber + day.dayOfWeek + day.eventCount } day={ day }/>) }
		</div>
		</>
	)
}