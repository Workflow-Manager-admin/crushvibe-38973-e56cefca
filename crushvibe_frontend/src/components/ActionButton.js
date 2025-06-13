import React from "react";

/**
 * PUBLIC_INTERFACE
 * The glossy pink Scan the Vibe button.
 * @param {{
 *   onClick: function,
 *   onKeyDown?: function,
 * }}
 */
function ActionButton({ onClick, onKeyDown }) {
  return (
    <button
      type="button"
      className="scan-vibe-btn"
      tabIndex="0"
      aria-label="Scan the Vibe"
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span className="scan-btn-text">
        Scan the Vibe <span role="img" aria-label="love emoji">💘</span>
      </span>
    </button>
  );
}

export default ActionButton;
