import Bell from "./components/bell";
import { BellIcon } from "./components/bell";
import { SensorApp } from "./components/sensor";
import OrientationComponent from "./components/permit"

const App: React.FC = () => {

  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '50px' ,backgroundColor: 'white'}}>
      <h1>除夜の鐘</h1>
        <BellIcon />
        <Bell />
        <SensorApp/>
        <OrientationComponent />
    </div>
    </>
  );
};

export default App;
