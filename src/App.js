import React from "react";

import RocketGrid from './components/RocketGrid/RocketGrid';
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <RocketGrid />
    </div>
  );
}

export default React.memo(App);
