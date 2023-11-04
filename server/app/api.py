import json
import os

import openai
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from sqlalchemy.testing import db

from .model import User, CardSet, Card, AnswerChoice

api = Blueprint("api", __name__)


@api.route("/api/auth/signup", methods=["GET", "POST"])
def signup():
    data = request.json

    user_email = data.get('user_email')  # FRONTEND NEEDS TO PROVIDE

    new_user = User(email=user_email)
    db.session.add(new_user)
    db.session.commit()


@api.route("/api/get_user_sets", methods=["GET", "POST"])
def get_user_sets():
    data = request.json

    user_email = data.get('user_email')

    user = User.query.filter_by(email=user_email).first()

    card_sets = user.card_sets

    response = {}

    for i, card_set in enumerate(card_sets):
        response[i] = {
            "title": card_set.title,
            "progress": card_set.progress,
            "last_studied": card_set.last_studied,
            "user_id": card_set.user_id
        }

    return jsonify(response)


# ********** GPT API ********** #

load_dotenv()
API_KEY = os.environ.get("API_KEY")
openai.api_key = API_KEY


# this is a test function to see if GPT is returning any text or if API is not working
@api.route("/api/chat", methods=["GET", "POST"])
def chat():
    data = request.json
    chat_text = data.get('chat_text')

    response = get_gpt_message(chat_text)
    return response, 200


def gpt_string_to_array(string):
    string = string.replace("'", '"')
    result = list(json.loads(string).values())
    return result


def get_gpt_message(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(model=model, messages=messages, temperature=0)
    return response.choices[0].message["content"]


def create_card_set(parsed_set):
    card_set = CardSet()
    cards = []

    for card in parsed_set:
        answer_choices = []
        for answer in card["choices"]:
            if answer == card["correct"]:
                answer_choices.append(AnswerChoice(answer_text=card["choices"]["answer"], is_correct=True))
            else:
                answer_choices.append(AnswerChoice(answer_text=card["choices"]["answer"], is_correct=True))
        cards.append(Card(question_text=card, answer_choices=answer_choices))

    db.session.add(card_set)
    db.session.commit()


@api.route("/api/get-question", methods=["GET", "POST"])
def get_question():
    # notes is the string of text representing the person's notes
    # question_type is either "MCQ" or "TrueFalse"

    data = request.get_json()

    notes = data.get('notes')
    question_type = data.get('question_type')

    notes_prompt = f"""Generate 5 {question_type} questions based on the notes I have provided below. Format it in JSON format like so: 
        {{
            'q1': {{
                'question': '(Enter question here)',
                'choices': {{
                    'A': '(Choice A here)',
                    'B': '(Choice B here)',
                    'C': '(Choice C here)',
                    'D': '(Choice D here)',
                }},
                'correct': '(LETTER of the correct answer here)'
            }}

        }}

        I gave the structure for one question above but repeat for the other questions too in the same JSON object.
        Here are the notes: """

    final_prompt = notes_prompt + notes
    response = get_gpt_message(final_prompt)

    parsed_set = gpt_string_to_array(response)
    create_card_set(parsed_set)  # populates database

    return parsed_set, 200


# TEST

@api.route("/api/test", methods=["GET", "POST"])
def api_test():
    return jsonify({"message": "Hello from Flask backend!"}
                   )
