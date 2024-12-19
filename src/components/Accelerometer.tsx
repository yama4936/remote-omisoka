import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { keyframes } from "@mui/system";
import { makeStyles } from "@mui/styles";
import audioUrl from "../assets/audio/bell.mp3";

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

// 加速度センサーコンポーネント
export const Accelerometer: React.FC = () => {
    const classes = useStyles();
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [count, setCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [play] = useSound(audioUrl, {
        volume: 0.8,
        onload: () => {
            console.log("Sound loaded");
            setIsLoaded(true);
        },
        onerror: (error: Error) => {
            console.error("Error loading sound:", error.message);
        },
    });
    const countConfig = 500000;

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
        const threshold = 10;

        if (Math.abs(acceleration.x) > threshold) {
            setCount((prevCount) => Math.min(prevCount + 1, countConfig));
        }
        if (count >= countConfig) {
            if (isLoaded) {
                play();
            } else {
                console.log("Sound not loaded yet.");
            }
            setCount(0);
        }
    }, [acceleration, count, play, isLoaded]);

    const progress = (count / countConfig) * 100;

    return (
        <div className={classes.gaugeContainer}>
            <div
                className={classes.gaugeProgress}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
/*
    <div>
      <h3>振動検知</h3>
      <p>振られた回数: {count} 回</p>
      <div className={classes.gaugeContainer}>
        <div
          className={classes.gaugeProgress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button onClick={() => (isLoaded ? play() : console.log("Sound not loaded yet"))}>
        音声を再生する
      </button>
    </div>
*/