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
		</nav>
	)
}