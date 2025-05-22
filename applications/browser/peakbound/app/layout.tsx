import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./_components/Navbar"

export const metadata: Metadata = {
  title: "Peak Bound",
  description: "Peak Bound is a community wellness movement that blends physical fitness with spiritual growth. Our mission is to create outdoor group programs and events that invite people to experience the beauty of nature while connecting meaningfully with others—no matter their experience level.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={`antialiased`}>
				<Navbar />
        {children}
      </body>
    </html>
  )
}