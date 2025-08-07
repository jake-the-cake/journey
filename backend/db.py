import os
import socket
from pymongo import MongoClient

def is_connected():
	dns = ('8.8.8.8', 53)
	try:
		socket.setdefaulttimeout(3)
		socket.socket(
			socket.AF_INET, 
			socket.SOCK_STREAM
		).connect(dns)
		return True
	except socket.error:
		return False
	
def create_db_instance():
	URI_DEV = os.getenv('MONGO_DEV', None)
	URI_LIVE = os.getenv('MONGO_URI', None)
	MONGO_DB_NAME = os.getenv('MONGO_DB_NAME', None)
	check = all([URI_DEV, URI_LIVE, MONGO_DB_NAME])

	if check is False:
		raise ValueError('MISSING REQUIRED ENV VARIABLE(S) FOR THE DATABASE.')

	client = MongoClient(URI_LIVE if is_connected() else URI_DEV)
	return client[MONGO_DB_NAME]