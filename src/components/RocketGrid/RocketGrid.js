import React from "react";

import Rocket from "./../Rocket/Rocket";
import classes from "./RocketGrid.module.css";

function RocketGrid() {
  return (
    <div className={classes.RocketGrid}>
      <Rocket />
      <Rocket />
      <Rocket />
      <Rocket />
    </div>
  );
}

export default RocketGrid;
