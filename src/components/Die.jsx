function Die({ value, isHeld }) {
  return (
    <button className={`die ${isHeld ? "bg-primary" : "bg-white"}`}>
      {value}
    </button>
  );
}

export default Die;
