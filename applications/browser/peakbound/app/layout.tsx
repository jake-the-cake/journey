import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Peak Bound Journeys",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
				<nav>
					Peak Bound Journeys
					<a href="#">Link</a>
				</nav>
        {children}
      </body>
    </html>
  )
}