import { useState } from 'react';
import styles from './watch.module.css';

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

// メインコンポーネント
export const ChatApp = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const chatOptions = ['こんにちは！', '今の花火良かった！', 'その花火ID何？', 'うんち！'];

  const maxChat = 8;
  const handleSelectMessage = (message: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      return updatedMessages.length > maxChat
        ? updatedMessages.slice(updatedMessages.length - maxChat)
        : updatedMessages;
    });
  };

  return (
    <div className={styles.container}>
      {/* 左上の花火のピクセルアート部分 */}
      <div className={styles.artContainer}>
        <div className={styles.fireworks}></div>
      </div>

      {/* 右上に表示される吹き出し */}
      <ChatBubble messages={messages} />

      {/* 下部のチャット選択肢 */}
      <ChatOptions options={chatOptions} onSelect={handleSelectMessage} />
    </div>
  );
};

export default ChatApp;
