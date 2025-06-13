import SingleArrow from "../svg/SingleArrow"
import CalendarDay from "./CalendarDay"
import { CalendarData } from "@/features/calendar/class"
import { DAY_LABELS_SHORT } from "@/features/calendar/constants"


export default async function Calendar({ size = 'mini' }: { size?: any }) {
	const cal = new CalendarData(2025, 2026, 3)
	const date = new Date()
	cal.setCurrent(date.getFullYear(), date.getMonth() + 1)

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" />
				<div className="calendar-label">
					{ cal.current.month?.monthLabelShort } { cal.current.year }
				</div>
				<SingleArrow id="next-month" direction="right" />
			</div>
			<div className={ `calendar ${ size }` }>
				<div className="calendar-content">
					{ DAY_LABELS_SHORT.map(name => (
						<div className="calendar-dayofweek" key={ 'day-' + name }>
							<span className="dayofweek-label" id={ 'day-' + name }>{ name }</span>
						</div>
					)) }
				</div>
				{ !cal.current.month ?
					<div className="text-c italic p10">
						Out Of Range
					</div> :
					<div className="calendar-content">
						{ cal.current.month?.dates.map(day => <CalendarDay key={ day.id } date={ day } isInactive={ cal.current.month?.month !== day.month } /> )}
					</div>
				}
			</div>
		</div>
	)
}