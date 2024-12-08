import React, { useEffect, useState } from "react";

// ジャイロセンサーコンポーネント
export const Gyroscope: React.FC = () => {
    const [orientation, setOrientation] = useState({
        alpha: 0,
        beta: 0,
        gamma: 0,
    });

    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            setOrientation({
                alpha: event.alpha || 0,
                beta: event.beta || 0,
                gamma: event.gamma || 0,
            });
        };

        window.addEventListener("deviceorientation", handleOrientation);

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    return (
        <div id="result_gyro">
            <h3>ジャイロセンサー</h3>
            <p>alpha：{orientation.alpha.toFixed(2)}°</p>
            <p>beta ：{orientation.beta.toFixed(2)}°</p>
            <p>gamma：{orientation.gamma.toFixed(2)}°</p>
        </div>
    );
};