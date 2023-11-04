import openai
import os
from dotenv import load_dotenv, dotenv_values
from flask import Flask, request, jsonify
from zotcards.server.api import api
from . import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
