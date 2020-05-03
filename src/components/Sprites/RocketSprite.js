import React, { useReducer, useRef, useMemo, useState, useEffect } from "react";
import { Stage, Container } from "@inlet/react-pixi";

import AnimatedVisibility from "../UI/AnimatedComponent/AnimatedComponent";
import RocketTop from "./RocketTop";
import RocketBottom from "./RocketBottom";
import Thrust from "./Thrust";
import InfoText from "./InfoText";

import { fuelFunction } from "../../functions/fuelFunction";

// Main function
function RocketSprite({ name, firstStageFuel, firstStageEngines, secondStageFuel, secondStageEngines }) {
  const [firstFuel, setFirstFuel] = useState((firstStageFuel / firstStageEngines).toFixed(0));
  const [secondFuel, setSecondFuel] = useState((secondStageFuel / secondStageEngines).toFixed(0));

  useEffect(() => {
    const interval = setInterval(() => {
      fuelFunction(setSecondFuel, setFirstFuel, secondFuel, firstFuel);
    }, 1000);
    return () => clearInterval(interval);
  }, [firstFuel, secondFuel]);

  return (
    <AnimatedVisibility visible={secondFuel > 0} animationOut='rotateOutDownRight' animationIn=''>
      <Stage
        width={window.innerWidth / 4}
        height={window.innerHeight}
        options={{ transparent: true, autoDensity: true, resolution: window.devicePixelRatio }}
      >
        <Container x={window.innerWidth / 8} y={window.innerHeight / 2.5}>
          <RocketTop useReducer={useReducer} />
          <RocketBottom firstFuel={firstFuel} useReducer={useReducer} />
          <Thrust
            firstFuel={firstFuel}
            secondFuel={secondFuel}
            useMemo={useMemo}
            useState={useState}
            useReducer={useReducer}
            useRef={useRef}
          />
          <InfoText
            name={name}
            firstFuel={firstFuel}
            firstStageFuel={firstFuel ? firstFuel : secondFuel}
            stage={firstFuel ? "first" : "second"}
            useReducer={useReducer}
          />
        </Container>
      </Stage>
    </AnimatedVisibility>
  );
}

export default RocketSprite;
