/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null);
        setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
        setEmail('');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 5000);
      })
      .catch((catchError) => {
        setError(catchError);
        setEmail('');
      });
  };

  const disabled = email === '';
  // Gestion erreur
  const messageError = error !== null
    && <span>{error}</span>;
  // Gestion erreur
  const messageSuccess = success !== null
    && <span>Mail envoyé</span>;
  return (
    <div className="signupLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget" />
        <div className="formBoxRight">
          <div className="formContent">
            {messageError}
            {messageSuccess}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="pseudo">
                  E-mail
                </label>
              </div>
              <button disabled={disabled}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
