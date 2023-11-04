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