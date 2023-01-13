import React, { useState, useEffect, Fragment } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase';
import Logout from '../Logout';
import Quiz from '../Quiz';

function Welcome() {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
      } else {
        navigate('/');
      }
    });
    return listener();
  }, [navigate]);

  return userSession === null ? (
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
