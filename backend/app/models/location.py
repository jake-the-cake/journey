from pydantic import Field, BaseModel
from bson import ObjectId
from datetime import datetime
from typing import Optional
from .config import PyObjectId

class Location(BaseModel):
	id: Optional[PyObjectId] = Field(alias="_id", default_factory=PyObjectId)
	name: str
	town: str
	state: str
	gps: Optional[str] = None
	direction: Optional[str] = None
	created_at: Optional[str] = Field(default_factory=lambda: datetime.now(datetime.timezone.utc).isoformat())

	model_config = {
		"populate_by_name": True,
		"arbitrary_types_allowed": True,
		"json_encoders": { ObjectId: str }
	}