import React from "react";
import RacingBar from "./components/RacingBar";
import BarChart from "./components/BarChart";

import "./styles.css";


export default function App() {
  return (
    <div className="App">
      <BarChart />
      <RacingBar />
    </div>
  );
}
