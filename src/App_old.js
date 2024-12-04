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

import React, { useState, useRef, useEffect } from "react";


function App() {

  const [period, setPeriod] = useState('1810');

  return (
    <div className="App">
      <ChoosePeriod setPeriod={setPeriod}/>
      <UrbanChart period={period}/>
      <IndustryChart startYear={1840} endYear={2000}/>
      <CarbonChart startYear={1840} endYear={1910}/>
      <ImmigrationChart startYear={1790} endYear={2000}/>
      <IncomeChart startYear={1910} endYear={2000}/>
      <GenderChart period={(parseInt(period)+110).toString()}/>
      <ProductivityChart startYear={1950} endYear={2010}/>
    </div>
  );
}

export default App;
