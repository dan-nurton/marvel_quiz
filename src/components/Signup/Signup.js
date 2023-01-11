
import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase';


const Signup = () => {

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');
  const firebase = useContext(FirebaseContext);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    firebase.signupUser(email, password)

      .catch(error => {
        setError(error);
        setLoginData({ ...data })
      })
  }

  const { pseudo, email, password, confirmPassword } = loginData;

  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ?
    <button disabled>Inscription</button> : <button >Inscription</button>;

  // Gestion erreur
  const errorMessage = error !== '' &&
    <span>{error.message}</span>;

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftSignup'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            {errorMessage}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="pseudo">E-mail</label>
              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={confirmPassword} type="confirmPassword" id="confirmPassword" autoComplete="off" required />
                <label htmlFor="password">Confirmer le mot de passe</label>
              </div>
              {btn}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup