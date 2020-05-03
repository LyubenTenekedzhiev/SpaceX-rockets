import React, { useRef, useReducer } from "react";
import { ObservablePoint, TextStyle } from "pixi.js";
import { useTick, Text } from "@inlet/react-pixi";

const InfoText = ({ name, firstStageFuel, stage, firstFuel, scale }) => {
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
