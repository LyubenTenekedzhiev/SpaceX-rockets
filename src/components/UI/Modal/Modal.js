import React, { useState, useEffect } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ show }) => {
  const [open, setOpen] = useState(show);
  const closeBackdrop = () => {
    setOpen(false);
  };
  const reloadPageClicking = (e) => {
    if (e.target) window.location.reload();
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div>
      {open ? (
        <div>
          <Backdrop show={open} clicked={closeBackdrop} />
          <div className={classes.Modal}>
            <p className={classes.DialogTitle}>Success!</p>
            <p className={classes.DialogText}>Wooah...Wholesome. Let's replay the simulation!</p>
            <a href='/' className={classes.DialogButton} onClick={reloadPageClicking}>
              REPEAT
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Modal);
