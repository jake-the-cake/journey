from db import db
from bson import ObjectId
from datetime import datetime
from lib.controller import Controller
from lib.field import Field, FieldId, FieldList

class Model(Controller):
	id: str = Field(default=ObjectId, editable=False, type=str)
	
	def __init__(self, data: dict = None) -> None:
		self.is_new = False if data is None else True
		self.__db__ = db[self.__class__.__name__.lower()]
		self.__populate_fields__()
		if data and '_id' in data.keys():
			self.__serialize_for_client__(data)
			self.is_new = False
		self.__update_values__(data)
		if self.is_new is True:
			self.__generate__()

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
			value.model = self
			value.default()
			value.name = key
	
	def __generate__(self) -> None:
		for fx in self.__dir__():
			if fx.startswith('generate_'):
				getattr(self, fx)()
				pass

class User(Model):
	user_name = Field(required=False)
	first_name = Field()
	last_name = Field(required=False)
	email = Field()

class MetaData(Model):
	created_at = Field(default=datetime.now().isoformat())
	created_by = FieldId(model=User)

class Location(Model):
	name = Field()
	town = Field()
	state = Field()
	gps = Field(required=False)
	notes = FieldList()
	meta = FieldId(model=MetaData)

import re
def create_slug(value: str) -> str:
	return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-')

class Event(Model):
	title = Field()
	slug = Field()
	start = Field(required=False)
	end = Field(required=False)
	location = FieldId(model=Location, required=False)
	meta = FieldId(model=MetaData)

	def generate_slug(self) -> None:
		slug = create_slug(self.title)
		if self.contains(slug=slug):
			count = 1
			while True:
				new_slug = '-'.join([slug, str(count)])
				if not self.contains(slug=new_slug): 
					slug = new_slug
					break
				count = count + 1
		self.__update_value__('slug', slug)