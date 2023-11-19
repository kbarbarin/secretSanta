import React, { useEffect, useState, useCallback } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import { questions } from '../../data/Questions'

const budgets = [5, 10, 20, 30]

const RecommandationComponent = () => {
  const [loading, setLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [recommandations, setRecommandations] = useState([])
  const [selectedBudget, setSelectedBudget] = useState(budgets[0])
  const [response, setResponse] = useState(null)

  const isCategoryQuestion = (question) => {
    return !question.theme
  }

  const fetchRecommandations = useCallback(
    async (question, response) => {
      if (question.theme && response === 'Yes') {
        setLoading(true)

        const q = query(
          collection(db, 'Product'),
          where('category', '==', question.category),
          where('theme', '==', question.theme),
          where('price', '<=', selectedBudget)
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
    [selectedBudget]
  )

  useEffect(() => {}, [currentQuestionIndex, fetchRecommandations, response])

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
    <div>
      <h1>Quizz</h1>
      {loading ? (
        <p>Loading...</p>
      ) : currentQuestionIndex < questions.length ? (
        <div>
          <p>{questions[currentQuestionIndex].text}</p>
          {questions[currentQuestionIndex].imageUrl && (
            <img
              src={questions[currentQuestionIndex].imageUrl}
              alt="Question"
            />
          )}
          <button onClick={() => handleQuestionResponse('Yes')}>Yes</button>
          <button onClick={() => handleQuestionResponse('No')}>No</button>
          {isCategoryQuestion(questions[currentQuestionIndex]) && (
            <div>
              At what price would you like the gift to be?
              <div>
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => setSelectedBudget(budget)}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Ho-Ho</p>
          <p>Leo has been a good girl</p>
          <p>this year send this</p>
          <p>sweetie a present!</p>
          <h2>Recommendations:</h2>
          {recommandations.map((rec, index) => (
            <div key={index}>
              <p>{rec.name}</p>
              {rec.imageUrl && (
                <img src={rec.imageUrl} alt={`Recommendation ${index}`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecommandationComponent
