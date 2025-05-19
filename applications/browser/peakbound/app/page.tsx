import Link from "next/link"
import CalendarRow from "./_components/CalendarRow"

export default function Home() {

  return (
		<main>
			<div className="primary-card-t text-sm col-10 col-c">
				<p className="italic text-c">Peak Bound is a community wellness movement that blends physical fitness with spiritual growth. Our mission is to create outdoor group programs and events that invite people to experience the beauty of nature while connecting meaningfully with others—no matter their experience level.</p>
				<Link href="/join" className="box-link">Click Here To Join For Free</Link>
			</div>
			<div>
				<h3>Upcoming Events</h3>
				<div className="row-10">
					<div id='event-calendar'>
						<CalendarRow data={ [
							{ dayNumber: 1, eventCount: 0, dayOfWeek: 0, month: 0, year: 2024 },
							{ dayNumber: 2, eventCount: 0, dayOfWeek: 1, month: 0, year: 2024 },
							{ dayNumber: 3, eventCount: 0, dayOfWeek: 2, month: 0, year: 2024 },
							{ dayNumber: 4, eventCount: 0, dayOfWeek: 3, month: 0, year: 2024 },
							{ dayNumber: 5, eventCount: 0, dayOfWeek: 4, month: 0, year: 2024 },
							{ dayNumber: 6, eventCount: 0, dayOfWeek: 5, month: 0, year: 2024 },
							{ dayNumber: 7, eventCount: 1, dayOfWeek: 6, month: 1, year: 2024 }
						] } size='mini' />
					</div>
					<div id='event-list'>
						<Link href="schedule" className="box-link">Click Here To View The Full Schedule</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
