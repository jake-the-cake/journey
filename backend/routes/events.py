import json
from flask import Blueprint, request, jsonify
from lib.model import Event

router = Blueprint('events', __name__)

@router.get("/events")
def read_events():
	props = request.json or {}
	result = Event().find(**props)
	return jsonify(result)

@router.post('/events/create')
def create_event():
	props = request.json or {}
	event = Event(props)
	id = event.insert()
	return jsonify({ "created_event": id })

@router.delete("/events/delete/all")
def delete_events():
	props = request.json or {}
	if 'secret' in props.keys() and props['secret'] == 'delete':
		result = Event().find()
		for r in result:
			Event().delete(r['id'])
		return jsonify({ 'delete_count': len(result) })
	return jsonify({ 'error': 'Invalid secret' }), 403