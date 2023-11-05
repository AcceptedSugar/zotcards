from authlib.integrations.flask_client import OAuth
from flask import Flask
from flask_cors import CORS

from .admin import admin
from .api import api
from .model import db, User, CardSet, Card, AnswerChoice

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "my-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"

admin.init_app(app)

db.init_app(app)

app.register_blueprint(api)

oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='546003505956-p61t60e1bbtmtl5kfvpe74f8a7hgidhu.apps.googleusercontent.com',
    client_secret='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',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    authorize_prompt=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri='YOUR_REDIRECT_URI',
    client_kwargs={'scope': 'email profile'},
)
