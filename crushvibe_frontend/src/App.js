import React, { useRef, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * FloatingHearts displays animated, floating pastel hearts
 * for a dreamy romantic background. Absolutely layered
 * behind main content.
 */
function FloatingHearts() {
  const containerRef = useRef();

  // Pastel heart SVGs and pastel CSS classes
  // Animate via CSS keyframes; each heart gets random delay/position.
  useEffect(() => {
    const NUM_HEARTS = 14;
    const DURATION = 4800; // ms for each floating heart

    let hearts = [];
    let running = true;

    // Helper: returns a random pastel heartType 1-6
    function randomHeartType() {
      return Math.floor(Math.random() * 6) + 1;
    }
    // Helper: random integer in [min, max]
    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Clear previous if any
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    function makeHeart(idx) {
      // Heart will have random left, size, delay, and opacity
      const left = randInt(4, 96); // vw percent
      const size = randInt(20, 38); // px
      const animDelay = Math.random() * 2; // seconds
      const heartType = randomHeartType();
      const initialOpacity = (Math.random() * 0.22 + 0.68).toFixed(2);

      // SVG pastel heart, colored by CSS class
      const div = document.createElement('div');
      div.className = `heart heart${heartType}`;
      div.style.left = `${left}vw`;
      div.style.bottom = '-60px';
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.opacity = initialOpacity;
      div.style.animationDelay = `${animDelay}s`;
      // Optionally, each heart floats at a slightly different speed
      div.style.animationDuration = `${(DURATION / 1000 + Math.random() * 1.3).toFixed(2)}s`;

      // SVG path for a cute heart
      div.innerHTML = `
      <svg viewBox="0 0 32 29" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 2c-2.6 0-4.9 1.6-5.5 4C17 3.7 14.7 2 12.1 2 7.8 2 4.5 5.3 4.5 9.6c0 4.3 3.5 8.5 8.8 13.4l2.2 2 2.2-2c5.3-4.9 8.8-9.1 8.8-13.4C27.5 5.3 24.2 2 19.9 2h-0.2z" />
      </svg>`;
      containerRef.current.appendChild(div);

      // Remove the heart node after animation for perf/leak avoidance
      setTimeout(() => {
        if (div.parentElement) div.parentElement.removeChild(div);
      }, DURATION + animDelay * 1000 + 500);
    }

    // Animate: spawn random hearts periodically
    function spawnLoop() {
      if (!running) return;
      // Start hearts in a burst, then interval
      for (let i = 0; i < NUM_HEARTS; i++) {
        setTimeout(() => makeHeart(i), Math.random() * 1600);
      }
      // Keep spawning new hearts
      const interval = setInterval(() => {
        // Each tick spawn 1–3 new hearts
        let newHearts = randInt(1, 2);
        for (let i = 0; i < newHearts; i++) {
          makeHeart(i + Date.now()); // unique key per heart
        }
      }, 1000);

      // Clear on unmount or on re-execution
      return () => {
        clearInterval(interval);
        running = false;
      };
    }

    const cleanup = spawnLoop();

    // On unmount: clean up
    return () => {
      running = false;
      if (cleanup) cleanup();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  // Absolutely positioned background layer
  return (
    <div className="floating-hearts-background" ref={containerRef} aria-hidden="true"></div>
  );
}

function App() {
  return (
    <div className="app" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Floating hearts: Must render *outside* main content, but inside app */}
      <FloatingHearts />

      <nav className="navbar" style={{ zIndex: 2 }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>

            <h1 className="title">crushvibe_frontend</h1>

            <div className="description">
              Start building your application.
            </div>

            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;