from fastapi import APIRouter
from .models.event import Event
from .crud import remove_events, get_events, create_event

router = APIRouter()

@router.get("/events")
async def read_events():
	return await get_events()

@router.post("/events")
async def post_event(event: Event):
	return await create_event(event)

@router.delete("/events")
async def delete_events():
	return await remove_events()