import requests
from flask import Blueprint, jsonify, request
from model import db, User

api = Blueprint("api", __name__)


@api.route("/api/auth/signup", methods=["POST"])
def testdata():
    email = request.args.get('email')
    new_user = User(email=email)

    db.session.add(new_user)
    db.session.commit()

    return "success"
