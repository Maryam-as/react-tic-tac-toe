import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";

function App() {
  // manage the array of turns taken during the game
  const [gameTurns, setGameTurns] = useState([]);
  // derive the currently active player from the gameTurns state
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  // Define a function to switch turns after a square is selected on the game board
  function handleSelectSquare(rowIndex, colIndex) {
    // update the gameTurns based on the previous state of the gameTurns
    setGameTurns((prevTurns) => {
      // determine the symbol of the currently active player based on the latest turn
      let currentPlayer = "X";
      // Check if the first item(latest turn) in prevTurns array has player "X".
      // check if there is a latest turn stored (it's not an empty array)
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      // create a deep copy of the old state to update the gameTurns state array in an immutable way
      // insert the new turn in front of the old turns, so the 1st item in the updated array is always the latest turn
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {/* pass handleSelectSquare as a prop to GameBoard because that’s where the square selection occurs */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
