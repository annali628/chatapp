import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

// i want to connect to the socket.io server
// this sends a 'connection' request to your socket io server
// you sent a connection request
// but your backendd is not listening to any connection requests yet
const socket = io("https://chatappbyannabackend.onrender.com");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("allMessages", (data) => {
      setMessages(data);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit("sendMessage", message);
    setMessage("");
  };
  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button>Send Message</button>
      </form>
    </>
  );
}

export default App;
