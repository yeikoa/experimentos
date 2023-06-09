"use client"
import "../../css/memory.css"
import React, { useState } from 'react';


type Card = { id: number; emoji: string; isFlipped: boolean };

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
const cards: Card[] = [...emojis, ...emojis]
  .sort(() => Math.random() - 0.5)
  .map((emoji, id) => ({ id, emoji, isFlipped: false }));

const MemoryGame: React.FC = () => {
  const [gameCards, setGameCards] = useState(cards);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);

  const handleCardClick = (clickedCard: Card) => {
    setGameCards(
      gameCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, { ...clickedCard, isFlipped: true }]);
  };

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.emoji === card2.emoji) {
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        setGameCards(
          gameCards.map((card) =>
            card.id === card1.id || card.id === card2.id ? { ...card, isFlipped: false } : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }

  return (
    <div className="game-board">
      {gameCards.map((card) => (
        <button
          key={card.id}
          className={`card ${card.isFlipped ? 'flipped' : ''}`}
          onClick={() => handleCardClick(card)}
          disabled={card.isFlipped}
        >
          {card.isFlipped && card.emoji}
        </button>
      ))}
    </div>
  );
};

export default MemoryGame;
