import openai
import os
from dotenv import load_dotenv, dotenv_values
from flask import Flask, request, jsonify
from zotcards.server.api import api
from . import create_app

# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()
API_KEY = os.environ.get("API_KEY")
openai.api_key = API_KEY

def get_gpt_message(prompt, model="gpt-3.5-turbo"):
  messages = [{"role": "user", "content": prompt}]
  response = openai.ChatCompletion.create(model=model,messages=messages,temperature=0)
  return response.choices[0].message["content"]

@app.route("/chat/<chat_text>") # this is a test function to see if GPT is returning any text or if API is not working
def chat(chat_text):
    response = get_gpt_message(chat_text)
    return response, 200


@app.route("/get-question/<notes>/<question_type>")
def get_question(notes, question_type):
    # notes is the string of text representing the person's notes
    # question_type is either "MCQ" or "TrueFalse" 

    notes_prompt = f"""Generate 5 {question_type} questions based on the notes I have provided below. 
    Format it in a list as shown below, with each element in the list representing an object of the information
    in a question. 
        [
            {{
                'question_description': '(Enter question here)'
                'answer_choices': {{
                    'A': '(Choice A here)',
                    'B': '(Choice B here)',
                    'C': '(Choice C here)',
                    'D': '(Choice D here)',
                }}
                'correct': '(LETTER of the correct answer here)'
            }}
        ]
    
    I gave the object structure for one question above but repeat for the other questions too in the same list. 
    Here are the notes: """


    final_prompt = notes_prompt + notes
    response = get_gpt_message(final_prompt)
    return response, 200


@app.route("/")
def home():
   return "Home"

if __name__ == '__main__':
    app = create_app()

    app.run(debug=True)
