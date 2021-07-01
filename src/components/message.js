import React from "react";
import "./message.css";
import { formatRelative } from "date-fns";

function Message({ createdAt, nickname, text, picture }) {

  const formatDate = (date) => {
    let formattedDate = "";
    if (date) {
      formattedDate = formatRelative(date, new Date());
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  return (
    <div className="container">
      <div className="row message">
        <div className="col-1">
          <div className="picture">
            {picture ? (
              <img
                className="avatar"
                src={picture}
                alt="Avatar"
                width={35}
                height={35}
              />
            ) : null}
          </div>
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-2 nickname">
              {nickname ? <p>{nickname}</p> : null}
            </div>
            <div className="col-3 date">
              {createdAt?.seconds ? (
                <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
              ) : null}{" "}
            </div>
          </div>
          <div className="row text">
            <p className="paragrph">{text}</p>
          </div>
          <div className="col-3 date"></div>
        </div>
      </div>
    </div>
  );
}

export default Message;
