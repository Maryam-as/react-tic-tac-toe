import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";

function App() {
  // manage the array of turns taken during the game
  const [gameTurns, setGameTurns] = useState([]);
  // manage the activePlayer state in App component which has access to both Player & GameBoard components that need to work with this state
  const [activePlayer, setActivePlayer] = useState("X");
  // Define a function to switch turns after a square is selected on the game board
  function handleSelectSquare() {
    // Update the state to toggle between 'X' and 'O' for the next player's turn
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
    setGameTurns();
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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
