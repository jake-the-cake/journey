/*
	NOTES FOR RequestBody
	*********************
	- This class should be able to handle different types of Objects 
	*********************
*/

import { DataObjectType } from '../types'

/**
 * Class representing a request body.
 */
class RequestBody {
	/**
	 * The object containing form data.
	 * @type {DataObjectType}
	 */
	object: DataObjectType

	/**
	 * Creates an instance of RequestBody.
	 * @param {FormData} data - The form data object.
	 */
	constructor(data: FormData) {
			this.object = {}
			this.setData(data)
	}

	/**
	 * Parses the form data and sets it to the object property.
	 * @param {FormData} data - The form data object.
	 */
	setData(data: FormData): void {
			(Array.from(data) as string[][]).forEach(([key, value]: string[]): void => {
					this.insert(key, value)
			})
	}

	/**
	 * Sets a key/value pair in the object property.
	 * @param {string} key - The key of the object property.
	 * @param {string} value - The value of the object property.
	 */
	insert(key: string, value: string): void {
			this.object[key] = value
	}

	/**
	 * Returns the JSON string representation of the object property.
	 * @returns {string} The JSON string representation of the object property.
	 */
	data(): string {
			return JSON.stringify(this.object)
	}
}

export { RequestBody }