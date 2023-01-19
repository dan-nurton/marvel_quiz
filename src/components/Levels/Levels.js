/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Stepper from 'react-stepper-horizontal/lib/Stepper';

function Levels({ level }) {
  return (
    <div className="levelsContainer">
      <Stepper steps={[{ title: 'Débutant' }, { title: 'Confirmé' }, { title: 'Expert' }]} activeStep={level.id} />
    </div>
  );
}

export default Levels;
