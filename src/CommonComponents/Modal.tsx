import React from "react";
import "../styles/_modal.scss";

const Modal = ({ handleClose, show, children }: any) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section
        className="modal-main"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
        <button onClick={handleClose} className="close-button">
          <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" />
        </button>
      </section>
    </div>
  );
};

export default Modal;
