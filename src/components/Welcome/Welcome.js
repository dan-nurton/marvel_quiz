import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSessionContext } from '../App/SessionContext';
import Logout from '../Logout';
import Quiz from '../Quiz';

function Welcome() {
  const navigate = useNavigate();
  const userSessionContext = useContext(UserSessionContext);

  useEffect(() => {
    if (!userSessionContext) {
      navigate('/');
    }
  }, [userSessionContext, navigate]);

  return userSessionContext === null ? (
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
