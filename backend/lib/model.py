from db import db
from bson import ObjectId
from datetime import datetime
from lib.controller import Controller
from lib.field import Field, FieldId

class Model(Controller):
	id: str = Field(default=ObjectId, editable=False, type=str)
	
	def __init__(self, data: dict = None) -> None:
		self.__db__ = db[self.__class__.__name__.lower()]
		self.__populate_fields__()
		if data and '_id' in data.keys():
			self.__serialize_for_client__(data)
		self.__update_values__(data)

	def __serialize_for_client__(self, data) -> None:
		data['id'] = data['_id']
		del data['_id']

	def __serialize_for_mongo__(self, data) -> None:
		data['_id'] = data['id']
		del data['id']

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

	def __update_value__(self, field: str, value: any) -> None:
		setattr(self, field, value)
		self.__fields__[field].set_value(value)

	def __update_values__(self, data: dict) -> None:
		for field in self.__fields__.keys():
			if data and field in data:
				self.__update_value__(field, data[field])
			else:
				self.__update_value__(field, self.__fields__[field].value)

	def __populate_fields__(self) -> None:
		self.__fields__ = self.__get_all_fields__()
		for key in self.__fields__.keys(): 
			value = self.__fields__[key]
			value.default()
			value.name = key

class MetaData(Model):
	date = Field(default=datetime.now().isoformat())

class Event(Model):
	title = Field()
	meta = FieldId(model=MetaData)