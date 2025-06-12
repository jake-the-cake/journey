from bson          import ObjectId
from datetime      import datetime
from pydantic      import BaseModel, Field
from typing        import Optional

class PyObjectId(ObjectId):
	@classmethod
	def __get_validators__(cls):
		yield cls.validate

	@classmethod
	def validate(cls, v, info):
		print(info)
		if isinstance(v, ObjectId):
			return v
		if ObjectId.is_valid(v):
			return ObjectId(v)
		raise ValueError("Invalid ObjectId")

class Event(BaseModel):
	id: Optional[PyObjectId] = Field(alias="_id", default_factory=PyObjectId)
	title: str
	location: str
	start: str
	end: str
	description: Optional[str] = None
	attendees: Optional[list[str]] = Field(default_factory=list)
	created_at: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

	model_config = {
		"populate_by_name": True,
		"arbitrary_types_allowed": True,
		"json_encoders": {ObjectId: str}
	}