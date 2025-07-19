from flask import Flask
from routes.events import router as events_router


app = Flask('peak-bound')

app.register_blueprint(events_router)

app.run(debug=True)