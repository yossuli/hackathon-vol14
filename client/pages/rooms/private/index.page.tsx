import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import Header from '../../../components/header/Header';
import styles from './index.module.css';

const PenetrateRoom = () => {
  const [showRoomNameDialog, setShowRoomNameDialog] = useState<boolean>(true);
  const [roomName, setRoomName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  // const handleNameSubmit = () => {
  //   if (roomName.trim() && password.trim()) {
  //     setShowRoomNameDialog(false);
  //   }
  // };

  /* eslint-disable */
  const roomNameSave = async () => {
    console.log(roomId)
    if (roomName.trim() && password.trim()) {
      try {
        const res = await apiClient.private.rooms.post({
          body: {
            name: roomName,
            password,
            status: 'PRIVATE',
          },
        });
        setShowRoomNameDialog(false);
        console.log('API Response', res);
        //bodyをセットする場合もあるよね～
        setRoomId(res.body.id);
        router.push(`/rooms/private/${res.body.id}`);
      } catch (error) {
        console.error('Error saving Room', error);
        if (error instanceof Error) {
          alert(`合言葉の条件が満たされていません: ${error.message}`);
          return;
        } else {
          alert('An unknown error occurred while saving.');
        }
      }
    }
  };

  // const inPrivate = async () => {
  //   try {
  //     const room = await apiClient.private.rooms.post({
  //       body: {
  //         name: roomName,
  //         password,
  //         status: 'PRIVATE',
  //       },
  //     });
  //     const res2 = await apiClient.private.rooms.friends.post({
  //       body: {
  //         id: room.body.id,
  //         password,
  //       },
  //     });
  //     setShowRoomNameDialog(false);
  //     console.log('API Response', res2);
  //   } catch (error) {
  //     console.error('Error in PRIVATE room', error);
  //     if (error instanceof Error) {
  //       alert(`合言葉の条件が満たされていません: ${error.message}`);
  //       return;
  //     } else {
  //       alert('An unknown error occurred while saving.');
  //     }
  //   }
  // };

  return (
    <div>
      <Header />
      {showRoomNameDialog && (
        <div className={styles.nameDialog}>
          <h2>部屋名と合言葉を入力してください</h2>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="部屋名"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="合言葉(4文字以上)"
          />
          <p className={styles.passwordnote}>
            ※合言葉は半角英数字を1文字以上含めてください
            <br />
            ※合言葉に記号は使用できません
            <br />
            ※既に使用されている合言葉は使用できません
          </p>

          <button
            onClick={() => {
              // handleNameSubmit()
              roomNameSave();
              // inPrivate();
            }}
          >
            決定
          </button>
        </div>
      )}
    </div>
  );
};

export default PenetrateRoom;
