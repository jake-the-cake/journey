class Controller:
	
	def contains(self, **query) -> bool:
		return len(self._find(**query)) > 0

	'''
	READ Controls
	'''
	@classmethod
	def find(cls, **query) -> list:
		return cls()._find(**query)
	@classmethod
	def find_one(cls, **query) -> dict:
		result = cls().find(**query)
		if len(result) > 0: return result[0]
		return None
	def _find(self, **query) -> list:
		if 'id' in query.keys():
			self.__serialize_for_mongo__(query)
		result = [r for r in self.__db__.find(query)]
		for r in result:
			self.__serialize_for_client__(r)
		return result

	'''
	CREATE Controls
	'''
	def insert(self) -> dict:
		for field in self.__fields__.values():
			field.validate()
		data = self.data()
		self.__serialize_for_mongo__(data)
		result = self.__db__.insert_one(data)
		return result.inserted_id
	


	'''
	DELETE Controls
	'''
	@classmethod
	def delete(cls, id: str) -> None:
		return cls()._delete(id)
	def _delete(self, id: str) -> None:
		if not id: return
		self.__db__.delete_one({ '_id': id })

	'''
	Return types
	'''
	def data(self) -> dict:
		data = {}
		for field in self.__fields__:
			data[field] = getattr(self, field)
		return data