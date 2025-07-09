from bson          import ObjectId

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