from flask import Flask
from routes.events import router as events_router


app = Flask('peak-bound')

app.register_blueprint(events_router)

from lib.model import Event
Event({
	'title': 'Sample Event',
	'description': 'This is a sample event for testing purposes.',
	'date': '2023-10-01',
	'location': 'Virtual'
})

app.run(debug=True)