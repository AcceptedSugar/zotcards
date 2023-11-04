"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'



function Card() {
  async function get_gpt_flashcards(notes, question_type) {
    const url = '(server url here)'
    const flashcard_questions = await fetch(url, {
      method: "GET",          
      body: {
        'notes': notes,
        'question_type': question_type
      }
    })
  
  }

  useEffect(() => {
    get_gpt_flashcards()

  }, [])

  return (
    <div> 
        This is a card!
    </div>
  )
}

export default function Home() {
  return (
    <Card />
  )
}
