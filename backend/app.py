from flask import Flask, g, request
from routes.events import router as events_router
from flask_cors import CORS

app = Flask('peak-bound')
CORS(app)

@app.before_request
def allow_HTML_access():
	content_type = request.headers.get('Content-Type', '')
	g.body = {} if not 'application/json' in content_type else request.json

app.register_blueprint(events_router)

app.run(debug=True)