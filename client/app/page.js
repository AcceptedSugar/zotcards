"use client";
import Image from 'next/image'
import styles from './page.module.css'
import FlashCard from './components/flashcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import next from 'next';
import MyComponent from "@/app/test/page";

function AnswerChoice( { currentQuestionNumber, currentQuestion, answerChoice, questions, setCurrentQuestion } ) {

  function getNextQuestion(e) { // called when the card is clicked
    e.preventDefault();
    currentQuestionNumber.current += 1

    const nextQuestionNumber = (currentQuestionNumber.current) % (questions.length - 1)
    console.log(nextQuestionNumber)
    setCurrentQuestion(questions[nextQuestionNumber])
  }

  return (
    <div> <button onClick={getNextQuestion}> <p> {currentQuestion.choices[answerChoice]} </p></button> </div>
  )

}

function Card( {questions, currentQuestion, setCurrentQuestion } ) {
  const currentQuestionNumber = useRef(0)

  return (
    <div> 
        This is a card!
        <div> 
          <p> {currentQuestion.question} </p>
        </div>
        <div> 
          <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion} answerChoice={"A"} questions={questions} setCurrentQuestion={setCurrentQuestion}/>
          <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion} answerChoice={"B"} questions={questions} setCurrentQuestion={setCurrentQuestion}/>
          <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion} answerChoice={"C"} questions={questions} setCurrentQuestion={setCurrentQuestion}/>
          <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion} answerChoice={"D"} questions={questions} setCurrentQuestion={setCurrentQuestion}/>
        </div>
    </div>
  )
}

export default function Home() {
  const [questions, setQuestions] = useState([{'question': 'What is the major theme of the first tale?', 'choices': {'A': 'The transitoriness of all things', 'B': 'The efficacy of prayers', 'C': 'How storytelling can mystify history', 'D': 'The mishearing of humans'}, 'correct': 'C'}, {'question': 'Which character in the first tale is compared to the Grinch?', 'choices': {'A': 'Ciappelletto', 'B': 'Cepparello', 'C': 'The priest', 'D': 'The usurers'}, 'correct': 'A'}, {'question': 'What is one of the vices of Ciappelletto?', 'choices': {'A': 'Churchgoing', 'B': 'Blasphemy', 'C': 'Sobriety', 'D': 'Honesty'}, 'correct': 'B'}, {'question': 'Where does Ciappelletto live?', 'choices': {'A': 'Florence', 'B': 'Rome', 'C': 'Paris', 'D': 'Venice'}, 'correct': 'C'}, {'question': 'What happens to Ciappelletto after he falls ill?', 'choices': {'A': 'He becomes a popular saint', 'B': 'He becomes a usurer', 'C': 'He becomes a priest', 'D': 'He becomes a storyteller'}, 'correct': 'A'}])
  const [currentQuestion, setCurrentQuestion] = useState(() => { return questions[0] } )
  const [notes, setNotes] = useState()
  const [questionType, setQuestionType] = useState("MCQ")
  
  const request_body = {
    'notes': notes,
    'question_type': questionType
  }

  async function get_gpt_flashcards(e) {
    e.preventDefault()
    console.log('getting flash cards')
    const url = 'https://awwang3.pythonanywhere.com/api/get-question'
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(request_body)
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //       setQuestions(data);
    //       setCurrentQuestion(data['q1'])
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    
    // const flashcard_questions = await fetch(url, {
    //   method: "POST",          
    //   body: JSON.stringify(request_body)
    // })
    // console.log(flashcard_questions)

    // setQuestions(flashcard_questions)
    // setCurrentQuestion(flashcard_questions['q1'])
  }

  function handleNoteUpdate(e) {
    setNotes(e.target.value)
  }

  function handleQuestionTypeUpdate(e) {
    setQuestionType(e.target.value)
  }

  return (
    <>
      <main className={styles.main}>
        <div className="main">
          <div className="generate-contain">
            <MyComponent  />
            <h1>Transform your Class Notes into Self-Testing </h1>
              <form action="#" className = {styles.form}>
              <textarea onChange={handleNoteUpdate} className ={styles.generate} rows="4" cols="50" placeholder='Copy and Paste your Notes Here...'></textarea>
                
                <button onClick={get_gpt_flashcards} className={styles["icon-button"]}>
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope}/>
                  </div>

                  <p>Transform notes</p>
                  
                </button>
                {
                    questions && currentQuestion ? <Card questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/> : <p> no card now</p>
                }
                <select value={questionType} onChange={handleQuestionTypeUpdate}>
                  <option value="MCQ"> MCQ </option>
                  <option value="True/False"> True/False </option>
                </select>         
              </form>
            </div>
          </div>
      </main>
    </>
    
  )
}
