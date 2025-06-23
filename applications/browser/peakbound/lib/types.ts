export interface LabelListDictionaryType {
	full: string[],
	short?: string[],
	alt?: string[]
}

export interface LinkDataType {
	href: string
	label: string
	classList?: string[]
}