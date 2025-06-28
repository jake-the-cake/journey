'use client'

import { DAY_LABELS_SHORT } from '@/features/calendar/constants'
import { useCalendar } from '@/features/calendar/context'
import CalendarDay from '@/components/calendar/MiniCalendarDay'
import MiniCalendarControls from './MiniCalendarControls'

export default function MiniCalendar() {
  const { calendar } = useCalendar()

  const currentMonth = calendar.currentMonth()
  const isOutOfRange = !calendar.data[calendar.current]

  return (
    <div className='calendar-container'>
			<MiniCalendarControls />
      <div className='calendar mini'>
        <div className='calendar-content'>
          { DAY_LABELS_SHORT.map(name => (
            <div 
							key={'day-' + name}
							className='calendar-dayofweek' 
						>
              <span 
								id={ 'day-' + name }
								className='dayofweek-label' 
							>
                { name }
              </span>
            </div>
          )) }
        </div>
        { isOutOfRange ? (
          <div className='text-c italic p10'>
						Out Of Range
					</div>
        ) : (
          <div className='calendar-content'>
            { currentMonth.extendedDates.map(day => (
              <CalendarDay
                key={ day.id }  
                date={ day }
                isInactive={ currentMonth.month !== day.month }
              />
            )) }
          </div>
        ) }
      </div>
    </div>
  )
}