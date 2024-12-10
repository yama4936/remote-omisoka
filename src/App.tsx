import Bell from "./components/bell";
import { BellIcon } from "./components/bell";
import { SensorApp } from "./components/sensor";
import OrientationComponent from "./components/permit"

const App: React.FC = () => {

  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '50px' ,backgroundColor: 'white'}}>
    <OrientationComponent />
      <h1>疑似除夜の鐘</h1>
        <BellIcon />
        <Bell />
        <SensorApp/>
    </div>
    </>
  );
};

export default App;
