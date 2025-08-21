from lib.model import Model
from lib.field import Field

class User(Model):
	user_name = Field(required=False)
	first_name = Field()
	last_name = Field(required=False)
	email = Field()