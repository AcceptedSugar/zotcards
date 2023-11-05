# from flask import request, Blueprint
#
# from . import google
# from .model import db, User
#
# auth = Blueprint("auth", __name__)
#
#
# @auth.route("/auth/login", methods=["GET", "POST"])
# def login():
#     return google.authorize_redirect(redirect_uri=)
#     data = request.json
#
#     user_email = data.get('user_email')  # FRONTEND NEEDS TO PROVIDE
#
#     new_user = User(email=user_email)
#     db.session.add(new_user)
#     db.session.commit()
#
