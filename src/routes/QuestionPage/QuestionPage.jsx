import React, { useEffect, useState, useCallback } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import { questions, initialResponses } from '../../Data/Question'

const RecommandationComponent = () => {
  const [recommandations, setRecommandations] = useState([])
  const [responses, setResponses] = useState(initialResponses)
  const [loading, setLoading] = useState(false)
  const [finalResponse, setFinalResponse] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)

  const buildQueryFromResponses = useCallback(() => {
    const filters = []

    for (let step = 1; step <= currentStep; step++) {
      const response = responses[step]

      if (response !== null && response !== undefined) {
        filters.push(getFilterForStep(step, response))
      }
    }

    return filters.filter(Boolean) // Filtrer les valeurs null ou undefined
  }, [responses, currentStep])

  const getFilterForStep = (step, response) => {
    switch (step) {
      case 1:
        return response === 'Yes'
          ? where('Category', '==', 'video games')
          : where('Category', '==', 'books')
      case 2:
        return response === 'Yes'
          ? where('Theme', '==', 'adventure')
          : where('Theme', '==', 'action')
      case 3:
        // Ajoutez des filtres en fonction de la réponse à la question 3
        return response === 'Yes'
          ? where('Category', '==', 'video games')
          : where('Category', '==', 'video games')
      case 4:
        // Ajoutez des filtres en fonction de la réponse à la question 4
        return response === 'Yes'
          ? where('Theme', '==', 'rap')
          : where('Theme', '==', 'mystery')
      // Ajoutez des cas pour les autres étapes/questions
      default:
        return null
    }
  }

  const findNextStep = (currentStep, response) => {
    switch (currentStep) {
      case 1:
        return response === 'Yes' ? 2 : 4
      case 2:
        return response === 'Yes' ? 4 : 3
      case 3:
        return response === 'Yes' ? 5 : 5 // Notez que la réponse est la même pour les deux cas, donc la prochaine étape sera toujours la 5
      case 4:
        return response === 'Yes' ? 6 : 5 // Notez que la réponse est la même pour les deux cas, donc la prochaine étape sera toujours la 6
      case 5:
        return response === 'Yes' ? 7 : 6 // Notez que la réponse est la même pour les deux cas, donc la prochaine étape sera toujours la 7
      // Ajoutez la logique pour les autres étapes/questions
      default:
        return undefined
    }
  }

  useEffect(() => {
    let isMounted = true

    const fetchRecommandations = async () => {
      try {
        setLoading(true)

        const q = query(collection(db, 'Product'), ...buildQueryFromResponses())

        const snapshot = await getDocs(q)
        const recommandationsData = snapshot.docs.map((doc) => doc.data())

        console.log(
          'Recommandations récupérées depuis Firestore :',
          recommandationsData
        )

        if (
          isMounted &&
          Object.values(responses).every((response) => response !== null)
        ) {
          const finalResponseText = `Réponses: ${Object.values(responses).join(
            ', '
          )} - Recommandation: ${
            recommandationsData.length > 0
              ? recommandationsData[0].Category
              : 'Aucune recommandation'
          }`
          setFinalResponse(finalResponseText)
        }

        if (isMounted) {
          setRecommandations(recommandationsData)
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des recommandations :',
          error
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRecommandations()

    return () => {
      isMounted = false
    }
  }, [responses, buildQueryFromResponses])

  const handleQuestionResponse = (step, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [step]: response,
    }))

    // Logique pour changer d'étape en fonction des réponses et conditions
    const nextStep = findNextStep(step, response)
    if (nextStep !== undefined) {
      setCurrentStep(nextStep)
    } else {
      // Si aucune question suivante, finalisez le processus ici
    }
  }

  return (
    <div>
      <h2>Recommandations</h2>
      {loading && <p>Loading...</p>}
      {!loading && finalResponse && <p>{finalResponse}</p>}
      {!loading && (
        <ul>
          {recommandations.map((recommandation, index) => (
            <li key={index}>{recommandation.Category}</li>
          ))}
        </ul>
      )}

      <h2>Questions</h2>
      <div>
        {questions[currentStep] && (
          <Question
            step={currentStep}
            text={questions[currentStep].text}
            options={questions[currentStep].options}
            onAnswer={(response) =>
              handleQuestionResponse(currentStep, response)
            }
          />
        )}
        {/* Ajoutez d'autres étapes/questions en fonction de votre logique */}
      </div>
    </div>
  )
}

const Question = ({ step, text, options, onAnswer }) => {
  return (
    <div>
      <p>{text}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecommandationComponent
