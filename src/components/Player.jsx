import { useState } from "react";

export default function Player({ name, symbol }) {
  // Store the information if the Player is currently being edited
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing(true);
  }
  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    // automatically fill this input field with the current player's name
    playerName = <input type="text" value={name} required />;
  }
  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* display the button's caption dynamically, depending on its current state */}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
