import json
from flask import Blueprint, request, jsonify
from lib.model import Event

router = Blueprint('events', __name__)

@router.get("/events")
def read_events():
	body = request.json or {}
	entry = Event(body)
	entry.insert()
	result = Event().find()
	return jsonify([r for r in result])

@router.delete("/events")
def delete_events():
	result = Event().find()
	for r in result:
		Event().delete(r['_id'])
	return jsonify({})