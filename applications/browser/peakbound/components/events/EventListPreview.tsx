'use client'

import Link from 'next/link'
import MoreInfo from '@/svg/MoreInfo'
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  getDateFromId,
  getMonthFromId,
  getTimeFromCode,
  getYearFromId
} from '@/lib/datetime/code'
import { useCalendar } from '@/features/calendar/context'
import { useEvents } from '@/features/events/context'
import { EventDataType } from '@/features/events/types'
import { MONTH_LABELS_SHORT } from '@/features/calendar/constants'

// Helper to extract integer from a string (e.g., 'next14' -> 14)
function realParseInt(value: string): number {
  const numbers = []
  for (let i = 0; i < value.length; i++) {
    const char = value.charAt(i)
    if (char >= '0' && char <= '9') {
      numbers.push(char)
    }
  }
  return numbers.length > 0 ? parseInt(numbers.join(''), 10) : 0
}

export default function EventListPreview() {
  const { calendar } = useCalendar()
  const { events } = useEvents()
  const [eventList, setEventList] = useState<EventDataType[]>([])
  const [currentValue, setCurrentValue] = useState<string>(calendar.current)
  // Track the previous calendar.current value
  const prevCalendarCurrent = useRef(calendar.current)

  // Sync currentValue with calendar.current only if user is viewing the month filter
  useEffect(() => {
    if (currentValue === prevCalendarCurrent.current) {
      setCurrentValue(calendar.current)
    }
    prevCalendarCurrent.current = calendar.current
  }, [calendar.current])

  // Update event list when calendar month, filter, or events change
  useEffect(() => {
    if (currentValue === calendar.current) {
      setEventList(events.getDataByMonth(calendar.current))
    } else {
      const days = realParseInt(currentValue)
      const direction = currentValue.replace(days.toString(), '')
      setEventList(events.getDataByNumDays(days, direction))
    }
    return () => setEventList([])
  }, [calendar.current, currentValue, events])

  // Handle filter change from select dropdown
  function handleTimeFrameChange(e: ChangeEvent<HTMLSelectElement>) {
    setCurrentValue(e.target.value)
  }

  return (
    <div id='event-preview-list'>
      <select
        className='event-filter'
        onChange={handleTimeFrameChange}
        value={currentValue}
      >
        <option value={calendar.current}>
          {calendar.getMonthLabel()} {calendar.getYear()}
        </option>
        <option value='next7'>Next 7 Days</option>
        <option value='next14'>Next 14 Days</option>
        <option value='next30'>Next 30 Days</option>
        <option value='last14'>Last 14 Days</option>
        <option value='last30'>Last 30 Days</option>
      </select>
      <div className='event-item-list'>
        {
          eventList.length > 0 ? (
            <>
              {eventList.map((d: EventDataType) => (
                <div className='event-item' id={d.id} key={d.id}>
                  <div className='event-date'>
                    <div className='month'>
                      {MONTH_LABELS_SHORT[getMonthFromId(d.startDate)! - 1]}
                    </div>
                    <div className='date'>{getDateFromId(d.startDate)}</div>
                    <div className='year'>{getYearFromId(d.startDate)}</div>
                  </div>
                  <div className='event-details'>
                    <div className='event-title'>{d.title}</div>
                    <div className='event-location'>{d.location}</div>
                    <div className='event-location'>
                      {getTimeFromCode(d.startTime, 'h:m', 12)}
                    </div>
                  </div>
                  <div className='event-link'>
                    <Link href={`/events/${d.id}`}>
                      <MoreInfo color='secondary' />
                      <span className='text-c'>Info</span>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='event-item none p10'>No Events Found</div>
          )
        }
      </div>
      <Link href='schedule' className='event-link-normal text-c'>
        View The Full Schedule
      </Link>
    </div>
  )
}