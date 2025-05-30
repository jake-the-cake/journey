type Props = {
  color: string
}

export default function MoreInfo({ color }: Props) {

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke={ `var(--${ color })` }
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="16" x2="12" y2="12" />
			<circle cx="12" cy="8" r="1" />
		</svg>
	)
}