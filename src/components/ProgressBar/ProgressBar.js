import React, { Fragment } from 'react';

function ProgressBar({ progress }) {
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">Question : 1/10 </div>
        <div className="progressPercent">Progression: 10% </div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{ width: `${progress * 10}%` }} />
      </div>
    </>
  );
}

export default ProgressBar;
