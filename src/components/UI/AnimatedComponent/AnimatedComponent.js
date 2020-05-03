import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Animated } from "react-animated-css";

import { clearingStage } from "../../../store/actions/actions";

let clearStage = [];
function AnimatedVisibility({ visible, children, animationOut, animationIn, onRocketOut }) {
  const [noDisplay, setNoDisplay] = useState(!visible);
  
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setNoDisplay(true)
        clearStage.push(visible)
        onRocketOut(clearStage);
      }, 1000);
    } else setNoDisplay(false);
  }, [visible, onRocketOut]);

  const style = noDisplay ? { display: "none" } : null;
  return (
    <Animated animationOut={animationOut} animationIn={animationIn} isVisible={visible} style={style} animationOutDuration={2000}>
      {children}
    </Animated>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRocketOut: (newArr) => dispatch(clearingStage(newArr)),
  };
};

export default connect(null, mapDispatchToProps)(React.memo(AnimatedVisibility));
