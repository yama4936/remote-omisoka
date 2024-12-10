import useSound from 'use-sound';
import Sound from "../assets/audio/bell.mp3";

export const Audio: React.FC = () => {
  const [play, { stop, pause }] = useSound(Sound);

  return (
    <>
      <button onClick={() => play()}>音を鳴らす</button>
      <button onClick={() => stop()}>停止</button>
      <button onClick={() => pause()}>ポーズ</button>
    </>
  );
};
