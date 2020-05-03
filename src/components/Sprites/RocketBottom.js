import React, { useRef, useReducer } from "react";
import { Sprite, useTick } from "@inlet/react-pixi";

import rocketBottom from "../../assets/rocket_bottom.png";

const RocketBottom = ({ firstFuel, scale }) => {
  const reducer = (_, { data }) => data;
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  useTick((delta) => {
    const positionVal = (iter.current -= 0.005 * delta);
    update({
      type: "update",
      data: {
        x:
          scale === 1.5
            ? Math.sin(positionVal) * 40
            : scale === 1
            ? Math.sin(positionVal) * 25
            : scale === 0.65
            ? Math.sin(positionVal) * 15
            : Math.sin(positionVal),
        y:
          scale === 1.5 ? Math.sin(positionVal / 3) * 450 : scale === 1 ? Math.sin(positionVal / 3) * 250 : Math.sin(positionVal / 3) * 175,
        scale: scale,
        // alpha: Math.sin(i * 10),
        // visibile: false
      },
    });
  });

  return firstFuel ? <Sprite image={rocketBottom} {...motion} /> : null;
};

export default RocketBottom;
