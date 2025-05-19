'use client';

import Link from "next/link"
import Script from "next/script"

export default function Navbar() {

	return (
		<>
		<nav>
			<div className="main-logo-mask">
				<Link href="/">
					<img src="peakboundmountains.png" className="main-logo" alt="" />
				</Link>
			</div>
			<div className="menu-bar">
				<ul>
					<li><Link href={ '/schedule' }>Schedule</Link></li>
					<li><Link href={ '/programs' }>Programs</Link></li>
					<li><Link href={ '/aboutus' }>About Us</Link></li>
					<li><Link href={ '/support' }>Support</Link></li>
				</ul>
			</div>
		</nav>
		<Script id="nav-scroll-handler" strategy="lazyOnload">
			{`
				const nav = document.querySelector('nav')
				const main = document.querySelector('main')
				const className = 'nav-h'
				if (nav && main) {
					let triggerHeight = nav.offsetHeight
					window.addEventListener('scroll', function () {
					if (window.scrollY > triggerHeight && !nav.classList.contains(className)) {
						nav.classList.add(className)
						triggerHeight = nav.offsetHeight
						main.style.marginTop = triggerHeight + 50 + 'px'
					}
					if (window.scrollY <= triggerHeight && nav.classList.contains(className)) {
						nav.classList.remove(className)
						triggerHeight = nav.offsetHeight
						main.style.marginTop = '0px'
					}
					})
				}
			`}
		</Script>
		</>
	)
}