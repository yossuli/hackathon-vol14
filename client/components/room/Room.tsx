'use client';

import type { FireFlowerDto } from 'common/types/fireFlower';
import { useWebSocket } from 'hooks/useWebSocket';
import { FireFlower } from 'pages/fireFlower/index.page';
import { useEffect, useState } from 'react';
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
    `ws://${process.env.NEXT_PUBLIC_WS_URL}/api/private/rooms/ws`,
  );
  const [isChatVisible, setIsChatVisible] = useState(true); //チャットの表示切り替えのstate
  const [fireFlowers, setFireFlowers] = useState<
    [
      FireFlowerDto | undefined,
      FireFlowerDto | undefined,
      FireFlowerDto | undefined,
      FireFlowerDto | undefined,
      FireFlowerDto | undefined,
    ]
  >([undefined, undefined, undefined, undefined, undefined]);
  const [count, setCount] = useState(0);
  const chatSelect = ['こんにちは！', '今の花火良かった！', '今北', 'スクショした！', 'またね！'];

  const maxChat = 8;

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleSelectMessage = (message: string) => {
    sendMessage(message); // WebSocket経由でメッセージを送信
  };
  useEffect(() => {
    // console.log(
    //   messages
    //     .map(
    //       (message) =>
    //         JSON.parse(message) as {
    //           type: 'message' | 'fireFlower';
    //           message?: string;
    //           fireFlower?: FireFlowerDto;
    //           x?: number;
    //         },
    //     )
    //     .slice(-1)[0]?.message.fireFlower,
    // );
    const b = messages?.slice(-1)?.[0];
    if (!b) return;
    const a = JSON.parse(b)?.message.fireFlower as FireFlowerDto;
    if (!a) return;
    const nrwFireFlowers = structuredClone(fireFlowers);
    nrwFireFlowers[count] = a;
    setFireFlowers(nrwFireFlowers);
    setCount((count + 1) % 5);
  }, [messages]);

  return (
    <div>
      <div className={styles.container}>
        {/* 吹き出し部分 */}
        {isChatVisible && (
          <ChatBubble
            messages={messages
              .filter(
                (message) =>
                  (
                    JSON.parse(message) as {
                      message: {
                        type: 'message' | 'fireFlower';
                        message?: string;
                        fireFlower?: FireFlowerDto;
                        x?: number;
                      };
                    }
                  ).message.type === 'message',
              )
              .map(
                (message) =>
                  (JSON.parse(message) as { message: { message: string } }).message.message,
              )
              .slice(-maxChat)}
          />
        )}
        <div className={styles.artContainer}>
          <img src="/images/arakawa1_x8.png" alt="Logo" className={styles.pixelartImage} />f
          {fireFlowers.map(
            (fireFlower, i) =>
              fireFlower && (
                <FireFlower
                  key={`${i}-${JSON.stringify(fireFlower)}`}
                  shape={fireFlower?.structure}
                  x={i}
                />
              ),
          )}
        </div>

        {/* チャットメニュー */}
        <div className={styles.chatOptions}>
          <ChatSelect options={chatSelect} onSelect={handleSelectMessage} />
          <div className={styles.chatFunctions}>
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
