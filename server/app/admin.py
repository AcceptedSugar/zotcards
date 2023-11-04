from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from .model import User, CardSet, Card, AnswerChoice, db

admin = Admin(template_mode='bootstrap3')


class UserView(ModelView):
    def __init__(self, session, **kwargs):
        super(UserView, self).__init__(User, session, **kwargs)

    column_list = ('email', 'card_sets')


class CardSetView(ModelView):
    def __init__(self, session, **kwargs):
        super(CardSetView, self).__init__(CardSet, session, **kwargs)

    column_list = ('title', 'progress', 'last_studied', 'user_id', 'cards')


class CardView(ModelView):
    def __init__(self, session, **kwargs):
        super(CardView, self).__init__(Card, session, **kwargs)

    column_list = ('question_text', 'correct_level', 'card_set_id', 'answer_choices')


class AnswerChoiceView(ModelView):
    def __init__(self, session, **kwargs):
        super(AnswerChoiceView, self).__init__(AnswerChoice, session, **kwargs)

    column_list = ('answer_text', 'card_id', 'is_correct')


# Corrected model views set
model_views_to_register = [
    UserView(db.session),
    CardSetView(db.session),
    CardView(db.session),
    AnswerChoiceView(db.session),
]

for model_view in model_views_to_register:
    admin.add_view(model_view)
