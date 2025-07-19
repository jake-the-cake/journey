class Controller:
	
	@classmethod	
	def find(cls, **query) -> list:
		return cls.__db__.find(query)