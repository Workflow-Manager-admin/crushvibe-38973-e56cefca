import React from "react";

/**
 * PUBLIC_INTERFACE
 * Shows the romantic results and flirty DM line.
 * @param {{
 *    resultMsg: string,
 *    dmLine: string,
 * }}
 */
function ResultsBox({ resultMsg, dmLine }) {
  const show = Boolean(resultMsg || dmLine);
  return (
    <div
      className={`romantic-results-box${show ? " show" : ""}`}
      id="resultLiveBox"
      role="region"
      tabIndex={0}
      aria-live="polite"
      aria-atomic="true"
      aria-label="Romantic result and DM line output"
      style={{ minHeight: "0.5em", marginTop: "-6px", outline: "none" }}
    >
      {show && (
        <span className="romantic-results-message" style={{ width: "100%" }}>
          {!!resultMsg && <span>{resultMsg}</span>}
          {!!dmLine && (
            <span className="flirty-dm-line">
              <br />
              {dmLine}
            </span>
          )}
        </span>
      )}
    </div>
  );
}

export default ResultsBox;
