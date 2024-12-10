import React, { useEffect, useState } from "react";

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
            if( acceleration.y >= 3 ){
                alert('振られてるヨ!')
            }
            window.removeEventListener("devicemotion", handleMotion);
        };
    }, []);

    return (
        <div id="result_acc">
            <h3>加速度センサー</h3>
            <p>X：{acceleration.x.toFixed(2)} (m/s²)</p>
            <p>Y：{acceleration.y.toFixed(2)} (m/s²)</p>
            <p>Z：{acceleration.z.toFixed(2)} (m/s²)</p>
        </div>
    );
};