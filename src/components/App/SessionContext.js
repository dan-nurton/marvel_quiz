import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../Firebase';

export const UserSessionContext = createContext(null);

function SessionContext({ children }) {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
      }
    });
    return listener();
  });

  return (
    <UserSessionContext.Provider value={userSession}>
      {children}
    </UserSessionContext.Provider>
  );
}

export default SessionContext;
