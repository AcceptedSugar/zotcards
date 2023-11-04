from flask import Blueprint, request, jsonify
import json

from sqlalchemy.testing import db

from zotcards.server.model import User

api = Blueprint("api", __name__)


@api.route("/")
def index():
    return "index"


@api.route("/api/auth/signup", methods=["GET", "POST"])
def testdata():
    data = request.json

    email = jsonify(data.get('email'))

    new_user = User(email=email)
    db.session.add(new_user)
    db.session.commit()