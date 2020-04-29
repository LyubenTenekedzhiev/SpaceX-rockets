import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import classes from "./Dialog.module.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        onKeyUp={reloadPage}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{<p className={classes.DialogTitle}>Success!</p>}</DialogTitle>
        <DialogContent>
          <p className={classes.DialogText}>Wooah...Wholesome. Let's replay the simulation!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={reloadPageClicking} color='primary'>
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// Functions for realoding the page
const reloadPage = (e) => {
  if (e.keyCode === 13) window.location.reload();
};
const reloadPageClicking = (e) => {
  if (e.target) window.location.reload();
};
