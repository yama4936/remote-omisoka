import React, { useEffect, useState } from "react";
import { keyframes } from "@mui/system";
import { makeStyles } from "@mui/styles";

// Keyframes アニメーションの定義
export const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// makeStylesでカスタムスタイルを作成
const useStyles = makeStyles({
  gaugeContainer: {
    width: "center",
    height: "20px",
    backgroundColor: "#ccc",
    borderRadius: "15px",
    overflow: "hidden",
    margin: "20px 0",
    position: "relative",
  },
  gaugeProgress: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.5s ease",
  },
});

// 音声ファイルのパス
const audioUrl = "../assets/audio/bell.mp3"; // 音声ファイルのパスを指定

// 加速度センサーコンポーネント
export const Accelerometer: React.FC = () => {
  const classes = useStyles();
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [count, setCount] = useState(0);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  let countConfig = 500000;
  const audio = new Audio(audioUrl); // Audioオブジェクトを作成

  // 音声のロード処理
  const loadAudio = async () => {
    return new Promise<void>((resolve, reject) => {
      const checkReadyState = () => {
        if (audio.readyState >= 4) { // readyState 4: HAVE_ENOUGH_DATA
          setIsAudioLoaded(true);
          resolve();
        }
      };

      // ポーリングで状態を監視
      const interval = setInterval(() => {
        checkReadyState();
      }, 100);

      // イベントリスナー
      audio.addEventListener("canplaythrough", () => {
        clearInterval(interval);
        setIsAudioLoaded(true);
        resolve();
      });

      audio.addEventListener("error", (e) => {
        clearInterval(interval);
        console.error("Error loading audio:", e);
        reject(e);
      });

      // 音声のロードを開始
      audio.load();
    });
  };

  useEffect(() => {
    loadAudio();
  }, []);

  useEffect(() => {
    // モーションイベントのハンドラ
    const handleMotion = (event: DeviceMotionEvent) => {
      const { x, y, z } = event.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
      setAcceleration({
        x: x || 0,
        y: y || 0,
        z: z || 0,
      });
    };

    // イベントリスナーの追加
    window.addEventListener("devicemotion", handleMotion);

    return () => {
      // イベントリスナーの削除
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  useEffect(() => {
    // 振動の判定ロジック
    const threshold = 10; // 振動の閾値

    if (Math.abs(acceleration.x) > threshold) {
      setCount((prevCount) => Math.min(prevCount + 1, countConfig));
    }
    if (count >= countConfig && isAudioLoaded) {
      audio.play().catch((err) => console.error("Audio playback failed:", err));
      setCount(0);
    }
  }, [acceleration, count, isAudioLoaded, audio]);

  // ゲージの進捗率を計算
  const progress = (count / countConfig) * 100; // 進捗率を0〜100%で計算

  // 手動で音声を再生
  const handlePlaySound = () => {
    if (isAudioLoaded) {
      audio.play().catch((err) => console.error("Audio playback failed:", err));
    } else {
      console.log("Audio not loaded yet.");
    }
  };

  return (
    <div>
      <div>
        <h3>振動検知</h3>
        <p>振られた回数: {count} 回</p>
        <div className={classes.gaugeContainer}>
          <div
            className={classes.gaugeProgress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div id="result_acc">
        <h3>加速度センサー</h3>
        <p>X：{acceleration.x.toFixed(2)} (m/s²)</p>
        <p>Y：{acceleration.y.toFixed(2)} (m/s²)</p>
        <p>Z：{acceleration.z.toFixed(2)} (m/s²)</p>
      </div>
      <div>
        <button onClick={handlePlaySound}>音声を再生する</button>
      </div>
    </div>
  );
};
