import SingleArrow from "../svg/SingleArrow"
import CalendarDay from "./CalendarDay"
import { CalendarData } from "@/features/calendar/class"
import { DAY_LABELS_SHORT } from "@/features/calendar/constants"


export default async function Calendar({ size = 'mini' }: { size?: any }) {
	const cal = new CalendarData('202802')
	cal.getDate()

	return (
		<div className="calendar-container">
			<div className="calendar-controls">
				<SingleArrow id="prev-month" direction="left" />
				<div className="calendar-label">
					{ cal.getMonthLabelShort() } { cal.getYear() }
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
				{ !cal.data[cal.current] ?
					<div className="text-c italic p10">
						Out Of Range
					</div> :
					<div className="calendar-content">
						{ cal.currentData().dates.map(day => <CalendarDay key={ day.id } date={ day } isInactive={ cal.getMonth() !== day.month } /> )}
					</div>
				}
			</div>
		</div>
	)
}