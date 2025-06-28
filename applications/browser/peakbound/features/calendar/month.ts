import { 
  createDateId, 
  getNextMonthIdFromId, 
  getPrevMonthIdFromId, 
  getYearAndMonthFromId 
} from '../../lib/datetime/code'
import { 
  CalendarDateDataType,
  CalendarMonthDataType, 
  MonthLabelsType 
} from '@/features/calendar/types'
import { 
	DAY_LABELS,
  DAY_LABELS_SHORT,
  MONTH_LABELS, 
  MONTH_LABELS_SHORT, 
  MONTHS_WITH_30_DAYS 
} from '@/features/calendar/constants'

/**
 * CalendarMonth represents a single month in the calendar,
 * including its dates, labels, and utility methods.
 */
export class CalendarMonth {
  id: string
  year: number
  month: number
  dayCount: number
  monthLabel: string
  monthLabelShort: string
  startDay: number
  endDay: number
  dates: CalendarDateDataType[]
  extendedDates: CalendarDateDataType[]
  data: CalendarMonthDataType

  /**
   * @param id - The month id in YYYYMM format
   * @param extend - Whether to include days from previous/next months for calendar grid
   */
  constructor(id: string, extend: boolean = false) {
    const { year, month } = getYearAndMonthFromId(id)
    this.id = id
    this.year = year!
    this.month = month!
    const labels = this.getLabels()
    this.monthLabel = labels.monthLabel
    this.monthLabelShort = labels.monthLabelShort
    this.dayCount = this.getDayCount()
    // Day of week for the 1st of the month (0 = Sunday)
    this.startDay = new Date(this.year, this.month - 1, 1).getDay()
    // Day of week for the last day of the month
    this.endDay = (this.startDay + this.dayCount - 1) % 7
    this.dates = this.setDates()
    // Optionally extend with previous/next month's days for a full calendar grid
    this.extendedDates = extend ? this.setExtendedDates() : []
    this.data = this.getData()
  }

  /**
   * Returns an array of dates including days from previous and next months
   * to fill out the calendar grid.
   */
  setExtendedDates(): CalendarDateDataType[] {
    // Get previous month's dates to fill at the start
    const prevDates = new CalendarMonth(getPrevMonthIdFromId(this.id)).dates
    const prev = prevDates.slice(prevDates.length - this.startDay)
    // Get next month's dates to fill at the end
    const next = new CalendarMonth(getNextMonthIdFromId(this.id)).dates.slice(0, 6 - this.endDay)
    return [...prev, ...this.dates, ...next]
  }

  /**
   * Populates this.dates with all dates for the current month.
   */
  setDates(): CalendarDateDataType[] {
    const dates: CalendarDateDataType[] = []
		let day = this.startDay
    for (let i = 1; i <= this.dayCount; i++) {
      dates.push({
        id: createDateId({ ...getYearAndMonthFromId(this.id), date: i }),
        year: this.year,
        month: this.month,
        date: i,
        day,
        weekdayLabel: DAY_LABELS[day],
        weekdayLabelShort: DAY_LABELS_SHORT[day]
      })
      day = (day + 1) % 7
    }
		return dates
  }

  /**
   * Returns the number of days in the month, accounting for leap years.
   */
  getDayCount(): number {
    if (MONTHS_WITH_30_DAYS.includes(this.month)) {
      return 30
    } else if (this.month === 2) {
      // Leap year check for February
      return (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0) ? 29 : 28
    }
    return 31
  }

  /**
   * Returns the full and short labels for the month.
   */
  getLabels(): MonthLabelsType {
    return {
      monthLabel: MONTH_LABELS[this.month - 1],
      monthLabelShort: MONTH_LABELS_SHORT[this.month - 1]
    }
  }

  /**
   * Returns a data object representing this month.
   */
  getData(): CalendarMonthDataType {
    return {
      id: this.id,
      year: this.year,
      month: this.month,
      dayCount: this.dayCount,
      monthLabel: this.monthLabel,
      monthLabelShort: this.monthLabelShort,
      startDay: this.startDay,
      endDay: this.endDay,
      dates: this.dates,
      extendedDates: this.extendedDates
    }
  }
}