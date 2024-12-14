import React, { useEffect, useState } from "react";
import { Audio } from "./Audio";

// 加速度センサーコンポーネント
export const Accelerometer: React.FC = () => {
    const [acceleration, setAcceleration] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    useEffect(() => {
        const handleMotion = (event: DeviceMotionEvent) => {
            const { x, y, z } = event.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
            setAcceleration({
                x: x || 0,
                y: y || 0,
                z: z || 0,
            });
        };

        window.addEventListener("devicemotion", handleMotion);

        return () => {
            window.removeEventListener("devicemotion", handleMotion);
        };
    }, []);

    const ShakeDetector: React.FC<{ acceleration: { x: number } }> = ({ acceleration }) => {
        let count:number = 0;
        const [lastUpdate, setLastUpdate] = useState(Date.now()); // 最後に更新された時刻
        const [firstUpdate, setFirstUpdate] = useState(0); // 最初に振られた時刻

        useEffect(() => {
            const now = Date.now();
            setLastUpdate(now);

            // 最初の振動時刻を記録
            if (acceleration.x >= 3) {
                if (firstUpdate === null) {
                    setFirstUpdate(now);
                }
                // 振られた回数を更新
                count++;
            }
        }, [acceleration.x]);

        useEffect(() => {
            // 振られた回数が10回を超えたら Audio を再生
            if (count > 10) {
                console.log("Shake count exceeded 10. Playing audio...");
                <Audio />
            }
        }, [count]);

        // 経過時間を計算
        const elapsedTime = firstUpdate !== null ? lastUpdate - firstUpdate : 0;

        return (
            <div id="shake-message">
                <p>{count}回振られた</p>
                <p>経過時間: {elapsedTime}ms</p>
            </div>
        );
    };


    return (
        <div >
            <ShakeDetector acceleration={acceleration} />

            <div id="result_acc">
                <h3>加速度センサー</h3>
                <p>X：{acceleration.x.toFixed(2)} (m/s²)</p>
                <p>Y：{acceleration.y.toFixed(2)} (m/s²)</p>
                <p>Z：{acceleration.z.toFixed(2)} (m/s²)</p>
            </div>
        </div>
    );
};