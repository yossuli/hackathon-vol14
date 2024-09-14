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
  const [showFireworks, setShowFireworks] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

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

  // 花火を発射する関数
  const handleFireworkLaunch = () => {
    setShowFireworks(true);
    setButtonDisabled(true);

    // 3秒後に花火を消す
    setTimeout(() => {
      setShowFireworks(false);
      setButtonDisabled(false);
    }, 3000);
  };

  // 花火のスタイルを動的に指定（左の枠の真ん中）
  const fireworksStyle: React.CSSProperties = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    backgroundColor: 'transparent',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div className={styles.container}>
      {/* 左上の花火のピクセルアート部分 */}
      <div className={styles.artContainer}>
        {showFireworks && <div className={styles.fireworks} style={fireworksStyle}></div>}

        {/* 花火発射ボタン */}
        <button
          className={styles.fireworkButton}
          onClick={handleFireworkLaunch}
          disabled={buttonDisabled}
        >
          花火を発射
        </button>
      </div>

      {/* 右上に表示される吹き出し */}
      <ChatBubble messages={messages} />

      {/* 下部のチャット選択肢 */}
      <ChatOptions options={chatOptions} onSelect={handleSelectMessage} />
    </div>
  );
};

export default ChatApp;
