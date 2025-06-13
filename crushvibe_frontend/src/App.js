import React, { useState } from "react";
import "./App.css";
import FloatingHearts from "./components/HeartAnimation";
import Inputs from "./components/Inputs";
import ActionButton from "./components/ActionButton";
import ResultsBox from "./components/ResultsBox";
import DMGeneratorButton from "./components/DMGeneratorButton";
import ResetButton from "./components/ResetButton";

const ROMANTIC_MESSAGES = [
  "They like you... and your dog pics 🐶",
  "This is giving mutual situationship 💅",
  "They play cool but their heart races 🥹",
  "It’s a NO from the universe, bbg 💔",
  "They saved your reel... TWICE. It’s fate 😳",
  "Stop playing, you’re the crush 😏",
  "You should shoot your shot. Right now. 💘",
  "They think about you at 3am 👀✨"
];

const FLIRTY_DM_LINES = [
  "Are you Netflix? Because I could stare at you all night.",
  "You're the reason my phone lights up and my heart speeds up 😘",
  "I was going to play it cool, but damn... you’re distracting me.",
  "Stop being cute. I'm trying to be normal here.",
  "You’ve been living rent-free in my head all week 🧠💘",
  "Sooo… when are you taking me out? Asking for a friend 😏",
  "If I had a crush on anyone else, I’d be lying.",
  "You make blushing a full-time job 😳",
  "Wanna be the reason I cancel all my plans this weekend? 👀",
  "You like me. Just admit it already.",
  "If flirting was a crime, I’d be guilty. With you as my partner-in-crime 🔥",
  "I wish I was your phone so you'd touch me all the time 😩📱",
  "Tell me your favorite movie so I can pretend to like it too 😇",
  "Lowkey? Highkey? I want to kiss you. Constantly.",
  "I swear your smile should be illegal. Too powerful.",
  "If you don’t message me first, I might cry… cutely.",
  "Hey, stop looking so good. I’m trying to focus here.",
  "If we were in a group project, I’d do all the work… just to sit next to you.",
  "You up? Just thinking about you… and maybe marrying you 😅",
  "Plot twist: I’ve had a crush on you since forever. 😳"
];

function App() {
  const [resultMsg, setResultMsg] = useState('');
  const [dmLine, setDmLine] = useState('');
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');

  function handleScanVibeClick(e) {
    if (e) e.preventDefault();
    const idx = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
    setResultMsg(ROMANTIC_MESSAGES[idx]);
    setDmLine('');
    setTimeout(() => {
      const box = document.getElementById("resultLiveBox");
      if (box) box.focus();
    }, 25);
  }

  function handleFlirtyDMClick(e) {
    if (e) e.preventDefault();
    const idx = Math.floor(Math.random() * FLIRTY_DM_LINES.length);
    setDmLine(FLIRTY_DM_LINES[idx]);
    setTimeout(() => {
      const box = document.getElementById("resultLiveBox");
      if (box) box.focus();
    }, 18);
  }

  function handleReset(e) {
    if (e) e.preventDefault();
    setYourName('');
    setCrushName('');
    setResultMsg('');
    setDmLine('');
    setTimeout(() => {
      const input = document.getElementById("yourName");
      if (input) input.focus();
    }, 14);
  }

  return (
    <div
      className="app"
      style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
    >
      <FloatingHearts />

      <div className="center-flex" tabIndex={-1}>
        <main className="centered-main-container" role="main">
          <section className="hero" style={{ marginTop: 0, paddingTop: 0 }}>
            <h1 className="crush-title">
              Crush-O-Meter <span role="img" aria-label="love emoji">💘</span>
            </h1>
            <form
              className="crush-input-form"
              autoComplete="off"
              aria-label="Crush-O-Meter Names"
              role="form"
              onSubmit={e => e.preventDefault()}
            >
              <Inputs
                yourName={yourName}
                crushName={crushName}
                setYourName={setYourName}
                setCrushName={setCrushName}
              />
              <ActionButton
                onClick={handleScanVibeClick}
                onKeyDown={e => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleScanVibeClick(e);
                  }
                }}
              />
              <ResultsBox
                resultMsg={resultMsg}
                dmLine={dmLine}
              />
              <DMGeneratorButton
                onClick={handleFlirtyDMClick}
                onKeyDown={e => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleFlirtyDMClick(e);
                  }
                }}
              />
              <ResetButton
                onClick={handleReset}
              />
            </form>
            <div className="subtitle" style={{ marginTop: 6, marginBottom: 3 }}>
              Built for fun, with big <span role="img" aria-label="sparkling heart">💖</span>
            </div>
            <h1 className="title" style={{ display: "none" }}>crushvibe_frontend</h1>
            <div className="description" style={{ marginBottom: 0 }}>
              Start building your application.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
