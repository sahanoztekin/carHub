import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import FilterCar from "./Components/FilterCar/FilterCar";
import AboutAndContact from "./Components/AboutAndContact/AboutAndContact";

const App = () => {
  return (
    <div>
      <Navbar />
      <FilterCar />
      <AboutAndContact />
    </div>
  );
};

export default App;
