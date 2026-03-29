function Die({ value, isHeld, holdingDice }) {
  return (
    <button
      onClick={holdingDice}
      className={`die ${isHeld ? "bg-primary" : "bg-white"}`}
    >
      {value}
    </button>
  );
}

export default Die;
