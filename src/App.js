import logo from './logo.svg';
import './App.css';
import UrbanChart from './components/UrbanChart.js'
import ChoosePeriod from './components/choosePeriod.js'
import IndustryChart from './components/IndustryChart';
import CarbonChart from './components/CarbonChart';
import ImmigrationChart from './components/ImmigrationChart';

import React, { useState, useRef, useEffect } from "react";


function App() {

  const [period, setPeriod] = useState('1810');

  return (
    <div className="App">
      <ChoosePeriod setPeriod={setPeriod}/>
      <UrbanChart period={period}/>
      <IndustryChart startYear={1840} endYear={2000}/>
      <CarbonChart startYear={1840} endYear={1910}/>
      <ImmigrationChart startYear={1790} endYear={1920}/>
    </div>
  );
}

export default App;
