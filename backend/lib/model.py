from db import create_db_instance
from datetime import datetime
from lib.controller import Controller
from lib.field import Field, FieldId, FieldList
from lib.utils import serialize_for_client, create_slug, create_id


class Model(Controller):
	id = Field(editable=False)
	
	def __init__(self, data: dict = None) -> None:
		self._setup_db()
		if data is None: return
		self._setup_model_fields(data)
		self._load_initial_values(data)

	''' EXTERNAL METHODS '''
	# returns the name of the db collection
	def get_collection_name(self) -> str:		
		return self.__class__.__name__.lower()

	def generate_id(self) -> None:
		self._update_value('id', create_id())

	''' INTERNAL METHODS '''
	# sets access to db collection		
	def _setup_db(self) -> None:
		self._db = create_db_instance()[self.get_collection_name()]

	# sets up the lists and dicts of model fields
	def _setup_model_fields(self, data: dict) -> None:
		if '_id' in data.keys(): serialize_for_client(data)
		self._setup_fields()
		for key in self._field_keys: 
			self._field_data[key].init_field(self, key)
			
	# sets data dict and key list for the fields
	def _setup_fields(self) -> None:
		self._field_data: dict[str, Field] = self._get_all_fields()
		self._field_keys: list[str] = self._field_data.keys()

	# returns dict of data fields
	def _get_all_fields(self) -> dict:
		fields = {}
		for cls in reversed(self.__class__.__mro__):
			if cls is object:
				continue
			for k, v in cls.__dict__.items():
				if (self._is_field(k, v)): fields[k] = v
		return fields

	# returns True if it's a valid field
	def _is_field(self, key: str, value: any) -> bool:
		return (
			not key.startswith('_')
			and not callable(value)
			and not isinstance(value, (staticmethod, classmethod))
		)

	def _load_initial_values(self, data: dict) -> None:
		for field in self._field_keys:
			if data and field in data:
				self._update_value(field, data[field])
			else:
				self._update_value(field, self._field_data[field].value)

	def _update_value(self, field: str, value: any) -> None:
		setattr(self, field, value)
		self._field_data[field].set_value(value)

	def _generate(self) -> None:
		for fx in self.__dir__():
			if fx.startswith('generate_'):
				getattr(self, fx)()

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
		self._update_value('slug', slug)