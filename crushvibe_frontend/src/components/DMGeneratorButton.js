import React from "react";

/**
 * PUBLIC_INTERFACE
 * Flirty DM generator button.
 * @param {{
 *   onClick: function,
 *   onKeyDown?: function,
 * }}
 */
function DMGeneratorButton({ onClick, onKeyDown }) {
  return (
    <button
      type="button"
      className="flirty-dm-btn"
      tabIndex="0"
      aria-label="Generate Flirty DM 💌"
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={onKeyDown}
      // width & margin handled by CSS for responsive harmony
    >
      <span className="flirty-dm-btn-text">
        Generate Flirty DM <span role="img" aria-label="love letter">💌</span>
      </span>
    </button>
  );
}

export default DMGeneratorButton;
