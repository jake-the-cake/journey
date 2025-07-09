from pydantic import Field, BaseModel
from bson import ObjectId
from datetime import datetime
from typing import Optional
from .config import PyObjectId

class Event(BaseModel):
	id: Optional[PyObjectId] = Field(alias="_id", default_factory=PyObjectId)
	# required fields
	title:   str = Field()
	start:   str = Field()
	end:     str = Field()
	# attendance info
	hosts:     list[str] = Field(default_factory=list)
	attendees: list[str] = Field(default_factory=list)
	invites:   list[str] = Field(default_factory=list)
	# general info
	location:    str = Field(default_factory=str)
	description: str = Field(default_factory=str)
	# meta data
	creator:     str = Field()
	created_at:  str = Field(
		default_factory=lambda: datetime.now(datetime.timezone.utc).isoformat()
	)

	model_config = {
		"populate_by_name": True,
		"arbitrary_types_allowed": True,
		"json_encoders": { ObjectId: str }
	}