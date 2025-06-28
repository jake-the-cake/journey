import Link from "next/link"
import UpcomingEvents from "@/components/events/UpcomingEvents"

export default function Home() {

  return (
		<main>
			<section>
				<p>Something else can go here first.</p>
				<p className="block-quote text-c">Peak Bound is a community wellness movement that blends physical fitness with spiritual growth. Our mission is to create outdoor group programs and events that invite people to experience the beauty of nature while connecting meaningfully with others—no matter their experience level.</p>
				<div className="card primary-t text-sm col-10 text-c">
					<p>Whether you're looking for a fresh start or need a little help with performance, we are here to help you reach your goals.</p>
					<Link href="/join" className="box-link">Click Here To Join For Free</Link>
				</div>
			</section>
			<section>
				<h3>Upcoming Events</h3>
				<UpcomingEvents />
			</section>
			<section>
				<h3>Join A Program</h3>
				<div className="card-list row-10">
					<div className="card secondary">Stability</div>
					<div className="card accent">Performance</div>
					<div className="card secondary">Endurance</div>
					<div className="card accent">Strength</div>
					<div className="card secondary">Recovery</div>
					<div className="card accent">Wellness</div>
				</div>
			</section>
			<section>
				<h3>Recent Media</h3>
			</section>
			<section>
				<h3>Support Our Mission</h3>
			</section>
		</main>
	)
}
