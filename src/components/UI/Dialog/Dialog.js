import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const reloadPage = (e) => {
    if (e.keyCode === 13) window.location.reload();
    if (e.target) window.location.reload();
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
        <DialogTitle id='alert-dialog-slide-title'>{"Success!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>Wooah...Let's replay the simulation!</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <a href='/' style={{ textDecoration: "none", paddingRight: "1rem", paddingBottom: "1rem" }}>
            Restart
          </a> */}
          <Button onClick={reloadPage} color='primary'>
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
