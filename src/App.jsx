import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";

function App() {
  // manage the activePlayer state in App component which has access to both Player & GameBoard components that need to work with this state
  const [activePlayer, setActivePlayer] = useState("x");
  // Define a function to switch turns after a square is selected on the game board
  function handleSelectSquare() {
    // Update the state to toggle between 'X' and 'O' for the next player's turn
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
      LOG
    </main>
  );
}

export default App;
