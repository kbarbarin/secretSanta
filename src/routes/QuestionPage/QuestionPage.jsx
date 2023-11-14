// RecommandationComponent.js

import React, { useEffect, useState, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { questions, initialResponses } from "../../Data/Question";

const RecommandationComponent = () => {
  const [recommandations, setRecommandations] = useState([]);
  const [responses, setResponses] = useState(initialResponses);
  const [loading, setLoading] = useState(false);
  const [finalResponse, setFinalResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const buildQueryFromResponses = useCallback(() => {
    const filters = [];

    const filterConfig = [
      {
        step: 1,
        condition: (response) => response === "Yes",
        filters: [{ field: "Category", value: "video games" }],
      },
      {
        step: 2,
        condition: (response) => response === "Yes",
        filters: [{ field: "Theme", value: "adventure" }],
      },
      {
        step: 2,
        condition: (response) => response === "No",
        filters: [{ field: "Theme", value: "anotherTheme" }],
      },
      {
        step: 3,
        condition: (response) => response === "Yes",
        filters: [{ field: "Category", value: "books" }],
      },
      // Ajoutez d'autres configurations en fonction de votre logique
    ];

    for (const config of filterConfig) {
      const response = responses[config.step];
      if (response !== null && response !== undefined && config.condition(response)) {
        filters.push(...config.filters.map(({ field, value }) => where(field, "==", value)));
      }
    }

    return filters;
  }, [responses]);

  const findNextStep = (currentStep, response) => {
    const nextStep = currentStep + 1;

    // Vérifiez s'il y a une question suivante et si elle doit être affichée en fonction de la réponse actuelle
    if (questions[nextStep] && (!questions[nextStep].condition || questions[nextStep].condition(response))) {
      return nextStep;
    }

    // Si la question suivante ne doit pas être affichée, recherchez la prochaine question qui doit l'être
    for (let step = nextStep + 1; step <= Object.keys(questions).length; step++) {
      if (questions[step]) {
        if (!questions[step].condition || questions[step].condition(response)) {
          return step;
        } else {
          // Si la question conditionnelle suivante ne doit pas être affichée, passez à la suivante
          continue;
        }
      }
    }

    return null; // Aucune question suivante
  };

  useEffect(() => {
    let isMounted = true;

    const fetchRecommandations = async () => {
      try {
        setLoading(true);

        const q = query(collection(db, "Product"), ...buildQueryFromResponses());

        const snapshot = await getDocs(q);
        const recommandationsData = snapshot.docs.map((doc) => doc.data());

        console.log("Recommandations récupérées depuis Firestore :", recommandationsData);

        if (isMounted && Object.values(responses).every((response) => response !== null)) {
          const finalResponseText = `Réponses: ${Object.values(responses).join(", ")} - Recommandation: ${
            recommandationsData.length > 0 ? recommandationsData[0].Category : "Aucune recommandation"
          }`;
          setFinalResponse(finalResponseText);
        }

        if (isMounted) {
          setRecommandations(recommandationsData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des recommandations :", error);
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
  }, [responses, buildQueryFromResponses]);

  const handleQuestionResponse = (step, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [step]: response,
    }));

    // Logique pour changer d'étape en fonction des réponses et conditions
    const nextStep = findNextStep(step, response);
    if (nextStep !== null) {
      setCurrentStep(nextStep);
    } else {
      // Si aucune question suivante, finalisez le processus ici
    }
  };

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
            onAnswer={(response) => handleQuestionResponse(currentStep, response)}
          />
        )}
        {/* Add other steps/questions based on your logic */}
      </div>
    </div>
  );
};

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
  );
};

export default RecommandationComponent;
