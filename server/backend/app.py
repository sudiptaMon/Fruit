from flask import Flask
from flask_pymongo import PyMongo
from routes import init_routes
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)

mongo = PyMongo(app)

init_routes(app, mongo)

if __name__ == '__main__':
    app.run(debug=True)
