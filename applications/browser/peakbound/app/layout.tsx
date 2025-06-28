import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import { CalendarProvider } from "@/features/calendar/provider"
import { EventsProvider } from "@/features/events/provider"

export const metadata: Metadata = {
  title: "Peak Bound",
  description: "Peak Bound is a community wellness movement that blends physical fitness with spiritual growth. Our mission is to create outdoor group programs and events that invite people to experience the beauty of nature while connecting meaningfully with others—no matter their experience level.",
}

export default async function RootLayout({ children }: Readonly<{  children: React.ReactNode }>) {

	return (
    <html lang="en">
      <body className={`antialiased`}>
				<CalendarProvider>
					<EventsProvider>
						<Navbar />
						{children}
					</EventsProvider>
				</CalendarProvider>
      </body>
    </html>
  )
}