from flask import Blueprint, request

api = Blueprint("api", __name__)


@api.route("/")
def index():
    return "index"


@api.route("/api/auth/signup", methods=["GET", "POST"])
def testdata():
    data = request.data

    # new_user = User(email=email)
    # db.session.add(new_user)
    # db.session.commit()

    return data
