import React, {
  useState, createContext, useMemo, useEffect,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

import { auth, user } from '../Firebase';

export const UserSessionContext = createContext(null);

function SessionContext({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth && !userData) {
        const colRef = user(userAuth.uid);
        getDoc(colRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const docData = snapshot.data();
              setUserData(docData);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [userData]);

  const logoutSession = () => {
    setUserData(null);
  };

  const foo = useMemo(() => ({ userData, logoutSession }), [userData]);

  return (
    <UserSessionContext.Provider value={foo}>
      {children}
    </UserSessionContext.Provider>
  );
}

export default SessionContext;
