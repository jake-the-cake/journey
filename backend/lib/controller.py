class Controller:
	
	def find(self, **query) -> list:
		return self.__db__.find(query)

	def insert(self) -> dict:
		data = self.data()
		print(data)
		self.__serialize_for_mongo__(data)
		result = self.__db__.insert_one(data)
		return result.inserted_id
	
	def delete(self, id: str) -> None:
		if not id:
			return
		self.__db__.delete_one({'_id': id})

	def data(self) -> dict:
		data = {}
		for field in self.__fields__:
			data[field] = getattr(self, field)
		return data