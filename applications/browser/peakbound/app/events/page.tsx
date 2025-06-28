import MiniCalendar from "@/components/calendar/MiniCalendar";

export default function EventsPage() {
	return (
		<main className="col-10">
			<h1 className="text-c">List Of Events</h1>
			<div className="row-10 flip-col-rev">
				<div className="event-list">
					Events
				</div>
				<MiniCalendar />
			</div>
		</main>
	)
}