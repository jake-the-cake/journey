'use client'

import { getLinks } from '@/config/pageLinks'
import { LinkDataType } from '@/lib/types'
import Link from 'next/link'
import { useEffect } from 'react'

// Define the links to be used in the navbar
const LINKS: LinkDataType[] = getLinks(
	'events', 
	'programs', 
	'media', 
	'info', 
	'support'
)

export default function Navbar() {
	useEffect(() => {
		// Get the original nav element
		const nav: HTMLElement | null = document.querySelector('nav')
		if (!nav) return

		// Clone the nav to create the fixed mini nav
		const miniNav: HTMLElement = nav.cloneNode(true) as HTMLElement
		const triggerHeight: number = nav.offsetHeight
		const className: string = 'down'

		// Add the fixed nav class for styling
		miniNav.classList.add('nav-h')
		// Insert the mini nav after the original nav in the DOM
		nav.after(miniNav)

		// Helper functions to check/add/remove the 'down' class
		const hasClass = () => miniNav.classList.contains(className)
		const dropDown = () => miniNav.classList.add(className)
		const raiseUp = () => miniNav.classList.remove(className)

		// Scroll handler to toggle the mini nav visibility
		const onScroll = () => {
			if (window.scrollY > triggerHeight && !hasClass()) dropDown()
			if (window.scrollY < triggerHeight && hasClass()) raiseUp()
		}

		// Attach the scroll event listener
		window.addEventListener('scroll', onScroll)

		// Cleanup: remove event listener and the cloned nav on unmount
		return () => {
			window.removeEventListener('scroll', onScroll)
			miniNav.remove()
		}
	}, [])

	return (
		<nav>
			<div className='main-logo-mask'>
				<Link href='/'>
					<img src='peakboundmountains.png' className='main-logo' alt='' />
				</Link>
			</div>
			<div className='menu-bar'>
				<ul>
					{LINKS.map(link => (
						<li key={`navlink-${link.label.toLowerCase()}`}>
							<Link
								href={link.href}
								className={link.classList ? link.classList.join(' ') : ''}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}