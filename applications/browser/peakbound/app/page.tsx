'use client';

import { useEffect } from 'react'
import DreamBox from './_components/Dreambox';

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

		function useTimeout(callback: argFunction, ...args: any) {
			setTimeout(() => {
				callback(args)
			}, 1500)
		}
	}, [])

  return (
		<main>
			<section className="full apart">
				<div className="hero-head">
					<h1 className='title'>
						Who Are You?
					</h1>
					<p className='caption'>
						More importantly... who do you <span className="bold">want</span> to be?
					</p>
				</div>
				<p>
					We often aim to be the person that others would want to be around, instead of being the person that we want to be around; essentially putting on a performance in order to feel accepted. It's exhausting, for sure, and extremely unnecessary.
				</p>
				<p>
					Life doesn't <span className='bold'>have</span> to be exhausting. You are allowed to take off the mask, and allowed to express yourself in whatever (family friendly) way you choose. All it takes is a dream, and the belief that <span className="italic bold">you deserve to live your dream</span>.
				</p>
				<DreamBox />
				<p>
					How do we accomplish this? A <span className="bold">full</span> transformation of one's self.
				</p>
				<p>
					It's not going to be easy. But, with a community of like-minded individuals, and the guidance of others who have created their new path, this transformation is not only possible, it's inevitable.
				</p>
				<a href="#three-branches" className='page-jump'>See More Below</a>
			</section>
			<section id="three-branches" className="full nature">
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
