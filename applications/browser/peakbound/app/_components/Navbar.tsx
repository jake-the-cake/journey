'use client';

import { MouseEvent } from "react"

export default function Navbar() {
	
	function handleMenuClick(e: MouseEvent<HTMLDivElement>) {
		console.log("Menu clicked")
	}

	return (
		<nav>
			<div className="logo">
				Peak Bound Journeys
			</div>
			<div className="menu-icon" onClick={ handleMenuClick }>
				<div className="menu-bar"></div>
				<div className="menu-bar"></div>
				<div className="menu-bar"></div>
			</div>
			<ul className="menu">
				<div className="menu-mask"></div>
				<li>
					<div className="menu-category">Learn More</div>
					<div className="menu-category-items">
						<div>Our Mission</div>
						<div>Comany History</div>
					</div>
				</li>
				<li>
					<div className="menu-category">Learn More</div>
					<div className="menu-category-items">
						<div>One</div>
						<div>Two</div>
					</div>
				</li>
			</ul>
		</nav>
	)
}