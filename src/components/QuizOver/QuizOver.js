/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import QuizMarvel from '../QuizMarvel';

const computeScore = (answers) => {
  let incrementScores = 0;
  answers.forEach((answer, key) => {
    incrementScores += answer.score;
  });
  return incrementScores;
};

function QuizOver({ level, updateLevelQuiz, answers }) {
  const totalScore = useMemo(() => computeScore(answers), [answers]);
  // const { question, choice, goodAnswer } = answer;

  const tableRow = () => {
    const rows = [];
    answers.forEach(({
      question, choice, goodAnswer, score,
    }, key) => {
      const style = score
        ? {
          backgroundColor: 'green',
          color: 'white',
        }
        : {
          backgroundColor: 'red',
          color: 'white',
        };
      const row = [
        <tr style={style} key={choice}>
          <td>{question}</td>
          <td>{choice}</td>
          <td>{goodAnswer}</td>
        </tr>,
      ];
      rows.push(row);
    });
    return rows;
  };

  const handleNextLevel = (action) => {
    if (action) {
      updateLevelQuiz(level.id + 1);
    } else {
      updateLevelQuiz(level.id);
    }
  };

  const successMessage = () => {
    switch (totalScore) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <>
            <p className="failureMsg">Pas de chance! Repasses-toi les 72 films Marvel et recommences ce Quiz.</p>
            <button type="submit" onClick={() => handleNextLevel(false)} className="btnResult failureMsg">Repasser le Quiz</button>
          </>
        );
      default:
        return (
          <>
            <p className="successMsg">Félicitation. Tu es le roi des collants!</p>
            <button type="submit" onClick={() => handleNextLevel(true)} className="btnResult successMsg">Niveau suivant</button>
          </>

        );
    }
  };

  return (
    <>
      <div className="stepsBtnContainer">

        {successMessage()}

      </div>
      <div className="percentage">
        <div className="progressPercent">
          Taux de réussite :
          {' '}
          {(totalScore * 100) / 10}
          %
        </div>
        <div className="progressPercent">
          {' '}
          Note
          {' '}
          {totalScore}
          /10

        </div>
      </div>
      <hr />
      {totalScore}
      <p>Les réponses aux questions posés sont</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {tableRow()}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default QuizOver;
