import { DAY_LABELS, DAY_LABELS_SHORT, MONTH_LABELS, MONTH_LABELS_SHORT } from '@/features/calendar/constants'
type PropLengthType = 'full' | 'short'

interface DateDataType {
  year: number
  month: number
  date: number
  day: number
}

interface DateFormatOptions {
  separator: string
  format: string | null
  dayLabel: PropLengthType
  monthLabel: PropLengthType
	yearLength: PropLengthType
  monthType: 'string' | 'number'
}

class DateTool {
  id: string

  defaultOptions: DateFormatOptions = {
    separator: '/',
    format: null,
    dayLabel: 'full',
    monthLabel: 'full',
    monthType: 'string',
		yearLength: 'full'
  }

  constructor(id: string) {
    this.id = id
  }

  parseDate(): DateDataType {
    const { id } = this
    const year = parseInt(id.slice(0, 4), 10)
    const month = parseInt(id.slice(4, 6), 10)
    let date = 0
    let day = 0
    if (id.length === 8) {
      date = parseInt(id.slice(6, 8), 10)
      day = new Date(year, month - 1, date).getDay()
    }
    return { year, month, date, day }
  }

  getMonthStr(month: number, options: DateFormatOptions): string {
    if (options.monthType === 'string') {
			month--
      return options.monthLabel === 'short'
        ? MONTH_LABELS_SHORT[month]
        : MONTH_LABELS[month]
    }
    return month.toString()
  }

  getDayStr(day: number, options: DateFormatOptions): string {
    return options.dayLabel === 'short'
      ? DAY_LABELS_SHORT[day]
      : DAY_LABELS[day]
  }

  getFormattedDate(details: DateDataType, options: DateFormatOptions): string {
    const { year, month, date, day } = details
    if (!options.format) return [month, date, year].join(options.separator)
    return options.format
      .replace('y', year.toString())
      .replace('m', this.getMonthStr(month, options))
      .replace('d', date.toString())
      .replace('w', this.getDayStr(day, options))
  }

  getFullDate(options: Partial<DateFormatOptions> = {}): string {
    const opts = { ...this.defaultOptions, ...options }
    const details = this.parseDate()
    return this.getFormattedDate(details, opts)
  }
}

export { DateTool }