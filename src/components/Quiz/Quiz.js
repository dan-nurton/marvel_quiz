/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FaChevronRight } from 'react-icons/fa';
import { UserSessionContext } from '../App/SessionContext';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizMarvel from '../QuizMarvel';
import QuizOver from '../QuizOver';

const getCurrentLevel = (searchLevel) => {
  const levels = [
    { id: 0, name: 'debutant' },
    { id: 1, name: 'confirme' },
    { id: 2, name: 'expert' },
  ];
  return levels.find((level) => level.id === searchLevel);
};

function Quiz() {
  const [level, setLevel] = useState(getCurrentLevel(0));
  const [fetchedArrayQuiz, setFetchedArrayQuiz] = useState(QuizMarvel[0].quizz[level.name]);
  const [quiz, setQuiz] = useState({
    storedQuestions: [{ question: '', options: [] }],
    currentQuestionId: 1,
    quizEnd: false,
  });
  const [answers, setAnswers] = useState(new Map());

  const updateLevelQuiz = (levelToSet) => {
    setLevel((prev) => {
      if (prev.id === levelToSet) {
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          quizEnd: false,
          currentQuestionId: 1,
          storedQuestions: fetchedArrayQuiz.map(({
            ...keepRest
          }) => keepRest),
        }));
      }
      return getCurrentLevel(levelToSet);
    });
  };

  useEffect(() => {
    setFetchedArrayQuiz(QuizMarvel[0].quizz[level.name]);
  }, [level]);

  useEffect(() => {
    if (fetchedArrayQuiz.length >= 10) {
      setQuiz((prev) => ({
        ...prev,
        quizEnd: false,
        currentQuestionId: 1,
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
      newChoices.set(quiz.currentQuestionId, {
        question: quiz.storedQuestions[quiz.currentQuestionId - 1].question, score, choice: option, goodAnswer: quiz.storedQuestions[quiz.currentQuestionId - 1].answer,
      });
      return newChoices;
    });
  };
  const handleResults = () => {
    setQuiz((prev) => ({
      ...prev,
      quizEnd: true,
    }));
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
      <FaChevronRight />
      {optionName}
    </p>
  ));

  const disabledButton = (stepAction) => {
    const style = { disabled: '', display: 'block' };
    switch (stepAction) {
      case 'next':
        if (quiz.currentQuestionId >= 10 || !answers.get(quiz.currentQuestionId)) {
          style.disabled = 'disabled';
        }
        if (quiz.currentQuestionId === 10) {
          style.display = 'none';
        }
        break;
      case 'before':
        if (quiz.currentQuestionId === 1) {
          style.disabled = 'disabled';
        }

        break;
      case 'results':
        if (quiz.currentQuestionId === 10) {
          style.display = 'block';
          if (!answers.get(quiz.currentQuestionId)) {
            style.disabled = 'disabled';
          }
        } else {
          style.display = 'none';
        }

        break;
      default:
        break;
    }
    return style;
  };

  return quiz.quizEnd ? (
    <QuizOver level={level} updateLevelQuiz={updateLevelQuiz} answers={answers} />
  )
    : (
      <>
        <Levels level={level} />
        <ProgressBar progress={quiz.currentQuestionId} />
        <h2>{question}</h2>
        {diplayOptions}
        <div className="buttonsStep">
          <button style={{ display: disabledButton('before').display }} onClick={(e) => handleStep(e, 'before')} type="submit" className="btnSubmit" disabled={disabledButton('before').disabled}>Précédent</button>
          <button style={{ display: disabledButton('next').display }} onClick={(e) => handleStep(e, 'next')} type="submit" className="btnSubmit" disabled={disabledButton('next').disabled}>Suivante</button>
          <button style={{ display: disabledButton('results').display }} onClick={() => handleResults()} type="submit" className="btnSubmit" disabled={disabledButton('results').disabled}>Résultats</button>
        </div>
      </>
    );
}

export default Quiz;
