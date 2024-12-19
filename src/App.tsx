import { BellIcon } from "./components/Bell";
import { SensorApp } from "./components/Sensor";
import OrientationComponent from "./components/Permit";

const App: React.FC = () => {

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'white' }}>
        <OrientationComponent />
        <h1>疑似除夜の鐘</h1>
        <p>＊音量を大きくしてください</p>
        <BellIcon />
        <SensorApp />
      </div>
    </>
  );
};

export default App;
