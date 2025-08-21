from lib.utils import serialize_for_client, serialize_for_mongo
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
			serialize_for_mongo(query)
		result = [r for r in self._db.find(query)]
		for r in result:
			serialize_for_client(r)
		return result

	'''
	CREATE Controls
	'''
	def insert(self) -> dict:
		self._generate()
		for field in self._field_data.values():
			field.validate()
		data = self.data()
		serialize_for_mongo(data)
		result = self._db.insert_one(data)
		return result.inserted_id

	'''
	DELETE Controls
	'''
	@classmethod
	def delete(cls, id: str) -> None:
		return cls()._delete(id)
	def _delete(self, id: str) -> None:
		if not id: return
		self._db.delete_one({ '_id': id })

	'''
	Return types
	'''
	def data(self) -> dict:
		data = {}
		for field in self._field_data:
			data[field] = getattr(self, field)
		return data