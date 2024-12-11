import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // 接続確立時
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    // メッセージ受信時
    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // エラー発生時
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // 接続終了時
    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      // クリーンアップ処理
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { messages, sendMessage };
};
