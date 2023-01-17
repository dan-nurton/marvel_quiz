import React, { Fragment } from 'react';

function ProgressBar({ progress }) {
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">
          Question :
          {progress}
          /10
        </div>
        <div className="progressPercent">
          Progression:
          {' '}
          {progress * 10}
          %
          {' '}
        </div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{ width: `${progress * 10}%` }} />
      </div>
    </>
  );
}

export default ProgressBar;
