from flask import Flask, g, request
app = Flask('peak-bound')

from flask_cors import CORS
CORS(app)

@app.before_request
def allow_HTML_access():
	content_type = request.headers.get('Content-Type', '')
	g.body = {} if not 'application/json' in content_type else request.json

from routes.events import router as events_router
app.register_blueprint(events_router)

app.run(debug=True)