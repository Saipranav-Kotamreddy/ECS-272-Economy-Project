import logo from './logo.svg';
import './App.css';
import UrbanChart from './components/UrbanChart.js'
import ChoosePeriod from './components/choosePeriod.js'
import IndustryChart from './components/IndustryChart';
import CarbonChart from './components/CarbonChart';
import ImmigrationChart from './components/ImmigrationChart';
import IncomeChart from './components/IncomeChart';
import GenderChart from './components/GenderChart';
import ProductivityChart from './components/ProductivityChart';
import Main from './components/Main';

import React, { useState, useRef, useEffect } from "react";


function App() {

  const [period, setPeriod] = useState('1810');

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
