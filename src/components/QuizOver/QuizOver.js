/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { GiTrophyCup, GiWoodenClogs } from 'react-icons/gi';
import axios from 'axios';
import Modal from '../Modal/Modal';

const computeScore = (answers) => {
  let incrementScores = 0;
  answers.forEach((answer, key) => {
    incrementScores += answer.score;
  });
  return incrementScores;
};

function QuizOver({ level, updateLevelQuiz, answers }) {
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = 'c2c76c20d33cfbdfb775905bee5b3e75';
  console.log(API_PUBLIC_KEY);
  const totalScore = useMemo(() => computeScore(answers), [answers]);
  const [openModal, setOpenModal] = useState(false);

  const showModal = ((id) => {
    setOpenModal(true);
    axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const hideModal = ((heroId) => {
    setOpenModal(false);
  });

  const tableRow = () => {
    const rows = [];
    answers.forEach(({
      question, choice, goodAnswer, score, heroId,
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
          <td style={{ backgroundColor: 'white' }}>
            {' '}
            <button style={{ backgroundColor: 'red', color: 'white' }} type="submit" onClick={() => showModal(heroId)} className="btnResult">Infos</button>
          </td>

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
            <p className="failureMsg">
              Pas de chance! Repasses-toi les 72 films Marvel et recommences ce Quiz.
            </p>
            <button type="submit" onClick={() => handleNextLevel(false)} className="btnResult failureMsg">Repasser le Quiz</button>
          </>
        );
      default:
        return (
          <>
            <p className="successMsg">
              <GiTrophyCup size="50px" />
              Félicitation. Tu es le roi des collants!
            </p>
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
              <th>Ma réponse</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {tableRow()}
          </tbody>
        </table>
      </div>

      <Modal showModal={openModal} hideModal={hideModal}>
        <div className="modalHeader">
          <h2>Titre</h2>
        </div>
        <div className="modalBody">
          <h3>Titre 2</h3>
        </div>
        <div className="modalFooter">
          <button type="submit" className="">Fermer</button>
        </div>
      </Modal>
    </>
  );
}

export default QuizOver;
