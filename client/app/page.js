"use client";
import Image from 'next/image'
import styles from './page.module.css'
import FlashCard from './components/flashcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import next from 'next';
import MyComponent from "@/app/test/page";

function Card( {questions, currentQuestion } ) {
  const currentQuestionNumber = useRef(0)
  
  // currentQuestion state starts at 
  // when user selects the right answer, the answer choice box will light green 
  // and the currentQuestion state will be 

  function getNextQuestion() { // called when the card is clicked
    currentQuestionNumber.current += 1
    questionKeys = Object.keys(questions)

    const nextQuestionNumber = (currentQuestionNumber.current) % (questionKeys.length - 1)
    const currentQuestionData = questions[questionKeys[nextQuestionNumber]]    
    setCurrentQuestion(currentQuestionData)

    // setCurrentQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)
  }


    // questionKeys.current = Object.keys(flashcard_questions) // list of the question keys, ['q1', 'q2', 'q3] etc.. 
    // setQuestions(flashcard_questions)
  

  // useEffect(() => { // get_gpt_flashcards runs whenever the button on the client is pressed 
  //   get_gpt_flashcards()

  // }, [])

  return (
    <div> 
        This is a card!
        <div> 
          {currentQuestion.question}
        </div>
        <div> 
          {currentQuestion.choices['A']}
          {currentQuestion.choices['B']}
          {currentQuestion.choices['C']}
          {currentQuestion.choices['D']}
        </div>
        <button onClick={getNextQuestion}> Next Question </button>
    </div>
  )
}

export default function Home() {
  const [questions, setQuestions] = useState()
  const [currentQuestion, setCurrentQuestion] = useState()
  const [notes, setNotes] = useState()
  const [questionType, setQuestionType] = useState("MCQ")

  // function getNextQuestion() {
  //   currentQuestionNumber.current += 1
  //   questionKeys = Object.keys(questions)

  //   const nextQuestionNumber = (currentQuestionNumber.current) % (questionKeys.length - 1)
  //   const currentQuestionData = questions[questionKeys[nextQuestionNumber]]    
  //   setCurrentQuestion(currentQuestionData)

  //   // setCurrentQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)
  // }

  async function get_gpt_flashcards() {
    console.log('getting flash cards')
    const url = 'https://awwang3.pythonanywhere.com/api/get-question'
    const request_body = {
      'notes': notes,
      'question_type': questionType
    }

    const flashcard_questions = await fetch(url, {
      method: "POST",          
      body: JSON.stringify(request_body)
    })
    console.log(flashcard_questions)

    setQuestions(flashcard_questions)
    setCurrentQuestion(flashcard_questions['q1'])
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
                    questions && currentQuestion ? <Card questions={questions} currentQuestion={currentQuestion}/> : <p> no card now</p>
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
