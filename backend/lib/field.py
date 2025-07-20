class Field:

	def __init__(self, **kwargs):
		self.name = 'NO_NAME_ERR'
		self.set_value(None)
		self.__settings__ = {
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

	def set_value(self, value):
		self.value = value
		
	def default(self) -> None:
		default_value = self.__settings__['default']
		if default_value is None:
			return
		if callable(default_value):
			value = default_value()
		else:
			value = default_value
		if value is not None and not isinstance(value, self.__settings__['type']):
			value = self.__settings__['type'](value)
		self.set_value(value)

	def validate(self) -> None:
		if self.__settings__['required'] == True and self.value == None:
			raise ValueError(f'{ self.name } field is required.')

class FieldList(Field):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)

class FieldId(Field):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)
		# specify id is a string
		self.__settings__['type'] = str
		# verify model exists and is valid
		if not self.__settings__['model']:
			raise ValueError('A model is required for a FieldId relationship.')

class FieldIdList(FieldList, FieldId):

	def __init__(self, **kwargs):
		super().__init__(**kwargs)