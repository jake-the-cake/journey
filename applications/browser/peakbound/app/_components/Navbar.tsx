'use client';

import { EventHandler, MouseEvent } from "react"

export default function Navbar() {
	
	function handleMenuClick(e: MouseEvent<HTMLDivElement>) {
		console.log("Menu clicked")
	}

	function getCategoryList(target: HTMLDivElement): HTMLDivElement | void {
		console.log(target)
		const parent = target.parentNode
		if (!parent) throw new Error('Missing navbar element.')
		const list = parent!.querySelector('.menu-category-items')
		if (list) return list as HTMLDivElement
	}


	function handleExpandClose(list: HTMLDivElement): (e: any) => void {
		return function(e: MouseEvent<HTMLDivElement>) {
			if (list && !list.contains(e.currentTarget)) {
				list.classList.remove('expanded-menu-category')
				console.log(list)
			}
		}
	}

	function handleExpand(e: MouseEvent<HTMLDivElement>) {
		const list = getCategoryList(e.currentTarget)
		if (list) {
			list?.classList.add('expanded-menu-category')
			console.log(list)
			document.addEventListener('click', handleExpandClose(list) as any, { once: true })
		}
	}

	return (
		<nav>
			<div className="logo">
				<a href="/">
					Peak Bound Journeys
				</a>
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