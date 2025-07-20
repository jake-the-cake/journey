class Controller:
	
	def find(self, **query) -> list:
		if 'id' in query.keys():
			self.__serialize_for_mongo__(query)
		result = [r for r in self.__db__.find(query)]
		for r in result:
			self.__serialize_for_client__(r)
		return result

	def insert(self) -> dict:
		for field in self.__fields__.values():
			field.validate()
		data = self.data()
		self.__serialize_for_mongo__(data)
		result = self.__db__.insert_one(data)
		return result.inserted_id
	
	def delete(self, id: str) -> None:
		if not id: return
		self.__db__.delete_one({ '_id': id })

	def data(self) -> dict:
		data = {}
		for field in self.__fields__:
			data[field] = getattr(self, field)
		return data