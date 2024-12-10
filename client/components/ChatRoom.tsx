import { useWebSocket } from 'hooks/useWebSocket';
import React, { useState } from 'react';

type ChatRoomProps = {
  roomId: string;
};

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { messages, sendMessage } = useWebSocket(`ws://localhost:31577/api/private/rooms/ws`);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {roomId}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
