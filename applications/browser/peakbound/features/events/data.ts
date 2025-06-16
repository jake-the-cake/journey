class EventsData {
	data: any
	isPopulated: boolean

	constructor(data: any = {}) {
		this.data = data
		this.isPopulated = false
	}
	
	async populateData(): Promise<void> {
    const response = await fetch('http://localhost:8000/events')
    if (!response.ok) {
      throw new Error('Failed to fetch events data')
    }
    const events = await response.json()
    events.forEach((event: any) => {
			console.log(event)
			const id = event.start.split(':')[0]
      if (!this.data[id]) this.data[id] = []
      this.data[id].push(event)
    })
		console.log('Populated:', this.data)
    return this.data 
	}
}

export { EventsData }