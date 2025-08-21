from lib.model import Model
from lib.field import Field, FieldId, FieldList
from models.metadata import MetaData

class Location(Model):
	name = Field()
	town = Field()
	state = Field()
	gps = Field(required=False)
	notes = FieldList()
	meta = FieldId(model=MetaData)