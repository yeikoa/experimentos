"use client"
import React, { useState } from 'react';

const GuessingGame: React.FC = () => {
  const [guess, setGuess] = useState<number>(0);
  const [target] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guess < target) {
      setMessage('Too low!');
    } else if (guess > target) {
      setMessage('Too high!');
    } else {
      setMessage('You got it!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Guess a number between 1 and 100:
          <input type="number" value={guess} onChange={handleChange} />
        </label>
        <input type="submit" value="Guess" />
      </form>
      <p>{message}</p>
    </div>
  );
};

export default GuessingGame;