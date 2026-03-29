import Die from "./components/Die";
import { useState } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
function App() {
  const [dices, setDices] = useState(generateAllDices());

  // win condition: all dices are holded and have the same value
  const gameWon = dices.every(
    (die) => die.isHeld && dices[0].value === die.value,
  );

  function randomNum() {
    return Math.ceil(Math.random() * 6);
  }
  function generateAllDices() {
    return new Array(10).fill().map(() => ({
      value: randomNum(),
      isHeld: false,
      id: nanoid(),
    }));
  }
  // func allow us not to roll holded dices
  function rollDices() {
    if (gameWon) {
      setDices(generateAllDices());
    } else {
      setDices((holdDices) =>
        holdDices.map((die) =>
          die.isHeld ? die : { ...die, value: randomNum() },
        ),
      );
    }
  }

  function hold(id) {
    setDices((prevDices) =>
      prevDices.map((die) => (die.id === id ? { ...die, isHeld: true } : die)),
    );
  }

  const dieElements = dices.map((die) => (
    <Die
      holdingDice={() => hold(die.id)}
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
    />
  ));
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#0B2434]">
      {gameWon && <ReactConfetti tweenDuration={3} />}
      <div className="flex h-100 w-72 flex-col items-center justify-center gap-7 rounded-2xl bg-[#eee8e8] px-2 py-4 sm:w-86 md:size-96">
        {/* Text content */}
        <div className="text-center md:w-72">
          <h1 className="text-secondary text-2xl font-bold md:text-3xl">
            Tenzies
          </h1>
          <p className="text-[#4A4E74] md:text-lg">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        {/* dices */}
        <div className="flex flex-wrap justify-center gap-4">{dieElements}</div>
        <button
          onClick={rollDices}
          className="w-fit cursor-pointer rounded-lg bg-[#5035FF] px-5 py-2.5 text-lg font-bold tracking-wider text-white"
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
