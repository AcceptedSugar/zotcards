from flask import request, Blueprint
from flask_login import LoginManager, logout_user

from .model import db, User

auth = Blueprint("auth", __name__)

login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@auth.route("/auth/login", methods=["GET", "POST"])
def login():
    data = request.json

    user_email = data.get('user_email')

    user = User.query.filter_by(email=user_email).first()

    if not user:
        new_user = User(email=user_email)
        db.session.add(new_user)
        db.session.commit()

@auth.route("/auth/logout", methods=["GET", "POST"])
def logout():
    logout_user()
