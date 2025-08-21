class Field:

	_default_settings = [
		('auto', False),
		('visible', True),
		('editable', True),
		('required', True),
		('unique', False),
		('default', None),
		('type', str)
	]

	def __init__(self, **kwargs):
		self.set_value(None)
		self._settings = {}
		self._settings_list = self._default_settings
		self._load_settings(**kwargs)

	def _load_settings(self, **kwargs) -> None:
		for setting in self._settings_list: self._settings[setting[0]] = kwargs.get(*setting)

	def _default(self) -> None:
		default_value = self._settings['default']
		if default_value is None:
			return
		if callable(default_value):
			value = default_value()
		else:
			value = default_value
		if value is not None and not isinstance(value, self._settings['type']):
			value = self._settings['type'](value)
		self.set_value(value)

	def _is(self, arg) -> bool:
		if arg not in self._settings.keys():
			raise KeyError(f'Invalid settings key: { arg }')
		return self._settings[arg] == True

	def init_field(self, model: any, name: str) -> None:
		self.model: any = model
		self.name: str = name
		self.error = None
		self._default()

	def set_value(self, value):
		self.value = value

	def is_required(self) -> bool:
		return self._is('required')

	def is_hidden(self) -> bool:
		return self._is('hidden')

	def validate(self) -> None:
		if self.is_required() and self.value == None:
			raise ValueError(f'{ self.name } field is required.')

class FieldList(Field):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)

class FieldId(Field):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)
		# specify id is a string
		self._settings['type'] = str
		# verify model exists and is valid
		if not self._settings['model']:
			raise ValueError('A model is required for a FieldId relationship.')
		
	def _load_settings(self, **kwargs):
		self._settings_list += [
			('populate', True),
			('model', None)
		]
		super()._load_settings(**kwargs)

	def _create_new_instance(self):
		pass

	def init_field(self, model, name):
		super().init_field(model, name)
		if self.value is None:
			x = self._settings
			self.set_value(self._settings['model']().id)

		print(self.value)
		# query = self._settings['model'].find()
		# if len(query) < 1 and self.is_required():
		# 	raise LookupError(f'{ self._settings['model'].__name__ } id "{ self.value }" not found.')

	def _pass_data(self):
		print('somethins')

class FieldIdList(FieldList, FieldId):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)