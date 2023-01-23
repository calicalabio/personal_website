import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    fetch("/messages/get")
      .then(response => response.json())
      .then(data => setMessages(data.messages))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    fetch("/messages/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "content": messageContent })
    })
      .then(res => res.json())
      .then(data => setMessages([...messages, data.message]))      
      .catch(error => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageContent}
          onChange={event => setMessageContent(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {messages.map(item => (
          <li key={item._id}>MESSAGE: {item.content} DATE: {new Date(item.createdAt).toUTCString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
