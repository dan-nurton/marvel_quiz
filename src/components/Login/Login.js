/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../Firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        navigate('/welcome', { replace: true });
      })
      .catch((catchError) => {
        setError(catchError);
        setEmail('');
        setPassword('');
      });
  };

  // Gestion erreur
  const errorMessage = error !== ''
    && <span>{error.message}</span>;

  return (

    <div className="signupLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin" />
        <div className="formBoxRight">
          <div className="formContent">
            {errorMessage}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="pseudo">
                  E-mail
                </label>
              </div>
              <div className="inputBox">
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">
                  Mot de passe
                </label>
              </div>
              {btn ? <button type="submit">Connexion</button> : <button type="submit" disabled>Connexion</button>}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">Nouveau sur Marvel quiz ? Inscrivez-vous maintenant.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
