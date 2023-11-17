import React, { useEffect, useState, useCallback } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import { questions } from '../../Data/Question'
 
const budgets = [5, 10, 20, 30]

const RecommandationComponent = () => {
  const [loading, setLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [recommandations, setRecommandations] = useState([])
  const [selectedBudget, setSelectedBudget] = useState(budgets[0])

  const isCategoryQuestion = (question) => {
    return !question.theme
  }

  const fetchRecommandations = useCallback(
    async (question) => {
      if (question.theme) {
        setLoading(true)

        const q = query(
          collection(db, 'Product'),
          where('Category', '==', question.category),
          where('Theme', '==', question.theme),
          where('Price', '==', selectedBudget)
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

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      fetchRecommandations(questions[currentQuestionIndex])
    }
  }, [currentQuestionIndex, fetchRecommandations])

  const handleQuestionResponse = (response) => {
    if (response === 'Yes') {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    } else {
      const nextCategoryIndex = questions.findIndex(
        (q, index) =>
          index > currentQuestionIndex &&
          q.category !== questions[currentQuestionIndex].category
      )
      setCurrentQuestionIndex(
        nextCategoryIndex !== -1 ? nextCategoryIndex : questions.length
      )
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : currentQuestionIndex < questions.length ? (
        <div>
          <p>{questions[currentQuestionIndex].text}</p>
          <button onClick={() => handleQuestionResponse('Yes')}>Yes</button>
          <button onClick={() => handleQuestionResponse('No')}>No</button>
          {isCategoryQuestion(questions[currentQuestionIndex]) && (
            <div>
              Select your budget:
              {budgets.map((budget) => (
                <button key={budget} onClick={() => setSelectedBudget(budget)}>
                  {budget}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Thank you for your responses!</p>
          <h2>Recommendations:</h2>
          {recommandations.map((rec, index) => (
            <p key={index}>{rec.name}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecommandationComponent
