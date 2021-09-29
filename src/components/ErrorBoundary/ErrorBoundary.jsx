import React from "react";
import { ReactComponent as Warning } from "../../assets/warning.svg";

export default function ErrorBoundary() {
  return (
    <div className="no-result wrong">
      <div className="svg-container">
        <Warning />
      </div>

      <div className="no-result-text">something went wrong</div>
      <div
        className="no-result-text-bottom action"
        onClick={() => {
          window.location.reload();
        }}
      >
        click to reload
      </div>
    </div>
  );
}
