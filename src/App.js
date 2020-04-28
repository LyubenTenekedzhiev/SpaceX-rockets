import React from "react";

import backgroundImg from "./assets/bg.jpg";
import RocketGrid from './components/RocketGrid/RocketGrid';
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      {/* <img src={backgroundImg} className={classes.BackgroundImage} alt='background' /> */}
      <RocketGrid />
    </div>
  );
}

export default App;
