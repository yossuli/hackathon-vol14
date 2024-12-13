'use client';

import { useWebSocket } from 'hooks/useWebSocket';
import { useState } from 'react';
import styles from './Rooms.module.css';

// 吹き出しコンポーネント
const ChatBubble = ({ messages }: { messages: string[] }) => {
  return (
    <div className={styles.chatBubbleContainer}>
      {messages.map((message, index) => (
        <div key={index} className={styles.chatBubble}>
          {message}
        </div>
      ))}
    </div>
  );
};

// チャット選択肢コンポーネント
const ChatOptions = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (message: string) => void;
}) => {
  return (
    <div className={styles.chatOptions}>
      {options.map((option, index) => (
        <button key={index} className={styles.optionButton} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

const Room = () => {
  const { messages, sendMessage } = useWebSocket(`ws://localhost:31577/api/private/rooms/ws`);
  const [isChatVisible, setIsChatVisible] = useState(true); //チャットの表示切り替えのstate
  const chatOptions = ['こんにちは！', '今の花火良かった！', '今北', 'スクショした！', 'またね！'];

  const maxChat = 8;

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleSelectMessage = (message: string) => {
    sendMessage(message); // WebSocket経由でメッセージを送信
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.artContainer}>
          {/* 吹き出し部分 */}
          {isChatVisible && <ChatBubble messages={messages.slice(-maxChat)} />}
          <img src="/images/arakawa1_x8.png" alt="Logo" className={styles.pixelartImage} />
          <div className={styles.toggleChatDisplayContainer}>
            <button className={styles.toggleChatDisplayButton} onClick={toggleChatVisibility}>
              {isChatVisible ? 'チャットを非表示' : 'チャットを表示'}
            </button>
          </div>
        </div>

        {/* チャット選択肢 */}
        <ChatOptions options={chatOptions} onSelect={handleSelectMessage} />
      </div>
    </div>
  );
};

export default Room;
