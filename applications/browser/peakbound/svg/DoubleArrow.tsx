type Props = {
  id?: string
  direction: 'left' | 'right' | 'up' | 'down'
  onClick?: () => void
}

export default function DoubleArrow({ direction = 'up', id, onClick }: Props) {
	const paths: any = {
		up: 'M0 10 L3 6 L0 6 L5 0 L10 6 L7 6 L 10 10 Z',
		down: 'M0 0 L3 4 L0 4 L5 10 L10 4 L7 4 L10 0 Z',
		left: 'M10 0 L6 3 L6 0 L0 5 L6 10 L6 7 L10 10 Z',
		right: 'M0 0 L4 3 L4 0 L10 5 L4 10 L4 7 L0 10 Z'
	}
	return (
		<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" id={ id } onClick={ onClick } className="single-arrow">
			<path d={ paths[direction] } fill="var(--primary)" />
		</svg>
	)
}