/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import { UserSessionContext } from '../App/SessionContext';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizMarvel from '../QuizMarvel';

function Quiz() {
  const { pseudo } = useContext(UserSessionContext);
  const [fetchedArrayQuiz, setFetchedArrayQuiz] = useState(QuizMarvel[0].quizz.debutant);
  const [quiz, setQuiz] = useState({
    levelChoose: 0,
    storedQuestions: [{ question: '', options: [] }],
    currentQuestionId: 1,
  });
  const [answers, setAnswers] = useState(new Map());

  useEffect(() => {
    if (fetchedArrayQuiz.length >= 10) {
      setQuiz((prev) => ({
        ...prev,
        storedQuestions: fetchedArrayQuiz.map(({
          ...keepRest
        }) => keepRest),
      }));
    }
  }, [fetchedArrayQuiz]);

  const handleStep = (e, stepAction) => {
    e.preventDefault();
    switch (stepAction) {
      case 'next':

        setQuiz((prev) => ({
          ...prev,
          currentQuestionId: prev.currentQuestionId + 1,
        }));
        break;
      case 'before':
        setQuiz((prev) => ({
          ...prev,
          currentQuestionId: prev.currentQuestionId - 1,
        }));
        break;
      default:
        break;
    }
  };
  const handleChoice = (option) => {
    setAnswers((prev) => {
      const newChoices = new Map(prev);
      const score = option === quiz.storedQuestions[quiz.currentQuestionId - 1].answer ? 1 : 0;
      newChoices.set(quiz.currentQuestionId, { score, choice: option, goodAnswer: quiz.storedQuestions[quiz.currentQuestionId - 1].answer });
      return newChoices;
    });
  };

  const { question, options } = quiz.storedQuestions[quiz.currentQuestionId - 1];
  const diplayOptions = options.map((optionName, index) => (
    <p
      key={optionName}
      onClick={() => handleChoice(optionName)}
      className={
        `answerOptions ${answers.get(quiz.currentQuestionId) !== undefined && answers.get(quiz.currentQuestionId).choice === optionName ? ' answerOptionsChosen' : ''}`
      }
    >
      {optionName}
    </p>
  ));

  const disabledButton = (stepAction) => {
    let disabled = '';
    switch (stepAction) {
      case 'next':
        if (quiz.currentQuestionId >= 10 || !answers.get(quiz.currentQuestionId)) {
          disabled = 'disabled';
        }
        break;
      case 'before':
        if (quiz.currentQuestionId === 1) {
          disabled = 'disabled';
        }
        break;
      default:
        break;
    }
    return disabled;
  };

  return (
    <div className="test">
      {pseudo}
      <Levels />
      <ProgressBar progress={quiz.currentQuestionId} />
      <h2>{question}</h2>
      {diplayOptions}
      <div className="buttonsStep">
        <button onClick={(e) => handleStep(e, 'before')} type="submit" className="btnSubmit" disabled={disabledButton('before')}>Précédent</button>
        <button onClick={(e) => handleStep(e, 'next')} type="submit" className="btnSubmit" disabled={disabledButton('next')}>Suivante</button>
      </div>
    </div>
  );
}

export default Quiz;
