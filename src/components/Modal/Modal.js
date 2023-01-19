/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function Modal({ showModal, hideModal, children }) {
  return (
    showModal
     && (
     <div className="modalBackground" onClick={hideModal}>
       <div className="modalContainer">
         {children}
       </div>
     </div>
     )

  );
}

export default Modal;
