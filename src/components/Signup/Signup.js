/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import { auth, user } from '../Firebase';

function Signup() {
  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => setDoc(user(authUser.user.uid), {
        pseudo,
        email,
      }))
      .then(() => {
        setLoginData({ ...data });
        navigate('/welcome');
      })
      .catch((catchError) => {
        setError(catchError);
      });
  };

  const {
    pseudo, email, password, confirmPassword,
  } = loginData;

  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button type="submit" disabled>Inscription</button> : <button type="submit">Inscription</button>;

  // Gestion erreur
  const errorMessage = error !== ''
    && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="frr" />
      <div className="slContainer">
        <div className="formBoxLeftSignup" />
        <div className="formBoxRight">
          <div className="formContent">
            {errorMessage}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                <label htmlFor="pseudo">
                  Pseudo
                </label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="pseudo">
                  E-mail
                </label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">
                  Mot de passe
                </label>
              </div>
              <div className="inputBox">
                <input onChange={handleChange} value={confirmPassword} type="confirmPassword" id="confirmPassword" autoComplete="off" required />
                <label htmlFor="password">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
