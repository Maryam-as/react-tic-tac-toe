import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// define the structure for a 3x3 grid game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  // manage the array of turns taken during the game
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  // derive the gameBoard from the gameTurns state
  let gameBoard = initialGameBoard;
  // overwrite the gameBoard with the data from gameTurns array if there are any turns
  // if gameTurns is an empty array, the loop simply won't execute
  for (const turn of gameTurns) {
    const { square, player } = turn; // destructure turn to get square and player
    const { row, col } = square;
    gameBoard[row][col] = player; // mark the selected square with the player's symbol
  }
  let winner;
  // iterate over all winning combinations to check if there's a winner
  for (const combination of WINNING_COMBINATIONS) {
    // get the symbols from the gameBoard for each square in the current winning combination
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqaureSymbol =
      gameBoard[combination[2].row][combination[2].column];
    // check if the first square is not empty and all three symbols are the same
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSqaureSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
  function handleSelectSquare(rowIndex, colIndex) {
    // update the gameTurns based on the previous state of the gameTurns
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
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
        {/* conditionally render a "You win" message if a winner exists */}
        {winner && <p>You win, {winner}!</p>}
        {/* pass handleSelectSquare as a prop to GameBoard because that’s where the square selection occurs */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
