import React, { useContext } from 'react';
import { UserSessionContext } from '../App/SessionContext';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

function Quiz() {
  const { pseudo } = useContext(UserSessionContext);

  return (
    <div className="test">
      {pseudo}
      <Levels />
      <ProgressBar />
      <h2>Notre Question Quiz</h2>
      <p className="answerOptions">Question 1</p>
      <p className="answerOptions">Question 2</p>
      <p className="answerOptions">Question 3</p>
      <p className="answerOptions">Question 4</p>
      <button type="submit" className="btnSubmit">Suivante</button>

    </div>
  );
}

export default Quiz;
