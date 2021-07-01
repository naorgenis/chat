import React from "react";
import "./form.css";

function Form({ onChange, onSubmit, newMessage, buttonText }) {
  return (
    <form className="input-group mb-3 form" onSubmit={onSubmit}>
      <input
        className="form-control"
        type="text"
        value={newMessage}
        onChange={(e) => onChange(e)}
        placeholder="message"
      />
      <button className="input-group-text" type="submit" disabled={!newMessage}>
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
