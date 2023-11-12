import React, { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

const QuestionPage = () => {
  const [recommandations, setRecommandations] = useState([]);
  const [reponses, setReponses] = useState({});
  const [loading, setLoading] = useState(false);

  const buildQueryFromResponses = useCallback(() => {
    const filters = [];

    if (reponses.question1 && reponses.question1.trim() !== '') {
      filters.push(where('Category', '==', reponses.question1.trim().toLowerCase()));
    }

    // Add other filters for additional questions

    return filters;
  }, [reponses]);

  useEffect(() => {
    const fetchRecommandations = async () => {
      try {
        setLoading(true);

        let q;

        if (reponses.question1 === 'jeux video' && reponses.question2) {
          q = query(
            collection(db, 'Product'),
            where('Category', '==', 'jeux video'),
            where('Theme', '==', reponses.question2.trim().toLowerCase())
          );
        } else {
          q = query(collection(db, 'Product'), ...buildQueryFromResponses());
        }

        const snapshot = await getDocs(q);
        const recommandationsData = snapshot.docs.map(doc => doc.data());

        console.log('Recommandations récupérées depuis Firestore :', recommandationsData);

        setRecommandations(recommandationsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des recommandations :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommandations();
  }, [reponses, buildQueryFromResponses]);

  const handleQuestionResponse = (question, reponse) => {
    setReponses(prevReponses => ({
      ...prevReponses,
      [question]: reponse,
    }));

    if (question === 'question1' && reponse === 'jeux video') {
      // Reset the response to question2 or use a default value
      setReponses(prevReponses => ({
        ...prevReponses,
        question2: null,
      }));
    }
  };

  return (
    <div>
      <h2>Recommandations</h2>
      {loading && <p>Loading...</p>}
      {!loading && recommandations.length > 0 && (
        <ul>
          {recommandations.map((recommandation, index) => (
            <li key={index}>{recommandation.Category} {recommandation.name}</li>
          ))}
        </ul>
      )}
      {!loading && recommandations.length === 0 && (
        <p>Aucune recommandation trouvée. Veuillez répondre à toutes les questions.</p>
      )}

      <h2>Questions</h2>
      <div>
        <Question
          question="Quel type de produit recherchez-vous ?"
          options={['livre', 'jeux video']}
          onAnswer={reponse => handleQuestionResponse('question1', reponse)}
        />

        {reponses.question1 === 'jeux video' && (
          <Question
            question="Quel genre de jeu vidéo préférez-vous ?"
            options={['action', 'aventure', 'stratégie']}
            onAnswer={reponse => handleQuestionResponse('question2', reponse)}
          />
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

export default QuestionPage;
