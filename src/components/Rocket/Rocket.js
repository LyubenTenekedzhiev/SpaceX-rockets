import React, { useState, useEffect } from "react";

import rocket from "../../assets/rocket.png";
import thrust from "../../assets/thrust.png";
import rocketTop from "../../assets/rocket_top.png";
import Dialog from "../UI/Dialog/Dialog";
import classes from "./Rocket.module.css";

let count = 0;

const Rocket = React.memo(({ firstStageFuel, firstStageEngines, secondStageFuel, secondStageEngines, numberOfRockets }) => {
  const [marginBottom, setMarginBottom] = useState(0);
  const [pathsHeight, setPathsHeight] = useState((window.innerHeight - (window.innerHeight - 0.17 * window.innerHeight)).toFixed(0));
  const [firstFuel, setFirstFuel] = useState((firstStageFuel / firstStageEngines).toFixed(0));
  const [secondFuel, setSecondFuel] = useState((secondStageFuel / secondStageEngines).toFixed(0));
  const [secondStageStarted, setSecondStageStarted] = useState(false);
  const [secondStageFinished, setSecondStageFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Number(pathsHeight) >= Number((window.innerHeight - 0.2 * window.innerHeight).toFixed(0)) || Number(secondFuel) <= 0) {
        setSecondStageFinished(true);
        clearInterval(timer);
        return;
      }
      if (firstFuel <= 0) {
        setSecondStageStarted(true);
        setSecondFuel(Number(secondFuel - 40));
      } else {
        setFirstFuel(Number(firstFuel) - 40);
      }
      setMarginBottom(marginBottom + 15);
      setPathsHeight(Number(pathsHeight) + 15);
    }, 1000);
    return () => clearInterval(timer);
  }, [marginBottom, pathsHeight, firstFuel, secondFuel]);

  let successMsg;
  let rockets = (
    <div className={classes.RocketPath}>
      {!secondStageStarted && !secondStageFinished ? (
        <div className={classes.Rocket} style={{ marginBottom: marginBottom + "px" }}>
          <img src={rocket} alt='rocket' />
          <img src={thrust} alt='thrust' className={classes.RocketThrust} />
        </div>
      ) : secondStageStarted && !secondStageFinished ? (
        <div className={classes.Rocket} style={{ marginBottom: marginBottom + "px" }}>
          <img src={rocketTop} alt='rocket' />
          <img src={thrust} alt='thrust' className={classes.RocketThrust} />
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
