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
          answer,
          ...keepRest
        }) => keepRest),
      }));
    }
  }, [fetchedArrayQuiz]);

  const handleNext = (e) => {
    e.preventDefault();
    setQuiz((prev) => ({
      ...prev,
      currentQuestionId: prev.currentQuestionId + 1,
    }));
  };
  const handleChoice = (e, option) => {
    setAnswers(answers.set(quiz.currentQuestionId, option));
  };

  const { question, options } = quiz.storedQuestions[quiz.currentQuestionId - 1];
  console.log(answers.get(quiz.currentQuestionId));

  const diplayOptions = options.map((optionName, index) => (
    <p
      key={optionName}
      onClick={(e) => handleChoice(e, optionName)}
      value={optionName}
      className={
        answers.get(quiz.currentQuestionId) === optionName ? 'answerOptions answerOptionsChosen' : 'answerOptions'
  }
    >
      {optionName}
    </p>
  ));

  return (
    <div className="test">
      {pseudo}
      <Levels />
      <ProgressBar progress={quiz.currentQuestionId} />
      <h2>{question}</h2>
      {diplayOptions}
      <button onClick={handleNext} type="submit" className="btnSubmit">Suivante</button>
    </div>
  );
}

export default Quiz;
