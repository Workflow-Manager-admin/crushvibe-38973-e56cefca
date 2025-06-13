import React from "react";

/**
 * PUBLIC_INTERFACE
 * Pastel reset button to clear app state.
 * @param {{
 *   onClick: function,
 *   style?: object,
 * }}
 */
function ResetButton({ onClick, style }) {
  return (
    <button
      type="button"
      className="reset-btn"
      tabIndex="0"
      aria-label="Reset all fields and results"
      aria-pressed="false"
      onClick={onClick}
      style={{
        margin: "30px auto 0 auto",
        display: "block",
        position: "relative",
        zIndex: 4,
        bottom: 0,
        left: 0,
        right: 0,
        ...style
      }}
      autoFocus={false}
    >
      <span className="reset-btn-text">
        Reset <span role="img" aria-label="reset symbol">🔄</span>
      </span>
    </button>
  );
}

export default ResetButton;
