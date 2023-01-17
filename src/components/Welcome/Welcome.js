import React, { useContext } from 'react';

import { UserSessionContext } from '../App/SessionContext';
import Logout from '../Logout';
import Quiz from '../Quiz';

function Welcome() {
  const { userData } = useContext(UserSessionContext);

  return userData === null ? (
    <>
      <div className="loader" />
      <p className="loaderText">Loading</p>
    </>
  )
    : (
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz />
        </div>
      </div>
    );
}

export default Welcome;
