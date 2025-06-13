import React, { useRef, useEffect, useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * FloatingHearts overlays animated pastel hearts
 * for a dreamy, playful, romantic effect.
 */
function FloatingHearts() {
  const containerRef = useRef();

  useEffect(() => {
    const NUM_HEARTS = 14;
    const DURATION = 4800; // ms

    let running = true;

    // Pick 1–6 pastel heart
    function randomHeartType() {
      return Math.floor(Math.random() * 6) + 1;
    }
    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Clear floating hearts from previous runs
    if (containerRef.current) containerRef.current.innerHTML = '';

    function makeHeart(idx) {
      // Place at random x, size, delay; fade; random tint via CSS class
      const left = randInt(4, 96); // vw
      const size = randInt(20, 38);
      const animDelay = Math.random() * 2.2; // sec
      const heartType = randomHeartType();
      const initialOpacity = (Math.random() * 0.22 + 0.68).toFixed(2);

      const div = document.createElement('div');
      div.className = `heart heart${heartType}`;
      div.style.left = `${left}vw`;
      div.style.bottom = '-60px';
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.opacity = initialOpacity;
      div.style.animationDelay = `${animDelay}s`;
      div.style.animationDuration = `${(DURATION / 1000 + Math.random() * 1.25).toFixed(2)}s`;

      // SVG soft heart, color by CSS
      div.innerHTML = `
        <svg viewBox="0 0 32 29" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.5 2c-2.6 0-4.9 1.6-5.5 4C17 3.7 14.7 2 12.1 2 7.8 2 4.5 5.3 4.5 9.6c0 4.3 3.5 8.5 8.8 13.4l2.2 2 2.2-2c5.3-4.9 8.8-9.1 8.8-13.4C27.5 5.3 24.2 2 19.9 2h-0.2z"/>
        </svg>
      `;
      containerRef.current.appendChild(div);

      // Remove after animation ends
      setTimeout(() => {
        if (div.parentElement) div.parentElement.removeChild(div);
      }, DURATION + animDelay * 1000 + 600);
    }

    // Start burst, then interval sprinkle
    function spawnLoop() {
      if (!running) return;
      for (let i = 0; i < NUM_HEARTS; i++) {
        setTimeout(() => makeHeart(i), Math.random() * 1600);
      }
      // Continual hearts
      const interval = setInterval(() => {
        let newHearts = randInt(1, 2);
        for (let i = 0; i < newHearts; i++) makeHeart(i + Date.now());
      }, 1000);

      return () => {
        clearInterval(interval);
        running = false;
      };
    }

    const cleanup = spawnLoop();

    return () => {
      running = false;
      if (cleanup) cleanup();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  // Render overlay (pointer-events:none; z-index:0)
  return (
    <div className="floating-hearts-background" ref={containerRef} aria-hidden="true"></div>
  );
}

/**
 * Romantic messages list for CrushVibe "Scan the Vibe"
 */
const ROMANTIC_MESSAGES = [
  'They like you... and your dog pics 🐶',
  'This is giving mutual situationship 💅',
  'They play cool but their heart races 🥹',
  'It’s a NO from the universe, bbg 💔',
  'They saved your reel... TWICE. It’s fate 😳',
  'Stop playing, you’re the crush 😏',
  'You should shoot your shot. Right now. 💘',
  'They think about you at 3am 👀✨'
];

// PUBLIC_INTERFACE
function App() {
  // State to track current result message
  const [resultMsg, setResultMsg] = useState('');

  // Handler for Scan the Vibe button
  // PUBLIC_INTERFACE
  function handleScanVibeClick(e) {
    e.preventDefault();
    // Pick a random message from the list
    const idx = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
    setResultMsg(ROMANTIC_MESSAGES[idx]);
  }

  return (
    <div
      className="app"
      style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}
    >
      {/* Background floating dreamy hearts overlay */}
      <FloatingHearts />

      <div className="center-flex" tabIndex={-1}>
        <main className="centered-main-container" role="main">
          {/* All app UI elements go inside this responsive container */}
          <nav className="navbar" style={{ zIndex: 2 }}>
            <div className="container">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div className="logo">
                  <span className="logo-symbol">*</span> KAVIA AI
                </div>
                <button className="btn">Template Button</button>
              </div>
            </div>
          </nav>
          <section className="hero">
            {/* Large playful Crush-O-Meter title */}
            <h1 className="crush-title">
              Crush-O-Meter <span role="img" aria-label="love emoji">💘</span>
            </h1>
            {/* Pastel, dreamy heart input fields (beautiful, accessible) */}
            <form className="crush-input-form" autoComplete="off" aria-label="Crush-O-Meter Names">
              <div className="input-row">
                <label htmlFor="yourName" className="input-label">
                  <span className="visually-hidden">Your Name</span>
                  <span className="heart-input-icon" aria-hidden="true">
                    {/* SVG or emoji Heart */}
                    <svg width="21" height="19" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.5 2c-2.6 0-4.9 1.6-5.5 4C17 3.7 14.7 2 12.1 2 7.8 2 4.5 5.3 4.5 9.6c0 4.3 3.5 8.5 8.8 13.4l2.2 2 2.2-2c5.3-4.9 8.8-9.1 8.8-13.4C27.5 5.3 24.2 2 19.9 2h-0.2z" fill="#FFB6C1"/>
                    </svg>
                  </span>
                  <input
                    id="yourName"
                    className="pastel-heart-input"
                    name="yourName"
                    type="text"
                    inputMode="text"
                    autoComplete="name"
                    maxLength="32"
                    placeholder="Type your real name or your baddie nickname… 💗"
                    aria-label="Your Name"
                    required
                    spellCheck={false}
                  />
                </label>
              </div>
              <div className="input-row">
                <label htmlFor="crushName" className="input-label">
                  <span className="visually-hidden">Your Crush’s Name</span>
                  <span className="heart-input-icon" aria-hidden="true">
                    {/* SVG or emoji Heart */}
                    <svg width="21" height="19" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.5 2c-2.6 0-4.9 1.6-5.5 4C17 3.7 14.7 2 12.1 2 7.8 2 4.5 5.3 4.5 9.6c0 4.3 3.5 8.5 8.8 13.4l2.2 2 2.2-2c5.3-4.9 8.8-9.1 8.8-13.4C27.5 5.3 24.2 2 19.9 2h-0.2z" fill="#FFD6E0"/>
                    </svg>
                  </span>
                  <input
                    id="crushName"
                    className="pastel-heart-input"
                    name="crushName"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    maxLength="32"
                    placeholder="That cutie’s government name… or their Insta handle! 💖"
                    aria-label="Your Crush’s Name"
                    required
                    spellCheck={false}
                  />
                </label>
              </div>
              {/* Large, glossy pink Scan the Vibe button */}
              <button
                type="button"
                className="scan-vibe-btn"
                tabIndex="0"
                aria-label="Scan the Vibe"
                onClick={handleScanVibeClick}
              >
                <span className="scan-btn-text">
                  Scan the Vibe <span role="img" aria-label="love emoji">💘</span>
                </span>
              </button>
              {/* Results display box: Appears only when a result message exists. Soft pastel, playful font, rounded and shadowed. */}
              <div
                className={`romantic-results-box${resultMsg ? " show" : ""}`}
                aria-live="polite"
                style={{ minHeight: "0.5em", marginTop: "-6px"}}
              >
                {resultMsg && (
                  <span className="romantic-results-message">
                    {resultMsg}
                  </span>
                )}
              </div>
            </form>
            {/* Example content - replace with main UI */}
            <div className="subtitle">AI Workflow Manager Template</div>
            <h1 className="title" style={{display:"none"}}>crushvibe_frontend</h1>
            <div className="description">Start building your application.</div>
            {/* <button className="btn btn-large">Button</button> */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
