import React, { useRef } from "react";
import { ObservablePoint, TextStyle } from "pixi.js";
import { useTick, Text } from "@inlet/react-pixi";

const InfoText = ({ useReducer, name, firstStageFuel, stage, firstFuel }) => {
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
        pivot: firstFuel ? new ObservablePoint(this, 0, 30, -130) : new ObservablePoint(this, 0, 30, -95),
      },
    });
  });

  return (
    <Text
      text={`Name: ${name} \nFuel: ${firstStageFuel} Liters \nStage: ${stage}`}
      style={
        new TextStyle({
          fontFamily: "sans-serif",
          fill: ["#ffffff"],
          lineHeight: 25,
          fontSize: 17.5,
          fontWeight: 200,
        })
      }
      {...motion}
    />
  );
};

export default InfoText;
