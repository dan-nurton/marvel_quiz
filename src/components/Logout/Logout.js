/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { UserSessionContext } from '../App/SessionContext';

function Logout() {
  const { logoutSession } = useContext(UserSessionContext);

  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      signOut(auth).then(() => {
        logoutSession();
        console.log('Vous êtes déconnecté');
      }).catch(() => {
        console.log('OOPS! Error!');
      });
    }
  }, [checked, logoutSession, navigate]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input
          onChange={handleChange}
          type="checkbox"
          checked={checked}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Logout;
