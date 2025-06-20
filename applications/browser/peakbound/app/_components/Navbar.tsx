'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface NavLinkDataType {
	href: string
	label: string
	classList?: string[]
}

const navLinks: NavLinkDataType[] = [
	{
		href: '/events',
		label: 'Events'
	}, {
		href: '/programs',
		label: 'Programs'
	}, {
		href: '/media',
		label: 'Media'
	}, {
		href: '/info',
		label: 'Info'
	}, {
		href: '/support',
		label: 'Support'
	}
]

export default function Navbar() {
	useEffect(() => {
		const nav:      HTMLElement = document.querySelector('nav')!
		const miniNav:  HTMLElement = nav.cloneNode(true) as HTMLElement
		miniNav.classList.add('nav-h')
		document.body.appendChild(miniNav)
		const triggerHeight: number = nav.offsetHeight

		function containsClass(className: string = 'down'): boolean {
			return miniNav!.classList.contains(className)
		}

		function dropDown() { miniNav.classList.add('down') }
		function raiseUp() { miniNav.classList.remove('down') }

		function onScroll() {
			if (window.scrollY > triggerHeight && !containsClass('down')) dropDown()
			if (window.scrollY < triggerHeight && containsClass('down'))  raiseUp()
		}

		window.addEventListener('scroll', onScroll)
		return () => { window.removeEventListener('scroll', onScroll) }
	}, [])

	return (
		<nav>
			<div className="main-logo-mask">
				<Link href="/">
					<img src="peakboundmountains.png" className="main-logo" alt="" />
				</Link>
			</div>
			<div className="menu-bar">
				<ul>
				{ navLinks.map(link => (
					<li key={ `navlink-${ link.label.toLowerCase() }` }>
						<Link href={ link.href  } className={ link.classList ? link.classList.join(' ') : '' }>{ link.label }</Link>
					</li>
				))}
				</ul>
			</div>
		</nav>
	)
}