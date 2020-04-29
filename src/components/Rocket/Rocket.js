import React, { useState, useEffect, useCallback } from "react";

import thrust from "../../assets/thrust.png";
import rocketTop from "../../assets/rocket_top.png";
import rocketBottom from "../../assets/rocket_bottom.png";
import AnimatedVisibility from "../UI/AnimatedComponent/AnimatedComponent";
import Modal from "../UI/Modal/Modal";
import classes from "./Rocket.module.css";

let count = 0;

const Rocket = React.memo(({ firstStageFuel, firstStageEngines, secondStageFuel, secondStageEngines, numberOfRockets, name }) => {
  const [marginBottom, setMarginBottom] = useState(0);
  const [fuelBarHeight, setFuelBarHeight] = useState({});
  const [pathsHeight, setPathsHeight] = useState((window.innerHeight - (window.innerHeight - 0.17 * window.innerHeight)).toFixed(0));
  const [firstFuel, setFirstFuel] = useState((firstStageFuel / firstStageEngines).toFixed(0));
  const [secondFuel, setSecondFuel] = useState((secondStageFuel / secondStageEngines).toFixed(0));
  const [secondStageStarted, setSecondStageStarted] = useState(false);
  const [secondStageFinished, setSecondStageFinished] = useState(false);
  const [stage, setStage] = useState("");
  const [emptyStage, setEmptyStage] = useState(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const timer = setInterval(() => {
      // If we have no fuel or we hit the top of the page, rocket disappears and timer is cleared
      if (Number(pathsHeight) >= Number((window.innerHeight - 0.2 * window.innerHeight).toFixed(0)) || Number(secondFuel) <= 0) {
        setSecondStageFinished(true);
        clearInterval(timer);
        return;
      }

      // Checking if we're at stage one or two
      if (firstFuel <= 0) {
        setSecondStageStarted(true);
        setSecondFuel(Number(secondFuel - 3.5));
        setFuelBarHeight({ width: Number(secondFuel) + "px", backgroundColor: "red" });
        setStage("second");
      } else {
        setFirstFuel(Number(firstFuel) - 3.5);
        setFuelBarHeight({ width: Number(firstFuel) + "px" });
        setStage("first");
      }

      // Changing rocket's movement according to the innerHeight
      if (screenHeight >= 1650) {
        setMarginBottom(marginBottom + 13);
        setPathsHeight(Number(pathsHeight) + 13);
      } else if (screenHeight < 1650 && screenHeight >= 800) {
        setMarginBottom(marginBottom + 6.5);
        setPathsHeight(Number(pathsHeight) + 6.5);
      } else if (screenHeight < 800 && screenHeight >= 600) {
        setMarginBottom(marginBottom + 4.5); // 4.5
        setPathsHeight(Number(pathsHeight) + 4.5);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [marginBottom, pathsHeight, firstFuel, secondFuel, screenHeight]);

  const updateWindowDimensions = useCallback(() => {
    setScreenHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [updateWindowDimensions]);

  let rockets = (
    <div className={classes.RocketPath}>
      {!secondStageFinished ? (
        <div className={classes.Rocket} style={{ marginBottom: marginBottom + "px" }}>
          <div className={classes.RocketBody}>
            <img className={classes.RocketParts} src={rocketTop} alt='rocket' />
            <AnimatedVisibility visible={!secondStageStarted} animationOut='fadeOutLeft' animationIn=''>
              <img className={classes.RocketParts} src={rocketBottom} alt='rocket' />
            </AnimatedVisibility>
            <img className={classes.RocketThrust} src={thrust} alt='thrust' />
          </div>
          <div className={classes.RocketFuel}>
            <h3>
              Name: <span>{name}</span>
            </h3>
            <div className={classes.RocketFuelInfo}>
              <h3>Fuel:</h3>
              <div className={classes.RocketFuelBar} style={fuelBarHeight}></div>
            </div>
            <h3>
              Stage: <span>{stage}</span>
            </h3>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (rockets.props.children === null) {
    count++;
    if (count === numberOfRockets) {
      setEmptyStage(true);
    }
  }

  return (
    <div>
      {!secondStageFinished ? rockets : <Modal show={emptyStage} />}
    </div>
  );
});

export default Rocket;
