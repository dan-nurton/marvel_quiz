/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

function Logout() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      signOut(auth).then(() => {
        console.log('Vous êtes déconnecté');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }).catch(() => {
        console.log('OOPS! Error!');
      });
    }
  }, [checked, navigate]);

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
