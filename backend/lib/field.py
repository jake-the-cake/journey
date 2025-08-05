class Field:

	def __init__(self, **kwargs):
		self.set_value(None)
		self._load_settings(**kwargs)

	def _load_settings(self, **kwargs) -> None:
		self._settings = {
			'visible': kwargs.get('visible', True),
			'editable': kwargs.get('editable', True),
			'required': kwargs.get('required', True),
			'unique': kwargs.get('unique', False),
			'default': kwargs.get('default', None),
			'type': kwargs.get('type', str),
			# FieldId extentions
			'populate': kwargs.get('populate', True),
			'model': kwargs.get('model', None)
		}


	def init_field(self, model: any, name: str) -> None:
		self.model: any = model
		self.name: str = name
		self._default()

	def set_value(self, value):
		self.value = value
		
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

	def validate(self) -> None:
		if self._settings['required'] == True and self.value == None:
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

class FieldIdList(FieldList, FieldId):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)