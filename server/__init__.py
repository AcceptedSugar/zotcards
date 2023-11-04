from flask import Flask
from flask_cors import CORS

from zotcards.server.api import api


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SECRET_KEY"] = "my-secret"

    app.register_blueprint(api)

    return app
