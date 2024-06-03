import './App.css';
import { useState } from 'react';
import Poll from './Components/Poll';
import Trend from './Components/Trend';
import BarGraph from './Components/BarGraph';

const App = () => {
  const [isPollStationOpen, setPollStationOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleDataUpdate = () => {
    setDataUpdated(prev => !prev);
  };

  return (
    <div className="app-container">
      <Poll open={isPollStationOpen} onClose={() => setPollStationOpen(false)} onFormSubmit={handleDataUpdate} />
      <Trend setPollStationOpen={setPollStationOpen} dataUpdated={dataUpdated} />
      <BarGraph dataUpdated={dataUpdated} />
    </div>
  );
};

export default App;
