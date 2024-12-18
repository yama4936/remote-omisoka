import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import Sound from "../assets/audio/bell.mp3";

// 加速度センサーコンポーネント
export const Accelerometer: React.FC = () => {
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [count, setCount] = useState(0);
    const [play] = useSound(Sound, { volume: 0.8 }); // 音声の再生フック

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
        const threshold = 3; // 振動の閾値

        if (Math.abs(acceleration.x) > threshold) {
            setCount((prevCount) => prevCount + 1);
        }
        if (count > 100) {
            play();
            setCount(0);
        }
    }, [acceleration, count, play]);

    // ボタンで音声再生
    const handlePlaySound = () => {
        play();
    };

    return (
        <div>
            <div>
                <h3>振動検知</h3>
                <p>振られた回数: {count} 回</p>
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
