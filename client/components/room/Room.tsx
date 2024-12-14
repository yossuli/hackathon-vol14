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
const ChatSelect = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (message: string) => void;
}) => {
  return (
    <div className={styles.chatButtonContainer}>
      {options.map((option, index) => (
        <button key={index} className={styles.optionButton} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

const Room = () => {
  const { messages, sendMessage } = useWebSocket(
    `wss://${process.env.NEXT_PUBLIC_WS_URL}/api/private/rooms/ws`,
  );
  const [isChatVisible, setIsChatVisible] = useState(true); //チャットの表示切り替えのstate
  const chatSelect = ['こんにちは！', '今の花火良かった！', '今北', 'スクショした！', 'またね！'];

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
        {/* 吹き出し部分 */}
        {isChatVisible && <ChatBubble messages={messages.slice(-maxChat)} />}
        <div className={styles.artContainer}>
          <img src="/images/arakawa1_x8.png" alt="Logo" className={styles.pixelartImage} />
        </div>

        {/* チャットメニュー */}
        <div className={styles.chatOptions}>
          <ChatSelect options={chatSelect} onSelect={handleSelectMessage} />
          <div className={styles.chatFunctions}>
            <button className={styles.screenshotButton}>スクショ</button>
            <button className={styles.toggleChatDisplayButton} onClick={toggleChatVisibility}>
              {isChatVisible ? 'チャットを非表示' : 'チャットを表示'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
