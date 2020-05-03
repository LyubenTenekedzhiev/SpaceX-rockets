import React, { useRef, useReducer } from "react";
import { Sprite, useTick } from "@inlet/react-pixi";

import rocketBottom from "../../assets/rocket_bottom.png";

const RocketBottom = ({ firstFuel, scale }) => {
  const reducer = (_, { data }) => data;
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  useTick((delta) => {
    const positionValue = (iter.current -= 0.005 * delta);
    update({
      type: "update",
      data: {
        x:
          scale === 1.5
            ? Math.sin(positionValue) * 40
            : scale === 1
            ? Math.sin(positionValue) * 25
            : scale === 0.65
            ? Math.sin(positionValue) * 15
            : Math.sin(positionValue),
        y:
          scale === 1.5
            ? Math.sin(positionValue / 3) * 450
            : scale === 1
            ? Math.sin(positionValue / 3) * 250
            : Math.sin(positionValue / 3) * 175,
            
        scale: scale,
      },
    });
  });

  return firstFuel ? <Sprite image={rocketBottom} {...motion} /> : null;
};

export default RocketBottom;
