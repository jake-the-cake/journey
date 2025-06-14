import { CalendarMonth } from '@/features/calendar/month'
import { 
	createMonthId, 
	getMonthIdFromDateId, 
	getNextMonthIdFromId, 
	getPrevMonthIdFromId 
} from '@/lib/datetime/code'
import { CalendarDataType, CalendarMonthDataTypeExtended } from './types'
import { CALENDAR_END_YEAR, CALENDAR_START_YEAR } from './constants'

class CalendarData {
	data: CalendarDataType
	current: string

	constructor(current: string | null = null) {
		this.current = current || this.thisMonthId()
		this.data = this.populateData()
	}

	// defaults
	thisMonthId(): string {
		const date = new Date()
		return createMonthId({ year: date.getFullYear(), month: date.getMonth() + 1 })
	}

	populateData(): CalendarDataType {
		const data: CalendarDataType = {}
		for (let i = CALENDAR_START_YEAR; i <= CALENDAR_END_YEAR; i++) {
			for (let j = 1; j <= 12; j++) {
				const id: string = createMonthId({ year: i, month: j })
				data[id] = new CalendarMonth(id, true)
			}			
		}
		return data
	}
	
	// setters
	switchMonth(id: string): void {
		this.current = id
	}

	// updaters
	goToPrevMonth(): CalendarMonthDataTypeExtended {
		this.switchMonth(getPrevMonthIdFromId(this.current))
		return this.currentMonth()
	}

	goToNextMonth(): CalendarMonthDataTypeExtended {
		this.switchMonth(getNextMonthIdFromId(this.current))
		console.log(this.currentMonth())
		return this.currentMonth()
	}

	// getters
	currentMonth(): CalendarMonthDataTypeExtended {
		return this.data[this.current] || { data: null }
	}

	getMonthLabel(): string {
		return this.currentMonth().monthLabel
	}

	getMonthLabelShort(): string {
		return this.currentMonth().monthLabelShort
	}

	getMonth(): number {
		return this.currentMonth().month
	}

	getYear(): number {
		return this.currentMonth().year
	}

	getMonthId(): string {
		return this.currentMonth().id
	}

	getDate(): number {
		const month = this.data[getMonthIdFromDateId(this.current)]
		return month.dates.filter(date => date.date === parseInt(this.current.slice(6), 10))[0]?.date ?? 0
	}
}

export { CalendarData }