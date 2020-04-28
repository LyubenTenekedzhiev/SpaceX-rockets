import React, { useState, useEffect } from "react";

import Rocket from "./../Rocket/Rocket";
import classes from "./RocketGrid.module.css";

function RocketGrid() {
  const [rocketData, setRocketData] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v2/rockets")
      .then((req) => req.json())
      .then((res) => {
        setRocketData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(rocketData);
  const rockets = rocketData.map((rocket) => {
    return (
      <Rocket
        key={rocket.id}
        firstStageFuel={rocket.first_stage.fuel_amount_tons}
        firstStageEngines={rocket.first_stage.engines}
        secondStageFuel={rocket.second_stage.fuel_amount_tons}
        secondStageEngines={rocket.second_stage.engines}
        numberOfRockets={rocketData.length}
      />
    );
  });
  return <div className={classes.RocketGrid}>{rockets}</div>;
}

export default React.memo(RocketGrid);
