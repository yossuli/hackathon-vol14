import Header from './Header';
import Room from './Room';

// メインコンポーネント
export const ChatApp = () => {
  // // 花火を発射する関数
  // const handleFireworkLaunch = () => {
  //   setShowFireworks(true);
  //   setButtonDisabled(true);

  //   // 3秒後に花火を消す
  //   setTimeout(() => {
  //     setShowFireworks(false);
  //     setButtonDisabled(false);
  //   }, 3000);
  // };

  // 花火のスタイルを動的に指定（左の枠の真ん中）
  // const fireworksStyle: React.CSSProperties = {
  //   position: 'absolute',
  //   width: '300px',
  //   height: '300px',
  //   backgroundColor: 'transparent',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  // };

  return (
    <div>
      <Header />
      <Room />
    </div>
  );
};

export default ChatApp;
