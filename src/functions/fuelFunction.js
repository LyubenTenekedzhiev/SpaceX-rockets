export const fuelFunction = (setSecondFuel, setFirstFuel, secondFuel, firstFuel) => {
  if (firstFuel) setFirstFuel(Number(firstFuel) - 1);
  if (firstFuel <= 0) setSecondFuel(Number(secondFuel - 1));

  return {
    firstFuel: firstFuel,
    secondFuel: secondFuel,
  };
};
