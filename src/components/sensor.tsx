import React from "react";
import { Accelerometer } from "./Accelerometer";
import { Gyroscope } from "./Gyroscope";

export const SensorApp: React.FC = () => { 
    return (
        <div>
            <h1>センサー情報</h1>
            <Accelerometer />
            <Gyroscope />
        </div>
    );
};
