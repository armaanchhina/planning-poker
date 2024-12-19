import PokerCard from "../../components/PokerCard/PokerCard";
import "./GameRoom.css"
import React, { useState } from 'react';

export default function GameRoom() {
  const [isRevealed, setIsRevealed] = useState<boolean>(false); // State to toggle between vote and reveal
  const [selectedCard, setSelectedCard] = useState<number>(-1); // Track the card selected by the user
  const fibValues = [1, 2, 3, 5, 8, 13, 21];

  const users = [
    { id: 1, name: 'Alice', hasVoted: true, score: 5 },
    { id: 2, name: 'Bob', hasVoted: false, score: 8 },
    { id: 3, name: 'Charlie', hasVoted: true, score: 13 },
  ];

  const handleReveal = () => setIsRevealed(true);
  const handleReset = () => {
    setIsRevealed(false);
    setSelectedCard(-1);
  };

  return (
    <div className="game-page">
      <div className="upper-section">
        {users.map((user) => (
          <div key={user.id} className="user">
            <span className="user-avatar">{user.name[0]}</span>
            <span className="user-name">{user.name}</span>
            {isRevealed ? (
              <span className="user-score">Score: {user.score}</span>
            ) : (
              <span className={`user-status ${user.hasVoted ? 'voted' : 'not-voted'}`}>
                {user.hasVoted ? '✔️' : '❌'}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Lower Section */}
      <div className="lower-section">
        {isRevealed ? (
          <PokerCard number={selectedCard === -1 ? 'N/A' : selectedCard} />
        ) : (
          fibValues.map((value) => (
            <div
              key={value}
              onClick={() => setSelectedCard(value)}
              className={`selectable-card ${selectedCard === value ? 'selected' : ''}`}
            >
              <PokerCard number={value} />
            </div>
          ))
        )}
      </div>

      {/* Button Section */}
      <div className="button-section">
        <button onClick={isRevealed ? handleReset : handleReveal} className="action-button">
          {isRevealed ? 'Reset' : 'Reveal Scores'}
        </button>
      </div>
    </div>
  );
}