import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const socket = useMemo(() => io('https://backend-my-msg-app.onrender.com'), []);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
 

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected with socket ID:", socket.id);
    });

    socket.on("paired", ({ roomId }) => {
      setRoomId(roomId);
      setStatusMessage("Stranger is connected.");
      
    });

    const handleMessage = (msg) => {
      
      if (msg.text !== "Stranger is disconnected." || msg.senderId !== socket.id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: msg.text, sender: msg.senderId === socket.id ? 'me' : 'stranger' }
        ]);
      }
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);

 

  const handleNewChat = () => {
    if (roomId) {
      
      socket.emit('strangerDisconnected', { roomId });
      setStatusMessage("Searching for new strangers...");
      setMessages([]); 
    } else {
      setStatusMessage("Waiting for strangers...");
    }
    socket.emit("joinQueue");
    setRoomId(null); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '' && roomId) {
      socket.emit('message', { message, roomId });
      
      setMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <div className='messages'>
        {statusMessage && <div className="status-message">{statusMessage}</div>}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'me' ? 'right' : 'left'}`}>
            {msg.sender === 'me' ? 'me: ' : 'Stranger: '}
            {msg.text}
          </div>
        ))}
        
      </div>

      <div className='send'>
        <form onSubmit={handleSubmit}>
          <button type='button' className='new-chat' onClick={handleNewChat}   onTouchStart={handleNewChat}>New Chat</button>
          <input type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type a message'
            className='message-input'
            
          />
          <button type='submit' className='send-button' >Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
