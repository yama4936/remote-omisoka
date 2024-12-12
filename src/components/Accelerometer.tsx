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
        const [count, setCount] = useState(0);
        const [message, setMessage] = useState<string | null>(null);
        const [lastUpdate, setLastUpdate] = useState(Date.now());

        useEffect(() => {
            const now = Date.now();
            if (now - lastUpdate > 500) { // 更新間隔を500msに制限
                if (acceleration.x >= 3) {
                    setCount(prevCount => prevCount + 1);
                }
                setLastUpdate(now);
            }
        }, [acceleration.x, lastUpdate]);

        useEffect(() => {
            if (count > 0) {
                setMessage(`${count}回振られた`);
            }
            if (count >= 10) {
                setMessage("10回振られたよ!!!!");
                <Audio />;
            }
        }, [count]);

        return (
            <div>
                <div id="shake-message">
                    {message && <p>{message}</p>}
                </div>
                <Audio />
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