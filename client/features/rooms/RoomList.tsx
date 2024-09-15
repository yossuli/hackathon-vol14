import useAspidaSWR from '@aspida/swr';
import type { RoomDto, RoomStatusEnum } from 'common/types/room';
import { Loading } from 'components/loading/Loading';
import { useAlert } from 'hooks/useAlert';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import { catchApiErr } from 'utils/catchApiErr';
import { z } from 'zod';
import styles from './roomList.module.css';

// RoomStatusをインポート
// import { RoomStatus } from '@prisma/client';

// 名前のバリデーション用
const nameValidator = z.string().min(1, '名前を入力してください');

export const RoomList = () => {
  const { setAlert } = useAlert();
  const { data: rooms, mutate: mutateRooms } = useAspidaSWR(apiClient.private.rooms, {
    refreshInterval: 5000,
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RoomStatusEnum>('PUBLIC'); // デフォルトでPUBLICを選択
  const [image, setImage] = useState<File>();
  const previewImageUrl = useMemo(() => image && URL.createObjectURL(image), [image]);

  const createRoom = async (e: FormEvent) => {
    e.preventDefault();

    const parsedName = nameValidator.safeParse(name);

    if (!parsedName.success) {
      await setAlert(parsedName.error.issues[0].message);
      return;
    }

    await apiClient.private.rooms
      .$post({
        body: { name: parsedName.data, status }, // statusを追加
      })
      .then((room) => mutateRooms((rooms) => [room, ...(rooms ?? [])]))
      .catch(catchApiErr);

    setName('');
    setImage(undefined);
    if (fileRef.current) fileRef.current.value = '';
  };

  const deleteRoom = async (room: RoomDto) => {
    await apiClient.private.rooms
      ._roomId(room.id)
      .$delete()
      .then(() => mutateRooms((rooms) => rooms?.filter((r) => r.id !== room.id)))
      .catch(catchApiErr);
  };

  useEffect(() => {
    if (!previewImageUrl) return;

    return () => URL.revokeObjectURL(previewImageUrl);
  }, [previewImageUrl]);

  if (!rooms) return <Loading visible />;

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        {previewImageUrl && <img src={previewImageUrl} className={styles.taskImage} />}
        <form className={styles.form} onSubmit={createRoom}>
          <input
            value={name}
            className={styles.textInput}
            type="text"
            placeholder="Room name"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as RoomStatusEnum)} // stringをRoomStatusにキャスト
            className={styles.textInput}
          >
            {/* RoomStatusの選択肢 */}
            <option value={'PUBLIC'}>Public</option>
            <option value={'PRIVATE'}>Private</option>
          </select>
          <div className={styles.controls}>
            <input
              type="file"
              ref={fileRef}
              accept=".png,.jpg,.jpeg,.gif,.webp,.svg"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
            <input className={styles.btn} disabled={name === ''} type="submit" value="ADD" />
          </div>
        </form>
      </div>
      {rooms.map((room) => (
        <div key={room.id} className={styles.card}>
          {room.status && <img src={room.status} alt={room.name} className={styles.taskImage} />}
          <div className={styles.form}>
            <div className={styles.controls}>
              <span>{room.name}</span>
              <input
                type="button"
                value="入室"
                className={styles.btn}
                onClick={() => deleteRoom(room)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
