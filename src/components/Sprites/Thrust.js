import React, { useMemo, useState, useRef, useReducer } from "react";
import { ObservablePoint, Point } from "pixi.js";
import { useTick, Container, SimpleRope } from "@inlet/react-pixi";

import thrust from "../../assets/thrust.png";

const Thrust = ({ firstFuel, secondFuel, scale }) => {
  // Setting initial points and length
  const ropeLength = 2.5;
  const i = useRef(0);

  const initialPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 25; i++) {
      points.push(new Point(i * ropeLength, 0));
    }
    return points;
  }, []);
  const [points, setPoints] = useState(initialPoints);

  const reducer = (_, { data }) => data;
  const [motion, update] = useReducer(reducer);
  const iterTwo = useRef(0);
  useTick((delta) => {
    // Tick for thrust's animation
    const iterOne = (i.current += 1.1 * delta);
    const newPoints = [...points];
    for (let j = 0; j < newPoints.length; j++) {
      newPoints[j].x = j * ropeLength + Math.cos(j * 0.1 + iterOne);
      newPoints[j].y = Math.sin(j * 0.05 + iterOne);
    }
    setPoints(newPoints);

    // Tick for thrust's position
    const positionValue = (iterTwo.current -= 0.005 * delta);
    update({
      type: "update",
      data: {
        x:
          scale === 1.5
            ? Math.sin(positionValue) * 40
            : scale === 1
            ? Math.sin(positionValue) * 25
            : scale === 0.65
            ? Math.sin(positionValue) * 15
            : Math.sin(positionValue),
        y:
          scale === 1.5
            ? Math.sin(positionValue / 3) * 450
            : scale === 1
            ? Math.sin(positionValue / 3) * 250
            : Math.sin(positionValue / 3) * 175,
        scale: scale === 0.65 ? scale - 0.15 : scale === 0.45 ? scale - 0.1 : scale - 0.25,
        anchor: Math.sin(positionValue / 2),
        pivot:
          scale === 1.5 && firstFuel
            ? new ObservablePoint(this, 0, -10, -90)
            : scale === 1 && firstFuel
            ? new ObservablePoint(this, 0, -14.5, -95)
            : scale === 0.65 && firstFuel
            ? new ObservablePoint(this, 0, -13, -90)
            : scale === 0.45 && firstFuel
            ? new ObservablePoint(this, 0, -14, -90)
            : scale === 1.5
            ? new ObservablePoint(this, 0, -10, -55)
            : scale === 1
            ? new ObservablePoint(this, 0, -14.5, -60)
            : scale === 0.65
            ? new ObservablePoint(this, 0, -13, -55)
            : new ObservablePoint(this, 0, -14, -60),
        alpha: (firstFuel || secondFuel) <= 5 && (firstFuel || secondFuel) !== 0 ? Math.sin(positionValue * 20) : true,
      },
    });
  });

  return (
    <Container interactive={true}>
      <SimpleRope image={thrust} points={points} scale={0.75} {...motion} />
    </Container>
  );
};

export default Thrust;
