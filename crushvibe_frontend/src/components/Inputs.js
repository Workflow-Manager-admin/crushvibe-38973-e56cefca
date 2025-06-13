import React from "react";

// PUBLIC_INTERFACE
function focusNextFocusable(current) {
  const FOCUSABLE_SELECTORS =
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
  if (!current) return;
  const focusables = Array.from(
    current.closest("form").querySelectorAll(FOCUSABLE_SELECTORS)
  ).filter(el => !el.disabled && el.offsetParent !== null);
  const idx = focusables.indexOf(current);
  if (idx >= 0 && idx < focusables.length - 1) {
    focusables[idx + 1].focus();
  }
}

/**
 * @param {{
 *  yourName: string,
 *  crushName: string,
 *  setYourName: function,
 *  setCrushName: function,
 * }}
 */
function Inputs({ yourName, crushName, setYourName, setCrushName }) {
  return (
    <>
      <div className="input-row">
        <label htmlFor="yourName" className="input-label">
          <span className="visually-hidden">Your Name</span>
          <span className="heart-input-icon" aria-hidden="true">
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
            value={yourName}
            onChange={e => setYourName(e.target.value)}
            aria-required="true"
            aria-describedby="yourNameHelp"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === "Tab") {
                if (!e.shiftKey && e.key === "Enter") {
                  e.preventDefault();
                  focusNextFocusable(e.target);
                }
              }
            }}
          />
          <span id="yourNameHelp" className="visually-hidden">
            Enter your name or nickname.
          </span>
        </label>
      </div>
      <div className="input-row">
        <label htmlFor="crushName" className="input-label">
          <span className="visually-hidden">Your Crush’s Name</span>
          <span className="heart-input-icon" aria-hidden="true">
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
            value={crushName}
            onChange={e => setCrushName(e.target.value)}
            aria-required="true"
            aria-describedby="crushNameHelp"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === "Tab") {
                if (!e.shiftKey && e.key === "Enter") {
                  e.preventDefault();
                  focusNextFocusable(e.target);
                }
              }
            }}
          />
          <span id="crushNameHelp" className="visually-hidden">
            Enter their name or username.
          </span>
        </label>
      </div>
    </>
  );
}

export default Inputs;
