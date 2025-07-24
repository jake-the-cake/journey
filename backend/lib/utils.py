def serialize_for_client(data) -> None:
	data['id'] = data['_id']
	del data['_id']

def serialize_for_mongo(data) -> None:
	data['_id'] = data['id']
	del data['id']

def create_slug(value: str) -> str:
	import re
	return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-')

def create_id() -> str:
	from bson import ObjectId
	print('created')
	return str(ObjectId())