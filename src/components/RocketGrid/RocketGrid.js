import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import RocketSprite from "./../Sprites/RocketSprite";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import { fetchRocketData } from "../../functions/fetchingData";
import classes from "./RocketGrid.module.css";

function RocketGrid({ shouldStageBeCleared }) {
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
        <RocketSprite
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
  return <div className={classes.RocketGrid}>{shouldStageBeCleared.length === 4 ? <Modal show={true} /> : rockets}</div>;
}

const mapStateToProps = (state) => {
  return {
    shouldStageBeCleared: state.shouldStageBeCleared,
  };
};

export default connect(mapStateToProps)(React.memo(RocketGrid));
