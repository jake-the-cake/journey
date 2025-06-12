function getFebruaryDayCount(year: number): number {
	return year % 4 === 0 ? 29 : 28;
}

export {
	getFebruaryDayCount
}