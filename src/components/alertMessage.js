import React from "react";
import "./alertMessage.css";

function AlertMessage({ alertMessage, alertOff }) {
  return (
    <div className="modal" onClick={alertOff}>
      <div className="alert">
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Danger:"
          ></svg>
          <div>{alertMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default AlertMessage;
