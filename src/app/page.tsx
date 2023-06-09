
import GuessingGame from "./components/juegos/juego";
import MemoryGame from "./components/juegos/memory";
import Step from "./components/step";
import Board from "./components/juegos/ticTae";

export default function Home() {
  return (
    <div>
      <GuessingGame></GuessingGame>

      <Board></Board>

      <MemoryGame></MemoryGame>

      

      <Step></Step>
    </div>
  );
}
