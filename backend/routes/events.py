from flask import Blueprint, request, jsonify

router = Blueprint('events', __name__)

@router.get("/events")
def read_events():
	body = request.json
	return jsonify(body)