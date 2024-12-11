import GlobalRoom from 'components/room/Room';
import { useRouter } from 'next/router';
import React from 'react';

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;

  if (!roomId || typeof roomId !== 'string') {
    return <div>Loading...</div>;
  }

  // 特定の部屋IDに対する特別な処理
  if (roomId === 'global-room') {
    return (
      <div>
        <h1>Welcome to the Global Room</h1>
        <GlobalRoom roomId={roomId} />
      </div>
    );
  }
  console.log('roomId:', roomId);

  // 通常の部屋処理
  return <GlobalRoom roomId={roomId} />;
};

export default RoomPage;
