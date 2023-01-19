/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { auth } from '../Firebase';
import { UserSessionContext } from '../App/SessionContext';
import 'react-tooltip/dist/react-tooltip.css';

function Logout() {
  const { logoutSession } = useContext(UserSessionContext);

  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      signOut(auth).then(() => {
        logoutSession();
      }).catch(() => {
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
        <span id="deconnectionButton" className="slider round" data-tooltip-content="Déconnexion"></span>
      </label>
      <Tooltip anchorId="deconnectionButton" />
    </div>
  );
}

export default Logout;
