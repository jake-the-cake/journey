import Link from "next/link"
import CalendarRow from "./_components/CalendarRow"
import Calendar from "./_components/Calendar"

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
					<Calendar />
					<div id='event-list'>
						<Link href="schedule" className="box-link">Click Here To View The Full Schedule</Link>
					</div>
				</div>
			</div>
			<div>hi</div>
		</main>
	)
}
