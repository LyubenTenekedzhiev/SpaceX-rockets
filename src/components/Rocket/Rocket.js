import React, { useState, useEffect } from "react";

import rocket from "../../assets/rocket.png";
import thrust from "../../assets/thrust.png";
import rocketTop from "../../assets/rocket_top.png";
import Dialog from "../UI/Dialog/Dialog";
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (Number(pathsHeight) >= Number((window.innerHeight - 0.2 * window.innerHeight).toFixed(0)) || Number(secondFuel) <= 0) {
        setSecondStageFinished(true);
        clearInterval(timer);
        return;
      }
      if (firstFuel <= 0) {
        setSecondStageStarted(true);
        setSecondFuel(Number(secondFuel - 3.5));
        setFuelBarHeight({ width: Number(secondFuel) + "px", maxWidth: "5.5vw", backgroundColor: "red" });
        setStage("second");
      } else {
        setFirstFuel(Number(firstFuel) - 3.5);
        setFuelBarHeight({ width: Number(firstFuel) + "px", maxWidth: "5.5vw" });
        setStage("first");
      }
      setMarginBottom(marginBottom + 5);
      setPathsHeight(Number(pathsHeight) + 5);
    }, 1000);
    return () => clearInterval(timer);
  }, [marginBottom, pathsHeight, firstFuel, secondFuel]);

  let successMsg;
  let rockets = (
    <div className={classes.RocketPath}>
      {!secondStageStarted && !secondStageFinished ? (
        <div className={classes.Rocket} style={{ marginBottom: marginBottom + "px" }}>
          <div className={classes.RocketBody}>
            <img className={classes.RocketParts} src={rocket} alt='rocket' />
            <img className={classes.RocketParts} src={thrust} alt='thrust' />
          </div>
          <div className={classes.RocketFuel}>
            <h3>Name: {name}</h3>
            <div className={classes.RocketFuelInfo}>
              <h3>Fuel:</h3>
              <div className={classes.RocketFuelBar} style={fuelBarHeight}></div>
            </div>
            <h3>Stage: {stage}</h3>
          </div>
        </div>
      ) : secondStageStarted && !secondStageFinished ? (
        <div className={classes.Rocket} style={{ marginBottom: marginBottom + "px" }}>
          <div className={classes.RocketBody}>
            <img className={classes.RocketParts} src={rocketTop} alt='rocket' />
            <img className={classes.RocketParts} src={thrust} alt='thrust' />
          </div>
          <div className={classes.RocketFuel}>
            <h3>Name: {name}</h3>
            <div className={classes.RocketFuelInfo}>
              <h3>Fuel:</h3>
              <div className={classes.RocketFuelBar} style={fuelBarHeight}></div>
            </div>
            <h3>Stage: {stage}</h3>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (rockets.props.children === null) {
    count++;
    if (count === numberOfRockets * 2) {
      successMsg = <Dialog />;
    }
  }

  return (
    <div>
      {rockets}
      {successMsg}
    </div>
  );
});

export default Rocket;
