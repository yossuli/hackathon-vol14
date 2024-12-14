import { useWebSocket } from 'hooks/useWebSocket';
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
  const { messages, sendMessage } = useWebSocket(`wss://localhost:31577/api/private/rooms/ws`);
  const chatOptions = ['こんにちは！', '今の花火良かった！', '今北', 'スクショした！', 'またね！'];

  const maxChat = 8;

  const handleSelectMessage = (message: string) => {
    sendMessage(message); // WebSocket経由でメッセージを送信
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.artContainer}>
          <img src="/images/arakawa1_x8.png" alt="Logo" className={styles.logoImage} />
        </div>

        {/* 吹き出し部分 */}
        <ChatBubble messages={messages.slice(-maxChat)} />

        {/* チャット選択肢 */}
        <ChatOptions options={chatOptions} onSelect={handleSelectMessage} />
      </div>
    </div>
  );
};

export default Room;
