import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "./channel.css";
import Chat from "../components/chat";
import Form from "../components/form";
import AlertMessage from "../components/alertMessage";
import FilterdList from "../components/filterd-list";

function Channel({ user = null, db = null }) {
  const { nickname, picture } = user;
  const isAdmin = user["https://example.com/roles"]?.[0];
  const [newFilterMessage, setNewFilterMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [alertIsOn, setAlertIsOn] = useState(false);
  let content;

  if (!isAdmin) {
    const filters = filteredMessages.map((message) => message.word);
    content = (
      <Chat
        messages={messages.filter((message) => {
          return !filters.includes(message.text.toLowerCase());
        })}
      />
    );
  } else {
    content = <Chat messages={messages} />;
  }

  const fetchFilteredWords = async () => {
    const res = await fetch("http://localhost:5000/filters");
    const data = await res.json();

    setFilteredMessages(data);
  };

  useEffect(() => {
    fetchFilteredWords();
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handelOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const onSubmitHandel = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      checkIfExist();
    }
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        nickname,
        picture,
      });
    }
    setNewMessage("");
  };

  const handelOnChangeFilter = (e) => {
    setNewFilterMessage(e.target.value);
  };

  const onSubmitFilterHandel = (e) => {
    e.preventDefault();

    addFilterdWord();
    if (!isAdmin) {
      const filterdMessages = messages.filter(
        (message) =>
          !message.text.toLowerCase().includes(newFilterMessage.toLowerCase())
      );

      setMessages(filterdMessages);
    }
    setNewFilterMessage("");
  };

  const addFilterdWord = async () => {
    const filterWord = { word: newFilterMessage };
    try {
      const res = await fetch("http://localhost:5000/filters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(filterWord),
      });
      const data = await res.json();
      setFilteredMessages([...filteredMessages, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFilterMessage = async (id) => {
    await fetch(`http://localhost:5000/filters/${id}`, {
      method: "DELETE",
    });

    setFilteredMessages(
      filteredMessages.filter((message) => message.id !== id)
    );
  };

  const checkIfExist = () => {
    const filter = filteredMessages.map((filter) => filter.word);
    if (filter.includes(newMessage)) setAlertIsOn(true);
  };

  const alertToggle = () => {
    setAlertIsOn(!alertIsOn);
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div className="chat-container">
            {content}
            <hr />
            <div className="row">
              <Form
                className="send-message"
                onChange={handelOnChange}
                onSubmit={onSubmitHandel}
                newMessage={newMessage}
                buttonText={"send"}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          {isAdmin ? (
            <div>
              <Form
                onChange={handelOnChangeFilter}
                onSubmit={onSubmitFilterHandel}
                newMessage={newFilterMessage}
                buttonText={"filter"}
              />
              <div class="filtered-list">
                <FilterdList
                  filteredMessages={filteredMessages}
                  deleteFilterMessage={deleteFilterMessage}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {alertIsOn ? (
        <AlertMessage
          alertOff={alertToggle}
          alertMessage={
            "your message was redacted due to bad language, please be nice!"
          }
        />
      ) : null}
    </div>
  );
}

export default Channel;
