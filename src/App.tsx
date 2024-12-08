import { useEffect, useState } from "react";
import Bell from "./components/bell";
import { BellIcon } from "./components/bell";
import { SensorApp } from "./components/sensor";

const App: React.FC = () => {

  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '50px' ,backgroundColor: 'red'}}>
      <h1>除夜の鐘</h1>
        <BellIcon />
        <Bell />
        <SensorApp/>
    </div>
    </>
  );
};

export default App;
