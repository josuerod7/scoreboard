import React, { useState } from 'react';
import './App.css';
import PurchaseCounter from './components/compras';

function App() {
  const [numParticipants, setNumParticipants] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [order, setOrder] = useState([]);
  const [roundScores, setRoundScores] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleNumParticipantsChange = (e) => {
    const num = Number(e.target.value);
    setNumParticipants(num);
    setParticipants(Array(num).fill(''));
  };

  const handleNameChange = (index, name) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };

  const startGame = () => {
    const initialScores = Array(numParticipants).fill(0);
    setScores(initialScores);

    const randomOrder = participants.slice().sort(() => Math.random() - 0.5);
    setOrder(randomOrder);

    setRoundScores(Array(numParticipants).fill(0));
    setCurrentRound(1);
    setGameStarted(true);
  };

  const handleScoreChange = (index, score) => {
    const newRoundScores = [...roundScores];
    newRoundScores[index] = score;
    setRoundScores(newRoundScores);
  };

  const confirmRound = () => {
    const newScores = scores.map((score, index) => score + roundScores[index]);
    setScores(newScores);

    if (currentRound < 7) {
      setCurrentRound(currentRound + 1);
      setRoundScores(Array(numParticipants).fill(0));
    } else {
      alert('Game Over');
    }
  };

  return (
    <div className="App">
      <h1>Anotador de Puntaje</h1>
      {!gameStarted ? (
        <div>
          <label>
            Número de participantes:
            <input
              type="number"
              value={numParticipants}
              onChange={handleNumParticipantsChange}
            />
          </label>
          <div>
            {participants.map((_, index) => (
              <div key={index}>
                <label>
                  Nombre del participante {index + 1}:
                  <input
                    type="text"
                    value={participants[index]}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
          <button onClick={startGame}>Iniciar Juego</button>
        </div>
      ) : (
        <div>
          <h2>Ronda {currentRound}</h2>
          <ul>
            {order.map((participant, index) => (
              <li key={participant} className="participant">
                <div className="participant-info">
                  {participant} - Puntaje Actual: {scores[participants.indexOf(participant)]}
                  {currentRound <= 7 && (
                    <div>
                      <label>
                        Puntos obtenidos:
                        <input
                          type="number"
                          value={roundScores[participants.indexOf(participant)]}
                          onChange={(e) => handleScoreChange(participants.indexOf(participant), Number(e.target.value))}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <PurchaseCounter participant={participant} />
              </li>
            ))}
          </ul>
          <button onClick={confirmRound}>Confirmar Ronda</button>
        </div>
      )}
    </div>
  );
}

export default App;
