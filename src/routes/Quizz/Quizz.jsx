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
  const [showRecommendations, setShowRecommendations] = useState(false)

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
          const recommandationsData = snapshot.docs.map((doc) => {
            const data = doc.data()
            return {
              ...data,
              priceRange: sliderValue, // Ajoutez la propriété priceRange
            }
          })

          console.log('Recommandations from Firestore:', recommandationsData)
          setRecommandations((prevRecommandations) => [
            ...prevRecommandations,
            ...recommandationsData,
          ])
        } catch (error) {
          console.error('Error fetching recommandations:', error)
        } finally {
          setLoading(false)
          setShowRecommendations(true)
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
        const isLastThemeQuestion = !questions.find(
          (q, index) =>
            index > currentQuestionIndex &&
            q.category === questions[currentQuestionIndex].category &&
            q.theme !== questions[currentQuestionIndex].theme
        )
        if (isLastThemeQuestion) {
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
        <div className="recommendations">
          {recommandations.map((rec, index) => (
            <div key={index} className="recommendation">
              <p>Ho-Ho</p>
              <p>Leo has been a good girl</p>
              <p>this year send this</p>
              <p>sweetie a present!</p>
              {rec.priceRange && (
                <p className="recommendation-price-range">
                  The limit price is {rec.priceRange}€
                </p>
              )}
              <h2 className="recommendations-title">Recommendations:</h2>
              <p className="recommendation-name">{rec.name}</p>
              {rec.imageUrl && (
                <img
                  src={rec.imageUrl}
                  alt={`Recommendation ${index}`}
                  className="recommendation-image"
                />
              )}
              {rec.price && (
                <p className="recommendation-price">Price: {rec.price}€</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecommandationComponent
