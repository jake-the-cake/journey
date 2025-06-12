import "./globals.css"
import type { Metadata } from "next"
import Navbar from "./_components/Navbar"
// import { publicCalendar } from "@/features/calendar/read"

export const metadata: Metadata = {
  title: "Peak Bound",
  description: "Peak Bound is a community wellness movement that blends physical fitness with spiritual growth. Our mission is to create outdoor group programs and events that invite people to experience the beauty of nature while connecting meaningfully with others—no matter their experience level.",
}

export default async function RootLayout({ children }: Readonly<{  children: React.ReactNode }>) {
	// const calendars = await publicCalendar()
  return (
    <html lang="en">
      <body className={`antialiased`}>
				<Navbar />
        {children}
      </body>
    </html>
  )
}