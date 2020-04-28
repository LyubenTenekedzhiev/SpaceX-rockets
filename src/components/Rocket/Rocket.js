import React from "react";

import rocket from "../../assets/rocket.png";
import thrust from "../../assets/thrust.png";
import classes from "./Rocket.module.css";

function Rocket() {
  return (
    <div className={classes.Rocket}>
      <img src={rocket} alt='rocket' />
      <img src={thrust} alt='thrust' />
    </div>
  );
}

export default Rocket;
