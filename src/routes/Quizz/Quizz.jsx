import React, { useEffect, useState, useCallback } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import { questions } from '../../datas/questions'
import './Quizz.scss'

const budgets = [5, 10, 20, 30]

const RecommandationComponent = () => {
  const [loading, setLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [recommandations, setRecommandations] = useState([])
  const [sliderValue, setSliderValue] = useState(budgets[0])
  const [response, setResponse] = useState(null)

  const isCategoryQuestion = (question) => {
    return !question.theme
  }

  const fetchRecommandations = useCallback(
    async (question, response) => {
      if (question.theme && response === 'Yes') {
        setLoading(true)

        const q = query(
          collection(db, 'product'),
          where('category', '==', question.category),
          where('theme', '==', question.theme),
          where('price', '<=', sliderValue)
        )

        try {
          const snapshot = await getDocs(q)
          const recommandationsData = snapshot.docs.map((doc) => doc.data())

          console.log('Recommandations from Firestore:', recommandationsData)
          setRecommandations((prevRecommandations) => [
            ...prevRecommandations,
            ...recommandationsData,
          ])
        } catch (error) {
          console.error('Error fetching recommandations:', error)
        } finally {
          setLoading(false)
        }
      }
    },
    [sliderValue]
  )

  const handleQuestionResponse = (response) => {
    setResponse(response)
    if (response === 'Yes') {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      fetchRecommandations(questions[currentQuestionIndex], response)
    } else {
      let nextIndex
      if (isCategoryQuestion(questions[currentQuestionIndex])) {
        nextIndex = questions.findIndex(
          (q, index) => index > currentQuestionIndex && isCategoryQuestion(q)
        )
      } else {
        // Check if the current question is the last theme question of the current category
        const isLastThemeQuestion = !questions.find(
          (q, index) =>
            index > currentQuestionIndex &&
            q.category === questions[currentQuestionIndex].category &&
            q.theme !== questions[currentQuestionIndex].theme
        )
        if (isLastThemeQuestion) {
          // If it is the last theme question and the response is 'No', find the next category question
          nextIndex = questions.findIndex(
            (q, index) => index > currentQuestionIndex && isCategoryQuestion(q)
          )
        } else {
          nextIndex = questions.findIndex(
            (q, index) =>
              index > currentQuestionIndex &&
              q.category === questions[currentQuestionIndex].category &&
              q.theme !== questions[currentQuestionIndex].theme
          )
        }
      }
      setCurrentQuestionIndex(nextIndex !== -1 ? nextIndex : questions.length)
    }
  }

  return (
    <div className="quizz">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : currentQuestionIndex < questions.length ? (
        <div className="question">
          <h2>Quizz</h2>
          <div className="test">
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
            <button onClick={() => handleQuestionResponse('Yes')}>Yes</button>
            <button onClick={() => handleQuestionResponse('No')}>No</button>
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
        <div className="recommendations">
          <p>Ho-Ho</p>
          <p>Leo has been a good girl</p>
          <p>this year send this</p>
          <p>sweetie a present!</p>
          <h2 className="recommendations-title">Recommendations:</h2>
          {recommandations.map((rec, index) => (
            <div key={index} className="recommendation">
              <p className="recommendation-name">{rec.name}</p>
              {rec.imageUrl && (
                <img
                  src={rec.imageUrl}
                  alt={`Recommendation ${index}`}
                  className="recommendation-image"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecommandationComponent
