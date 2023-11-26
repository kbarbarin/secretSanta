import React, { useState, useCallback } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import { questions } from '../../datas/questions'

import './Quizz.scss'
import GeaftIdeas from '../GiftIdeas/GiftIdeas'

const budgets = [5, 10, 20, 30, 40, 50]

const Quizz = () => {
  const [loading, setLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [recommandations, setRecommandations] = useState([])
  const [sliderValue, setSliderValue] = useState(budgets[0])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [showPriceRange, setShowPriceRange] = useState(false)
  const [priceRange, setPriceRange] = useState(null)

  // Function to check if a question is a category question
  const isCategoryQuestion = (question) => {
    return !question.theme
  }

  // Function to get recommendations data
  const getRecommandationsData = async (q) => {
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        ...data,
        priceRange: sliderValue,
      }
    })
  }

  // Function to build the query
  const buildQuery = (question) => {
    return query(
      collection(db, 'product'),
      where('category', '==', question.category),
      where('theme', '==', question.theme),
      where('price', '<=', sliderValue)
    )
  }

  // Function to fetch recommendations
  const fetchRecommandations = useCallback(
    async (question, response) => {
      if (question.theme && response === 'Yes') {
        setLoading(true)
        const q = buildQuery(question)
        const recommandationsData = await getRecommandationsData(q)
        updateRecommandations(recommandationsData, response)
        setLoading(false)
      }
    },
    [sliderValue, currentQuestionIndex, showPriceRange]
  )

  // Function to update recommendations
  const updateRecommandations = (recommandationsData, response) => {
    console.log('Recommandations from Firestore:', recommandationsData)
    setRecommandations((prevRecommandations) => [
      ...prevRecommandations,
      ...recommandationsData,
    ])
    if (currentQuestionIndex === questions.length - 1) {
      setShowRecommendations(true)
    }
    if (!showPriceRange) {
      setPriceRange(sliderValue)
      setShowPriceRange(true)
    }
  }

  // Function to get the next question index
  const getNextQuestionIndex = () => {
    if (isCategoryQuestion(questions[currentQuestionIndex])) {
      return questions.findIndex(
        (q, index) => index > currentQuestionIndex && isCategoryQuestion(q)
      )
    } else {
      const isLastThemeQuestion = !questions.find(
        (q, index) =>
          index > currentQuestionIndex &&
          q.category === questions[currentQuestionIndex].category &&
          q.theme !== questions[currentQuestionIndex].theme
      )
      if (isLastThemeQuestion) {
        return questions.findIndex(
          (q, index) => index > currentQuestionIndex && isCategoryQuestion(q)
        )
      } else {
        return questions.findIndex(
          (q, index) =>
            index > currentQuestionIndex &&
            q.category === questions[currentQuestionIndex].category &&
            q.theme !== questions[currentQuestionIndex].theme
        )
      }
    }
  }

  // Function to handle question response
  const handleQuestionResponse = (response) => {
    if (response === 'Yes') {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      fetchRecommandations(questions[currentQuestionIndex], response)
    } else {
      let nextIndex = getNextQuestionIndex()
      setCurrentQuestionIndex(nextIndex !== -1 ? nextIndex : questions.length)
    }
  }

  return (
    <div className="quizz">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : !showRecommendations && currentQuestionIndex < questions.length ? (
        <div className="question">
          <h2>Quizz</h2>
          <div className="card-question">
            <p className="question-text">
              {questions[currentQuestionIndex].text}
            </p>
            {questions[currentQuestionIndex].imageUrl && (
              <img
                src={questions[currentQuestionIndex].imageUrl}
                alt="Question"
                style={{ width: '100px', height: '100px' }}
                className="question-image"
              />
            )}
          </div>
          <div className="response-buttons">
            <button onClick={() => handleQuestionResponse('No')}>😵‍💫</button>
            <button onClick={() => handleQuestionResponse('Yes')}>😍</button>
          </div>
          {isCategoryQuestion(questions[currentQuestionIndex]) && (
            <div className="price-question">
              <p>At what price would you like the gift to be?</p>
              <span>{sliderValue}€</span>
              <div className="slider">
                <input
                  type="range"
                  min={Math.min(...budgets)}
                  max={Math.max(...budgets)}
                  step={5}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}
                  className="slider-input"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <GeaftIdeas priceRange={priceRange} recommandations={recommandations} />
      )}
    </div>
  )
}

export default Quizz
