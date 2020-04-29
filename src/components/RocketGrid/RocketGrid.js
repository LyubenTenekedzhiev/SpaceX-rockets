import React, { useState, useEffect } from "react";

import Rocket from "./../Rocket/Rocket";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./RocketGrid.module.css";

function RocketGrid() {
  const [rocketData, setRocketData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchRocketData("https://api.spacexdata.com/v2/rockets", setFetching, setRocketData);
  }, []);
  
  let rockets;
  if (fetching) {
    rockets = <Spinner />;
  } else {
    rockets = rocketData.map((rocket) => {
      return (
        <Rocket
          key={rocket.id}
          name={rocket.name}
          firstStageFuel={rocket.first_stage.fuel_amount_tons}
          firstStageEngines={rocket.first_stage.engines}
          secondStageFuel={rocket.second_stage.fuel_amount_tons}
          secondStageEngines={rocket.second_stage.engines}
          numberOfRockets={rocketData.length}
        />
      );
    });
  }
  return <div className={classes.RocketGrid}>{rockets}</div>;
}

export default React.memo(RocketGrid);

// Function for fetching data from the API
const fetchRocketData = async (url, fetching, rocketData) => {
  if (!url) return [];
  fetching(true);
  try {
    const dataResponse = await fetch(url);
    const dataJSON = await dataResponse.json();
    const data = dataJSON;
    rocketData(data);
    fetching(false);
  } catch (error) {
    console.log(error);
    fetching(true);
  }
};
