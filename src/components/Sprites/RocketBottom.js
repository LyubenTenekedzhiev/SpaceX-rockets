import React, { useRef } from "react";
import { Sprite, useTick } from "@inlet/react-pixi";

import rocketBottom from "../../assets/rocket_bottom.png";

const RocketBottom = ({ useReducer, firstFuel }) => {
  const reducer = (_, { data }) => data;
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);

  useTick((delta) => {
    const positionVal = (iter.current -= 0.005 * delta);
    update({
      type: "update",
      data: {
        x: firstFuel ? Math.sin(positionVal) * 30 : Math.sin(positionVal) * 70,
        y: Math.sin(positionVal / 3) * 200,
        // alpha: Math.sin(i * 10),
        // visibile: false
      },
    });
  });

  return firstFuel ? <Sprite image={rocketBottom} {...motion} /> : null;
};

export default RocketBottom;
