import React, { useState, useEffect } from 'react';
import questionsData from '../../data/question.json';
import recommendationsData from '../../data/recommendations.json';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    setQuestions(questionsData.questions);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleFinish = () => {
    const conditions = recommendationsData.recommendations.conditions;
    const defaultRecommendation = recommendationsData.recommendations.default;

    for (const condition of conditions) {
      const { questionId, value, type, recommendation } = condition;
      const answer = answers[questionId];

      switch (type) {
        case 'number':
          if (answer === value) {
            setRecommendation(recommendation);
            return;
          }
          break;
        case 'checkbox':
          if (Array.isArray(answer) && answer.includes(value)) {
            setRecommendation(recommendation);
            return;
          }
          break;
        default:
          break;
      }
    }

    setRecommendation(defaultRecommendation);
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          {question.type === 'number' && (
            <Input
              type="number"
              onChange={(e) => handleAnswer(question.id, e.target.value)}
            />
          )}
          {question.type === 'checkbox' && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
                  <Input
                    type="checkbox"
                    onChange={(e) => handleAnswer(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <Button onClick={handleFinish}>Terminer</Button>
      <p>Recommandation : {recommendation}</p>
    </div>
  );
};

export default QuestionPage;
