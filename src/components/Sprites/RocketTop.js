import React, { useRef } from "react";
import { ObservablePoint } from "pixi.js";
import { Sprite, useTick } from "@inlet/react-pixi";

import rocketTop from "../../assets/rocket_top.png";

// RocketTop Sprite
const RocketTop = ({ useReducer }) => {
  const reducer = (_, { data }) => data;
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);
  
  useTick((delta) => {
    const positionVal = (iter.current -= 0.005 * delta);
    update({
      type: "update",
      data: {
        x: Math.sin(positionVal) * 30,
        y: Math.sin(positionVal / 3) * 200,
        pivot: new ObservablePoint(this, 0, 0, 67),
      },
    });
  });

  return <Sprite image={rocketTop} {...motion} />;
};

export default RocketTop;
