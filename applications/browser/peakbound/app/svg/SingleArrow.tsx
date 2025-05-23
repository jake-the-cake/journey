export default function SingleArrow({ direction = 'up', id }: any) {
	const paths: any = {
		up: 'M0 10 L5 0 L10 10 L5 7 L0 10 Z',
		down: 'M0 0 L5 10 L10 0 L5 3 L0 0 Z',
		left: 'M10 0 L0 5 L10 10 L7 5 L10 0 Z',
		right: 'M0 0 L10 5 L0 10 L3 5 L0 0 Z'
	}
	return (
		<svg viewBox="0 0 10 10" xlmns="http://www.w3.org/2000/svg" id={ id }>
			<path d={ paths[direction] } fill="var(--primary)" />
		</svg>
	)
}
