import React, { useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { auth, user } from '../Firebase';

export const UserSessionContext = createContext(null);

function SessionContext({ children }) {
  const [userData, setUserData] = useState(null);

  const fetchUserData = () => {
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
  };

  fetchUserData();

  return (
    <UserSessionContext.Provider value={userData}>
      {children}
    </UserSessionContext.Provider>
  );
}

export default SessionContext;
