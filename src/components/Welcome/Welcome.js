import React from 'react';
import Logout from '../Logout';
import Quiz from '../Quiz';

function Welcome() {
  return (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
}

export default Welcome;
