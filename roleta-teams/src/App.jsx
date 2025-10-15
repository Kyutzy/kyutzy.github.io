import React, { useEffect, useState } from "react";
import { LiveShareClient } from "@microsoft/live-share";
import { LiveState } from "@microsoft/live-share";
import { app, meeting } from "@microsoft/teams-js";
import { Wheel } from "react-custom-roulette";

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [sharedState, setSharedState] = useState(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Inicializa o Teams e o Live Share
  useEffect(() => {
    async function init() {
      await app.initialize();
      const { participants } = await meeting.getParticipantList();
      setParticipants(participants.map(p => p.displayName));

      const liveShare = new LiveShareClient();
      const { container } = await liveShare.joinContainer("roleta-container");
      const state = container.initObject("roletaState", LiveState);
      setSharedState(state);

      state.on("stateChanged", (key, value) => {
        if (key === "spin") {
          setPrizeNumber(value);
          setMustSpin(true);
        }
      });
    }
    init();
  }, []);

  const handleSpinClick = () => {
    if (!sharedState) return;
    const newPrize = Math.floor(Math.random() * participants.length);
    sharedState.set("spin", newPrize);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <h2>🎯 Roleta da Reunião</h2>
      {participants.length > 0 ? (
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={participants.map(p => ({ option: p }))}
            onStopSpinning={handleStopSpinning}
          />
          <button onClick={handleSpinClick} style={{ marginTop: "1rem" }}>
            Girar
          </button>
        </>
      ) : (
        <p>Carregando participantes...</p>
      )}
    </div>
  );
}
