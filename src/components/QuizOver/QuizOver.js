/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState, useEffect, useMemo } from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import axios from 'axios';
import Modal from '../Modal/Modal';

const computeScore = (answers) => {
  let incrementScores = 0;
  answers.forEach((answer) => {
    incrementScores += answer.score;
  });
  return incrementScores;
};
function QuizOver({ level, updateLevelQuiz, answers }) {
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = 'c2c76c20d33cfbdfb775905bee5b3e75';
  const totalScore = useMemo(() => computeScore(answers), [answers]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkDataAge = (date) => {
    const today = Date.now();
    const deltaTime = today - date;
    const deltaDays = deltaTime / (1000 * 3600 * 24);
    if (deltaDays >= 15) {
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now());
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
  }, []);

  const showModal = ((id) => {
    setOpenModal(true);
    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then((response) => {
          setCharacterInfos(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem('marvelStorageDate')) {
            localStorage.setItem('marvelStorageDate', Date.now());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  const hideModal = (() => {
    setOpenModal(false);
    setLoading(true);
  });

  const tableRow = () => {
    const rows = [];
    answers.forEach(({
      question, choice, goodAnswer, score, heroId,
    }) => {
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

  const resultInModal = !loading
    ? (
      <>
        <div className="modalHeader">
          <h2>
            {
              characterInfos.data.results[0].name
            }
          </h2>
        </div>
        <div className="modalBody">

          <div className="comicImage">
            <img
              src={`${characterInfos.data.results[0].thumbnail.path}.${characterInfos.data.results[0].thumbnail.extension}`}
              alt={characterInfos.data.results[0].name}
            />
          </div>
          <div className="comicDetails">
            <h3>Description</h3>
            {
                   characterInfos.data.results[0].desciption
                     ? <p>{characterInfos.data.results[0].desciption}</p>
                     : <p>Déscription indisponible</p>

                }
            <h3>Plus d 'infos</h3>
            {
                  characterInfos.data.results[0].urls
                  && characterInfos.data.results[0].urls.map((url) => <a key={url.type} href={url.url} target="_blank" rel="noreferrer">{url.type}</a>)
                }
          </div>
        </div>
        <div className="modalFooter">
          <button type="submit" onClick={hideModal} className="">Fermer</button>
        </div>
      </>
    )
    : (
      <>
        <div className="modalHeader">
          <h2>
            Réponse de Marvel
          </h2>
        </div>
        <div className="modalBody">
          <div className="loader" />
          <p className="loaderText">Loading</p>
        </div>
        <div className="modalFooter">
          <button type="submit" onClick={hideModal} className="">Fermer</button>
        </div>
      </>
    );
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
        {resultInModal}

      </Modal>
    </>
  );
}

export default QuizOver;
