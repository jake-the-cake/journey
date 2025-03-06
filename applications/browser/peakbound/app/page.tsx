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
			<section className="full secondary">
				<h1 className='hero'>Who Are You?</h1>
				<p className='hero'>
					More importantly... who do you want to be?
				</p>
			</section>
			<section className="full nature">
				<div className="pyramid-container">
					<button>Create Your New Path</button>
					<div className="pyramid-list">
						<h2>Recover</h2>
						<h2>Rebuild</h2>
						<h2>Redeem</h2>
					</div>
				</div>
			</section>
		</main>
	);
}
