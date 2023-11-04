**/api/get-question**

returns GPT output

```json
{
  "notes": "",
  "question_type": ""
}
```

**/api/auth/signup**

adds user to db

```json
{
  "email": ""
}
```

**/api/get_user_sets**

returns sets of user

in:
```json
{
  "user_email": ""
}
```

out:
```json
{
  "0": {
    "title": "card_set.title",
    "progress": "card_set.progress",
    "last_studied": "card_set.last_studied",
    "user_id": "card_set.user_id"
  },
  "...": {}
}
```

**/api/auth/create-card-set**

adds card set to db

```json
{
  "card_set_title": "",
  "cards": {
    "question_text": "",
    "answer_choices": {
      "answer_text": "",
      "is_correct": false
    }
  }
}
```