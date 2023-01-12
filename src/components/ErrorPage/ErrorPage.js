import React from 'react';
import batman from '../../images/batman.png';

const centerH2 = {
  textAlign: 'center',
  marginTop: '50px',
};
const centerImg = {
  display: 'block',
  margin: '40px auto',
};

function ErrorPage() {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={centerH2}>
          Oups, cette page n &apos existe pas
          <img style={centerImg} src={batman} alt="error page" />
        </h2>
      </div>
    </div>
  );
}

export default ErrorPage;
