from flask import Blueprint, request
from sqlalchemy.testing import db

from zotcards.server.model import User, CardSet, Card, AnswerChoice

api = Blueprint("api", __name__)


@api.route("/")
def index():
    return "index"


@api.route("/api/auth/signup", methods=["GET", "POST"])
def testdata():
    data = request.json

    # GET DATA
    #

    new_user = User(email='')  # CHANGE
    db.session.add(new_user)
    db.session.commit()


@api.route("/api/auth/create-card-set", methods=["GET", "POST"])
def testdata():
    data = request.json

    # GET DATA

    #

    # CHANGE
    card_set = CardSet()
    cards = [Card()]
    answer_choices = [AnswerChoice()]

    for card in cards:
        card_set.cards.append(card)

    for answer_choice in answer_choices:
        card_set.cards.append(answer_choice)
    #

    db.session.add(card_set)
    db.session.commit()
