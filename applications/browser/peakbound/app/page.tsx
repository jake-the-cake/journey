'use client';

import { useEffect } from 'react'

export default function Home() {

	useEffect(() => {
		const p: any = document.querySelector('.pyramid-list')
		console.log(p)
		if (!p) return
		const cards: HTMLElement[] = Array.from(p.children)
		return dropCard(0)
		function dropCard(index: number = 0): void {
			cards[index].classList.add('dropped')
			console.log(index)
			index++
			if (cards.length > index) {
				setTimeout(() => {
					dropCard(index)
				}, 1500)
			}
		}
		// Array.from(p).forEach((item, index, array) => {

		// })
	}, [])

  return (
		<main>
			<section className="full nature">
				<h1 className='hero'>Who Are YOU?</h1>
				<p></p>
				<div className="pyramid-container">
					<button className="">Create Your New Path</button>
					<div className="pyramid-list">
						<h2 className="">Recover</h2>
						<h2>Rebuild</h2>
						<h2>Redeem</h2>
					</div>
				</div>
			</section>
		</main>
	);
}
