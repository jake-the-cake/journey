type DataObjectType = { [key: string]: any }

class RequestBody {

	object: DataObjectType

	constructor(formData: FormData) {
		this.object = {}
		this.setData(formData)
	}

	setData(data: FormData) {
		Array.from(data).forEach(([key, value]: any): void => {
			this.insert(key, value)
		})
	}

	insert(key: string, value: any) {
		this.object[key] = value
	}

	send(object: DataObjectType) {
		return JSON.stringify(object)
	}
}

export { RequestBody }