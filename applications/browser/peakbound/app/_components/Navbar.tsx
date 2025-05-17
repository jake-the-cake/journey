'use client';

import Link from "next/link"

export default function Navbar() {

	return (
		<nav>
			<div className="main-logo">
				<img src="peakboundmountains.png" className="main-logo" alt="" />
			</div>
			<div className="menu-bar">
				<ul>
					<li><Link href={ '/schedule'}>Schedule</Link></li>
					<li><Link href={ '/programs'}>Programs</Link></li>
					<li><Link href={ '/aboutus'}>About Us</Link></li>
					<li><Link href={ '/donate'}>Donate</Link></li>
				</ul>
			</div>
		</nav>
	)
}