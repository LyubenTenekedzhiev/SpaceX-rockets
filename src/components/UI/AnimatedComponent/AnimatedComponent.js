import React, { useEffect, useState } from "react";
import { Animated } from 'react-animated-css';

function AnimatedVisibility({ visible, children, animationOut, animationIn }) {
  const [noDisplay, setNoDisplay] = useState(!visible);
  useEffect(() => {
    if (!visible) setTimeout(() => setNoDisplay(true), 400);
    else setNoDisplay(false);
  }, [visible]);

  const style = noDisplay ? { display: "none" } : null;
  return (
    <Animated animationOut={animationOut} animationIn={animationIn} isVisible={visible} style={style}>
      {children}
    </Animated>
  );
}

export default AnimatedVisibility;
