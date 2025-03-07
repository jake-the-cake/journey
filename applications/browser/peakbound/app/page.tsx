'use client';

import { useEffect } from 'react'
import internal from 'stream';

export default function Home() {

	useEffect(() => {
		const p: HTMLElement | null = document.querySelector('.pyramid-list')
		if (!p) return
		
		const cards: Element[] = Array.from(p.children)
		return dropCard(0)
		
		function resetCards(): void {
			cards.forEach((card: Element) => {
				card.classList.remove('dropped')
			})
			useTimeout(dropCard, 0)
		}

		function dropCard(index: number = 0): void {
			cards[index].classList.add('dropped')
			index++
			if (cards.length > index) useTimeout(dropCard, index)
			else useTimeout(resetCards)
		}

		type argFunction = (args: any) => void

		function useTimeout(callback: () => void | argFunction, ...args: any) {
			setTimeout(() => {
				callback(...args)
			}, 1500)
		}
	}, [])

  return (
		<main>
			<section className="full secondary">
				<div className="hero-head">
					<h1 className='hero'>Who Are You?</h1>
					<p className='hero'>
						More importantly... who do you <span className="bold">want</span> to be?
					</p>
				</div>
			</section>
			<section className="full nature">
				<div className="pyramid-container">
					<button>Start On Your Path</button>
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
