import React from 'react';

function Levels({ level }) {
  return (
    <div className="levelsContainer">
      <h2 style={{ textTransform: 'capitalize' }} className="headingLevels">{level.name}</h2>
    </div>
  );
}

export default Levels;
