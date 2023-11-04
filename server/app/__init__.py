from flask import Flask
from flask_cors import CORS

from .admin import admin
from .api import api
from .model import db, User, CardSet, Card, AnswerChoice


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SECRET_KEY"] = "my-secret"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"

    admin.init_app(app)

    db.init_app(app)

    app.register_blueprint(api)

    return app
