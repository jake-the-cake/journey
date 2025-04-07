'use client';

import { MouseEvent } from "react"
import Link from "next/link"

export default function Navbar() {
	
	function handleMenuClick(e: MouseEvent<HTMLDivElement>) {
		console.log("Menu clicked")
		e.preventDefault()
	}

	function getCategoryList(target: HTMLDivElement): HTMLDivElement | void {
		const parent = target.parentNode
		if (!parent) throw new Error('Missing navbar element.')
		const list = parent!.querySelector('.menu-category-items')
		if (list) return list as HTMLDivElement
	}

	function handleExpandClose(list: HTMLDivElement): (e: MouseEvent<HTMLDivElement>) => void {
		return function(e: MouseEvent<HTMLDivElement>) {
			if (list && !list.contains(e.currentTarget)) {
				list.classList.remove('expanded-menu-category')
			}
		}
	}

	function handleExpand(e: MouseEvent<HTMLDivElement>) {
		const list = getCategoryList(e.currentTarget)
		if (list) {
			list?.classList.add('expanded-menu-category')
			document.addEventListener('click', handleExpandClose(list), { once: true })
		}
	}

	return (
		<nav>
			<div className="logo">
				<Link href="/">
					Peak Bound Journeys
				</Link>
			</div>
			<div className="menu-icon" onClick={ handleMenuClick }>
				<div className="menu-bar"></div>
				<div className="menu-bar"></div>
				<div className="menu-bar"></div>
			</div>
			<ul className="menu">
				<div className="menu-mask"></div>
				<li>
					<div className="menu-category" onClick={ handleExpand }>Learn More</div>
					<div className="menu-category-items">
						<div><a href="mission">Our Mission</a></div>
						<div>Company History</div>
					</div>
				</li>
				<li>
					<div className="menu-category" onClick={ handleExpand }>Learn More</div>
					<div className="menu-category-items">
						<div>One</div>
						<div>Two</div>
					</div>
				</li>
			</ul>
		</nav>
	)
}