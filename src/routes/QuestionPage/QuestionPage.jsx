import React, { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { questions } from '../../Data/Question';

const RecommandationComponent = () => {
  const [recommandations, setRecommandations] = useState([]);
  const [reponses, setReponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [finalReponse, setFinalReponse] = useState(null);

  const buildQueryFromResponses = useCallback(() => {
    const filters = [];

    if (reponses.question1 && reponses.question1.trim() !== '') {
      filters.push(where('Category', '==', reponses.question1.trim().toLowerCase()));
    }

    if (reponses.budget) {
      const budgetRange = convertBudgetResponseToRange(reponses.budget);
      filters.push(where('Budget', '>=', budgetRange.min));
      filters.push(where('Budget', '<=', budgetRange.max));
    }

    return filters;
  }, [reponses]);

  useEffect(() => {
    let isMounted = true;

    const fetchRecommandations = async () => {
      try {
        setLoading(true);

        let q;

        if (reponses.question1 === 'jeux video' && reponses.question2) {
          q = query(
            collection(db, 'Product'),
            where('Category', '==', 'jeux video'),
            where('Theme', '==', reponses.question2.trim().toLowerCase()),
            ...buildQueryFromResponses()
          );
        } else {
          q = query(collection(db, 'Product'), ...buildQueryFromResponses());
        }

        const snapshot = await getDocs(q);
        const recommandationsData = snapshot.docs.map(doc => doc.data());

        console.log('Recommandations récupérées depuis Firestore :', recommandationsData);

        if (isMounted && Object.keys(reponses).length === Object.keys(questions).length) {
          const finalReponseText = `Réponses: ${Object.values(reponses).join(', ')} - Recommandation: ${
            recommandationsData.length > 0 ? recommandationsData[0].name : 'Aucune recommandation'
          }`;
          setFinalReponse(finalReponseText);
        }

        if (isMounted) {
          setRecommandations(recommandationsData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des recommandations :', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecommandations();

    return () => {
      isMounted = false;
    };
  }, [reponses, buildQueryFromResponses]);

  const handleQuestionResponse = (question, reponse) => {
    setReponses(prevReponses => ({
      ...prevReponses,
      [question]: reponse,
    }));

    if (question === 'question1' && reponse === 'jeux video') {
      setReponses(prevReponses => ({
        ...prevReponses,
        question2: null,
        budget: null, 
      }));
    }
  };

  const convertBudgetResponseToRange = response => {
    switch (response) {
      case '< 50':
        return { min: 0, max: 50 };
      case '50 - 100':
        return { min: 50, max: 100 };
      case '100 - 200':
        return { min: 100, max: 200 };
      case '> 200':
        return { min: 200, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  };

  return (
    <div>
      <h2>Recommandations</h2>
      {loading && <p>Loading...</p>}
      {!loading && finalReponse && <p>{finalReponse}</p>}
      {!loading && !finalReponse && (
        <ul>
          {recommandations.map((recommandation, index) => (
            <li key={index}>{recommandation.Category}</li>
          ))}
        </ul>
      )}

      <h2>Questions</h2>
      <div>
        <Question
          question={questions.question1.text}
          options={questions.question1.options}
          onAnswer={reponse => handleQuestionResponse('question1', reponse)}
        />

        {reponses.question1 === 'jeux video' && (
          <>
            <Question
              question={questions.question2.text}
              options={questions.question2.options}
              onAnswer={reponse => handleQuestionResponse('question2', reponse)}
            />
            <Question
              question={questions.budget.text}
              options={questions.budget.options}
              onAnswer={reponse => handleQuestionResponse('budget', reponse)}
            />
          </>
        )}
      </div>
    </div>
  );
};

const Question = ({ question, options, onAnswer }) => {
  return (
    <div>
      <p>{question}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommandationComponent;
