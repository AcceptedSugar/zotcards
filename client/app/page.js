"use client";
import styles from './page.module.css'
import {useRef, useState} from 'react'



function FilterModal(props) {
  return (
    <div className ={styles.filterModal}>
      
      <div className={styles.close} onClick={props.closeCard}>x</div>
      <h2>Set up Filter Options</h2>
      <p>Tailor flashcards to your learning style</p>

      <div className={styles.filterActionContain}>
        <div className={styles.dropDown}>
                <select onChange={() => {}}>
                            <option value="MCQ"> MCQ </option>
                            <option value="True/False"> True/False </option>
                </select>   
            </div>
            

            <button className={styles["icon-button"]} onClick={props.buttonFunction}>
              <p>Set filters</p>          
            </button>
      </div>
      
    </div>
    

  )
}

function AnswerChoice( { currentQuestionNumber, currentQuestion, answerChoice, questions, setCurrentQuestion } ) {

    const currentAnswerChoice = currentQuestion.choices[answerChoiceLetter]

    function getNextQuestion(e) { // called when the card is clicked
        e.preventDefault();
        const correctAnswerChoice = currentQuestion.choices[currentQuestion.correct]

        if (currentAnswerChoice == correctAnswerChoice) {
            setCorrectness(".correct-answer")
            alert('correct!')

        } else {
            setCorrectness(".incorrect-answer")
            alert('incorrect')
        }
        currentQuestionNumber.current += 1

        const nextQuestionNumber = (currentQuestionNumber.current) % (questions.length - 1)
        console.log(nextQuestionNumber)
        setCurrentQuestion(questions[nextQuestionNumber])
    }

    return (
        <div className={styles[correctness]}>

            <button onClick={getNextQuestion}>
                <div>
                    {answerChoiceLetter}
                </div>

                <div>
                    {currentAnswerChoice}
                </div>
            </button>

        </div>
    )

}

// function Card({questions, currentQuestion, setCurrentQuestion}) {
//     const currentQuestionNumber = useRef(0)
//   return (
//     <div className={styles.answerContain}> 
//       <div className="answerChoice">
//       </div>
//       <button onClick={getNextQuestion}> <p> {answerChoice} {currentQuestion.choices[answerChoice]} </p></button> 
//     </div>
//   )

// }


function Card( {questions, currentQuestion, setCurrentQuestion } ) {
  const currentQuestionNumber = useRef(0)

    return (
        <div>
            <div className={styles["card-page"]}>
                <div className={styles.cardNavContain}>
                    <div className={styles.progressBar}>

                    </div>
                    <div className={styles.close}>x</div>
                </div>
                <div className={styles["card-contain"]}>
                    <div>
                        <h2>{currentQuestion.question}</h2>
                    </div>

                    <div className={styles.answerContain}>

                        <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion}
                                      answerChoiceLetter={"A"} questions={questions}
                                      setCurrentQuestion={setCurrentQuestion}/>
                        <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion}
                                      answerChoiceLetter={"B"} questions={questions}
                                      setCurrentQuestion={setCurrentQuestion}/>
                        <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion}
                                      answerChoiceLetter={"C"} questions={questions}
                                      setCurrentQuestion={setCurrentQuestion}/>
                        <AnswerChoice currentQuestionNumber={currentQuestionNumber} currentQuestion={currentQuestion}
                                      answerChoiceLetter={"D"} questions={questions}
                                      setCurrentQuestion={setCurrentQuestion}/>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default function Home() {
    const [questions, setQuestions] = useState()
    const [currentQuestion, setCurrentQuestion] = useState()

    const [notes, setNotes] = useState()
    const [showModal, setFilterState] = useState(false)

    const [questionType, setQuestionType] = useState("MCQ")
    const [showQuestions, setShowQuestions] = useState(false)

    const request_body = {
        'notes': notes,
        'question_type': questionType
    }

  async function get_gpt_flashcards(e) {
    e.preventDefault()
    console.log(questionType)

    console.log('getting flash cards')
    // const url = 'https://awwang3.pythonanywhere.com/api/get-question'
    const url = 'http://127.0.0.1:5000/api/get-question'
    console.log('requestbody: ')
    console.log(request_body)

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // mode: 'no-cors',
        body: JSON.stringify(request_body)
        })
            .then(response => response.json())
            .then(data => {
                console.log('server response flash cards printed below: ')
                console.log(data);
                setQuestions(data);
                setCurrentQuestion(data[0])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function handleNoteUpdate(e) {
        setNotes(e.target.value)
    }

    function handleQuestionTypeUpdate(e) {
        setQuestionType(e.target.value)
    }

    return (
            <main className={styles.main}>
                <div className={styles.main}>
                    <div className={["generate-contain"]}>
                        <h1>Transform your Class Notes into <span>Flashcards</span></h1>
                        <form action="#" className={styles.form}>
                            <textarea onChange={handleNoteUpdate} className={styles.generate} rows="4" cols="50"
                                      placeholder='Copy and Paste your Notes Here...'></textarea>

                            <button onClick={get_gpt_flashcards} className={styles["icon-button"]}>
                                <p>Transform notes</p>

                            </button>
                            {
                                questions && currentQuestion ?
                                    <Card questions={questions} currentQuestion={currentQuestion}
                                          setCurrentQuestion={setCurrentQuestion}/> : <p> no card now</p>
                            }
                            
                            {showModal ? <FilterModal buttonFunction = {get_gpt_flashcards} closeCard = {closeCard}/> : null}

                            <select value={questionType} onChange={handleQuestionTypeUpdate}>
                                <option value="MCQ"> MCQ</option>
                                <option value="True/False"> True/False</option>
                            </select>
                        </form>
                    </div>
                </div>
            </main>
    )
}



// [{
//   'question': 'What is the major theme of the first tale?',
//   'choices': {
//       'A': 'The transitoriness of all things',
//       'B': 'The efficacy of prayers',
//       'C': 'How storytelling can mystify history',
//       'D': 'The mishearing of humans'
//   },
//   'correct': 'C'
// }, {
//   'question': 'Which character in the first tale is compared to the Grinch?',
//   'choices': {'A': 'Ciappelletto', 'B': 'Cepparello', 'C': 'The priest', 'D': 'The usurers'},
//   'correct': 'A'
// }, {
//   'question': 'What is one of the vices of Ciappelletto?',
//   'choices': {'A': 'Churchgoing', 'B': 'Blasphemy', 'C': 'Sobriety', 'D': 'Honesty'},
//   'correct': 'B'
// }, {
//   'question': 'Where does Ciappelletto live?',
//   'choices': {'A': 'Florence', 'B': 'Rome', 'C': 'Paris', 'D': 'Venice'},
//   'correct': 'C'
// }, {
//   'question': 'What happens to Ciappelletto after he falls ill?',
//   'choices': {
//       'A': 'He becomes a popular saint',
//       'B': 'He becomes a usurer',
//       'C': 'He becomes a priest',
//       'D': 'He becomes a storyteller'
//   },
//   'correct': 'A'
// }]