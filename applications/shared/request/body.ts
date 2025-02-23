/*
	NOTES FOR RequestBody
	*********************
	- This class should be able to handle different types of Objects 
	*********************
*/

import { DataObjectType } from '../types'

class RequestBody {
	/*
		Takes in form data and parses it into a data object during the init.
		
		** properties:
			1. object (Object) - Contains form data.
		
		** methods:
			1. setData (void) - Parses form data.
			2. insert (void) - Sets an individual Object property.
			3. data (string) - Returns JSON string on the 'object' property.
	*/
	object: DataObjectType

	constructor(data: FormData) {
		/*
			Inits an empty Object and then fills it with parsed form data using 'setData'.
			*** SEE NOTES
			
			** arguments:
				1. data (FormData) - The form data Object.
		*/
		this.object = {}
		this.setData(data)
	}

	setData(data: FormData): void {
		/*
			Takes the form data, and parses it into 'object' by iterating the data and adding each key/value to 'object' using 'insert'.
			
			>>> No return
		
			** arguments:
				1. data (FormData) - The form data Object.
		*/
		Array.from(data).forEach(([key, value]: any): void => {
			this.insert(key, value)
		})
	}

	insert(key: string, value: string): void {
		/*
			Sets a key/value pair in 'object'.

			>>> No return

			** arguments:
				1. key (string)
				2. value (string)
		*/
		this.object[key] = value
	}

	data(): string {
		/*
			Return JSON of 'object' as a string. 
		
			>>> Return string
			 
			** No arguments
		*/
		return JSON.stringify(this.object)
	}
}

export { RequestBody }