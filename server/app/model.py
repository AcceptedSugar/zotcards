from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(100), unique=True, nullable=False)

    card_sets = db.relationship('CardSet', backref='user')


class CardSet(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100), nullable=False)
    progress = db.Column(db.Integer, default=0, nullable=False)
    last_studied = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.Column(db.Integer, db.ForeignKey('user.id'))

    cards = db.relationship('Card', backref='card_set')


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(5000), nullable=False)
    correct_level = db.Column(db.Integer, default=0, nullable=False)

    card_set = db.Column(db.Integer, db.ForeignKey('card_set.id'))

    answer_choices = db.relationship('AnswerChoice', backref='card')


class AnswerChoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_text = db.Column(db.String(1000), nullable=False)

    card = db.Column(db.Integer, db.ForeignKey('card.id'))

    is_correct = db.Column(db.Boolean, default=False, nullable=False)
