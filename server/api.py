import os

import openai
from dotenv import load_dotenv
from flask import Blueprint, request
from sqlalchemy.testing import db

from zotcards.server.model import User, CardSet, Card, AnswerChoice

api = Blueprint("api", __name__)


@api.route("/")
def index():
    return "index"


@api.route("/api/auth/signup", methods=["GET", "POST"])
def signup():
    data = request.json

    # GET DATA
    #

    new_user = User(email='')  # CHANGE
    db.session.add(new_user)
    db.session.commit()


@api.route("/api/auth/create-card-set", methods=["GET", "POST"])
def create_card_set():
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


# ********** GPT API ********** #

load_dotenv()
API_KEY = os.environ.get("API_KEY")
openai.api_key = API_KEY


def get_gpt_message(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(model=model, messages=messages, temperature=0)
    return response.choices[0].message["content"]


# this is a test function to see if GPT is returning any text or if API is not working
@api.route("/api/chat", methods=["GET", "POST"])
def chat():
    data = request.json
    chat_text = data.get('chat_text')

    response = get_gpt_message(chat_text)
    return response, 200


@api.route("/api/get-question", methods=["GET", "POST"])
def get_question():
    # notes is the string of text representing the person's notes
    # question_type is either "MCQ" or "TrueFalse"

    data = request.json

    notes = data.get('notes')
    question_type = data.get('question_type')

    notes_prompt = f"""Generate 5 {question_type} questions based on the notes I have provided below. Format it in JSON format like so:
        {{
            'q1': {{
                'question': '(Enter question here)'
                'choices': {{
                    'A': '(Choice A here)',
                    'B': '(Choice B here)',
                    'C': '(Choice C here)',
                    'D': '(Choice D here)',
                }}
                correct': '(LETTER of the correct answer here)'
            }}
        }}
    I gave the structure for one question above but repeat for the other questions too in the same JSON object.
    Here are the notes: '"""

    final_prompt = notes_prompt + notes
    response = get_gpt_message(final_prompt)
    return response, 200
