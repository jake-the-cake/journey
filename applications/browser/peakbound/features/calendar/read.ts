import { CalendarDayData } 
	from "@/features/calendar/types"
import { CalendarData } 
	from "@/features/calendar/preload"

// Ensure the environment variable for the calendar URL is defined
const url: string | undefined = process.env.NEXT_PUBLIC_CALENDAR_URL
if (url === undefined) {
	throw new Error('NEXT_PUBLIC_CALENDAR_URL is not defined')
}

/**
 * 
 * @returns A promise that resolves to an instance of CalendarData containing the public calendar data.
 * @throws Will throw an error if the fetch fails or if the data format is invalid.
 */
async function publicCalendar(): Promise<CalendarData> {
	// Fetches the public calendar data from the specified URL
	const res = await fetch(url!, {
		// Use the cache for 1 hour
		next: { revalidate: 3600 }
	})
	// Check if the response is ok (status in the range 200-299)
	if (!res.ok) {
		throw new Error(`Failed to fetch calendar data: ${res.status} ${res.statusText}`)
	}
	// Parse the response as JSON
	const data = await res.json()
	// Ensure the data is of the expected type
	if (!Array.isArray(await data)) {
		throw new Error('Invalid calendar data format: expected an array')
	}
	// Create a new CalendarData instance with the fetched data
	const calendarData = new CalendarData()
	// Populate the calendarDays property with the fetched data
	if (await data.length === 0) {
		throw new Error('No calendar data available')
	}
	calendarData.calendarDays = await data.reduce((acc: Record<string, CalendarDayData>, day: CalendarDayData) => {
		acc[day.id] = day
		return acc
	}, {})
	console.log(calendarData.calendarDays)

	return calendarData
}

export { publicCalendar }