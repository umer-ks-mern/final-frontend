import React from "react";

const Message = ({ sender, message }) => {
  return (
    <div className="message">
      <div className="sender">{sender}</div>
      <div className="message-content">{message}</div>
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} message={msg.message} />
      ))}
    </div>
  );
};

const ChatInput = () => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    // Implement your logic to send the message
    console.log("Sending message:", inputValue);
    setInputValue("");
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

const InstagramMessageUI = () => {
  const messages = [
    { sender: "John", message: "Hey there!" },
    { sender: "Jane", message: "Hi John!" },
    { sender: "John", message: "How are you?" },
    { sender: "Jane", message: "I'm good, thanks!" },
  ];

  return (
    <div className="instagram-message-ui">
      <h1>Instagram Message UI</h1>
      <MessageList messages={messages} />
      <ChatInput />
    </div>
  );
};

export default InstagramMessageUI;
