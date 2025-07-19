class Field:

	def __init__(self, **kwargs):
		self.__settings__ = {
			'visible': kwargs.get('visible', True),
			'editable': kwargs.get('editable', True),
			'required': kwargs.get('required', True),
			'unique': kwargs.get('unique', False),
			'default': kwargs.get('default', None),
			'type': kwargs.get('type', str)
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