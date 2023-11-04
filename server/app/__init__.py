from flask import Flask
from flask_cors import CORS

from .api import api
from .model import db


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SECRET_KEY"] = "my-secret"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"

    db.init_app(app)

    app.register_blueprint(api)

    return app
