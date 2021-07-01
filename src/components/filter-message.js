import React from "react";
import { FaTimes } from "react-icons/fa";

function FilterMessage({ message, deleteFilterMessage }) {
  return (
    <div className="row" style={{ padding: "5px", fontSize: "12px" }}>
      <div className="col-1">
        <FaTimes
          onClick={() => deleteFilterMessage(message.id)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </div>
      <div className="col-3">
        <p>{message.word}</p>
      </div>
    </div>
  );
}

export default FilterMessage;
