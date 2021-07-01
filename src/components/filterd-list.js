import React from "react";
import FilterMessage from "./filter-message";
import "./filter-list.css";

function FilterdList({ filteredMessages, deleteFilterMessage }) {
  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        {filteredMessages.map((message) => (
          <li>
            <FilterMessage
              message={message}
              deleteFilterMessage={deleteFilterMessage}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterdList;
