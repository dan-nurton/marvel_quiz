import React, { useContext } from 'react';
import { UserSessionContext } from '../App/SessionContext';

function Quiz() {
  const { pseudo, email } = useContext(UserSessionContext);

  return (
    <div className="test">
      {pseudo}
      {email}
    </div>
  );
}

export default Quiz;
