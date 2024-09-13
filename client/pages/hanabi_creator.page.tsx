import styles from './hanabi_creator.module.css';

const HanabiCreator = () => {
  return (
    <div className={styles.container}>
      {/* 上部に花火名の枠 */}
      <div className={styles.header}>
        <input className={styles.nameInput} type="text" placeholder="花火の名前" />
      </div>

      <div className={styles.main}>
        {/* 左側：花火玉の素材選択 */}
        <div className={styles.materials}>
          <h3>花火玉の素材</h3>
          <button className={styles.materialButton}>素材 1</button>
          <button className={styles.materialButton}>素材 2</button>
          <button className={styles.materialButton}>素材 3</button>
          <button className={styles.materialButton}>素材 4</button>
        </div>

        {/* 中央：調合用のグリッド */}
        <div className={styles.canvas}>
          <h3>調合枠</h3>
          <div className={styles.grid}></div>
        </div>
      </div>

      {/* 下部に作成ボタン */}
      <div className={styles.createButtonContainer}>
        <button className={styles.createButton}>作成</button>
      </div>
    </div>
  );
};

export default HanabiCreator;
