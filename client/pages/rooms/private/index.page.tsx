import { useState } from 'react';
import Header from '../../../components/header/Header';
import Room from '../../../components/room/Room';
import styles from './index.module.css';

const PenetrateRoom = () => {
  const [showRoomNameDialog, setShowRoomNameDialog] = useState<boolean>(true);
  const [roomName, setRoomName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleNameSubmit = () => {
    if (roomName.trim() && password.trim()) {
      setShowRoomNameDialog(false);
    }
  };
  return (
    <div>
      <Header />
      {showRoomNameDialog && (
        <div className={styles.nameDialog}>
          <h2>合言葉とパスワードを入力してください</h2>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="合言葉"
            />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
          />
          <button onClick={handleNameSubmit}>決定</button>
        </div>
      )}
      <Room />
    </div>
  );
};

export default PenetrateRoom;
