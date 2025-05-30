import Link from "next/link"
import Calendar from "./_components/Calendar"
import { CalendarProvider } from "./_context/CalendarContext"
import EventListPreview from "./_components/EventListPreview"

export default function Home() {

  return (
		<main>
			<p className="italic text-c mb-10">Peak Bound is a community wellness movement that blends physical fitness with spiritual growth. Our mission is to create outdoor group programs and events that invite people to experience the beauty of nature while connecting meaningfully with others—no matter their experience level.</p>
			<div className="card text-sm col-10 text-c">
				<p>Whether you're looking for a fresh start or need a little help with performance, we are here to help you reach your goals.</p>
				<Link href="/join" className="box-link">Click Here To Join For Free</Link>
			</div>
			<div>
				<h3>Upcoming Events</h3>
				<div className="row-10 flip-col">
					<CalendarProvider>
						<Calendar size="mini" />
						<EventListPreview />
					</CalendarProvider>
				</div>
			</div>
			<div>
				<h3>Join A Program</h3>
				<ul>
					<li>Stability</li>
					<li>Performance</li>
					<li>Endurance</li>
					<li>Wellness</li>
				</ul>
			</div>
			<div>
				<h3>Recent Media</h3>
			</div>
			<div>
				<h3>Support Our Mission</h3>
			</div>
		</main>
	)
}
