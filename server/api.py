from flask import Blueprint, jsonify

api = Blueprint("api", __name__)


@api.route("/api/testdata")
def testdata():
    return jsonify({'test': 'data'})
