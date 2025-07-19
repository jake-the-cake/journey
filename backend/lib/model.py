from bson import ObjectId
from lib.controller import Controller

class Model(Controller):
	id: str = str(ObjectId())

	def __init__(self, data: dict):
		print(data)
		if '_id' in data.keys():
			self.__serialize_for_client__(data)
		self.__populate_fields__(data)
		print(self.__get_all_fields__())

	def __init_subclass__(cls):
		from db import db
		cls.__db__ = db[cls.__name__.lower()]

	def __serialize_for_client__(self, data) -> None:
		data.id = data['_id']
		del data['_id']

	def __serialize_for_mongo__(self, data) -> None:
		data['_id'] = data.id
		del data.id

	def __get_all_fields__(self) -> dict:
		fields = {}
		for cls in reversed(self.__class__.__mro__):
			if cls is object:
				continue
			for k, v in cls.__dict__.items():
				if (
					not k.startswith('__')
					and not callable(v)
					and not isinstance(v, (staticmethod, classmethod))
				):
					fields[k] = v
		return fields

	def __update_values__(self, data: dict, field: str = None) -> None:
		if field:
			setattr(self, field, data.get(field, None))
		else:
			for f in self.__fields__:
				setattr(self, f, data.get(f, None))

	def __populate_fields__(self, data: dict) -> None:
		self.__fields__ = self.__get_all_fields__()
		self.__update_values__(data)

class Event(Model):
	title = 'Title'