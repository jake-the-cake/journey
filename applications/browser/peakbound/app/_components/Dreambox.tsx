'use client';

import { MouseEvent, useState, useEffect } from 'react'

export default function DreamBox() {

	const [active, setActive] = useState(false)

	useEffect(() => {
		document.querySelector('.dream-box')
			?.querySelector('form')
			?.querySelector('textarea')
			?.focus()
	}, [active])

	function handleExpand(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		setActive(true)
	}

	return (
		<div className="dream-box">
			<div>
			{
				active === false
				? (<>
					<p className='bold'>Everyone has a dream...</p>
					<br />
					<button onClick={ handleExpand }>What Is Yours?</button>
				</>) 
				: (<>
					<form action="#">
						<h2 className="cursive">
							What Is Yours?
						</h2>
						<textarea cols={ 20 } rows={ 5 } placeholder="I really want to be..." />
						<button>Make It Happen</button>
					</form>
				</>)
			}
			</div>
		</div>
	)
}