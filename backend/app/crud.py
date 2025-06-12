from .database import db
from .models import Event

async def get_events():
	events = await db.events.find().to_list(100)
	return [Event(**event) for event in events]

async def create_event(event: Event):
	result = await db.events.insert_one(event.dict(by_alias=True))
	return str(result.inserted_id)

async def remove_events():
	result = await db.events.delete_many({})
	return {"deleted_count": result.deleted_count}