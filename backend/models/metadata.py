from datetime import datetime

from lib.model import Model
from lib.field import Field, FieldId, FieldList
from models.user import User

class MetaDataUpdate(Model):
	created_at = Field(default=datetime.now().isoformat())
	created_by = FieldId(model=User, id='user')

class MetaData(MetaDataUpdate):
	updates = FieldList(required=False)