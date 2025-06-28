import Loader from "@/components/Loader";
import MiniCalendar from "@/components/calendar/MiniCalendar";
import EventListPreview from "@/components/events/EventListPreview";

export default function UpcomingEvents() {
	return (
		<div className="row-10 flip-col">
			<Loader id='upcomingevents' loads={['events']} />
			<MiniCalendar />
			<EventListPreview />
		</div>
	)
}