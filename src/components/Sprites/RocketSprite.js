import React, { useState, useEffect, useCallback } from "react";
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
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [scale, setScale] = useState(1);

  const updateWindowDimensions = useCallback(() => {
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
  }, []);

  // Effect for changing the fuel every second
  useEffect(() => {
    const interval = setInterval(() => {
      fuelFunction(setSecondFuel, setFirstFuel, secondFuel, firstFuel);
    }, 1000);
    return () => clearInterval(interval);
  }, [firstFuel, secondFuel]);

  // Effect for window dimensions. Setting "scale" for every screenHeight and passing it as prop, makes the rockets responsive
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    if (screenHeight >= 1550) setScale(1.5);
    if (screenHeight >= 850 && screenHeight < 1550) setScale(1);
    if (screenHeight < 850 && screenHeight >= 600) setScale(0.65);
    if (screenWidth < 700) setScale(0.45);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [updateWindowDimensions, screenHeight, screenWidth]);

  return (
    <AnimatedVisibility visible={secondFuel > 0} animationOut='rotateOutDownRight' animationIn=''>
      <Stage
        width={screenWidth / 4}
        height={screenHeight}
        options={{ transparent: true, autoDensity: true, resolution: window.devicePixelRatio }}
      >
        <Container x={screenWidth / 10} y={screenHeight / 2}>
          <RocketTop scale={scale} />
          <RocketBottom firstFuel={firstFuel} scale={scale} />
          <Thrust firstFuel={firstFuel} secondFuel={secondFuel} scale={scale} />
          <InfoText
            name={name}
            firstFuel={firstFuel}
            firstStageFuel={firstFuel ? firstFuel : secondFuel}
            stage={firstFuel ? "first" : "second"}
            scale={scale}
          />
        </Container>
      </Stage>
    </AnimatedVisibility>
  );
}

export default RocketSprite;
