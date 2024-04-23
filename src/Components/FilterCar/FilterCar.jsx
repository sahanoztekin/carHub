import React, { useState } from "react";
import "./FilterCar.css";
import DatePicker from "react-datepicker";
import { Range, getTrackBackground } from "react-range";
import "react-datepicker/dist/react-datepicker.css";
import Taycan from "../../assets/img/taycan.svg";

const FilterCar = () => {
  const initialStartDate = new Date();
  const initialValues = [10, 90];
  const initialCity = "";
  const initialInsuranceOptions = {
    collisionDamage: false,
    faultPlus: false,
  };

  const [startDate, setStartDate] = useState(initialStartDate);
  const [values, setValues] = useState(initialValues);
  const [selectedColor, setSelectedColor] = useState("");
  const [showAllColors, setShowAllColors] = useState(false);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [insuranceOptions, setInsuranceOptions] = useState(
    initialInsuranceOptions
  );

  const colors = [
    { name: "Silver", code: "#C0C0C0" },
    { name: "White", code: "#FFFFFF" },
    { name: "Black", code: "#000000" },
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Brown", code: "#A52A2A" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Navy", code: "#000080" },
  ];

  const handleReset = () => {
    setStartDate(initialStartDate);
    setValues(initialValues);
    setSelectedColor("");
    setShowAllColors(false);
    setSelectedCity(initialCity);
    setInsuranceOptions(initialInsuranceOptions);
  };

  const handleSubmit = () => {
    const searchParameters = {
      startDate,
      values,
      selectedCity,
      selectedColor,
      insuranceOptions,
    };
    console.log("search parameters:", searchParameters);
  };

  return (
    <div className="filtercar-container">
      <img src={Taycan} alt="carimage" />
      <div className="filtercar-filter">
        <div className="filtercar-nav">
          <h1>Filters</h1>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="filtercar-input-content">
          <p>pick-up</p>
          <p>location</p>
          <p>return</p>
        </div>

        <div className="filtercar-input">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Saat:"
            dateFormat="dd/MM/yyyy h:mm aa"
            showTimeInput
          />
          <select
            class="proje-select"
            name="project"
            id="project-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            selected=""
          >
            <option value="">⚲</option>
            <option value="istanbul">İstanbul</option>
            <option value="bursa">Bursa</option>
          </select>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Saat:"
            dateFormat="dd/MM/yyyy h:mm aa"
            showTimeInput
          />
        </div>

        <div className="filtercar-range">
          <div className="filtercar-range-header">
            <h1>Price</h1>
          </div>
          <div className="filtercar-range-check">
            <Range
              step={1}
              min={0}
              max={100}
              values={values}
              onChange={(values) => setValues(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "2px",
                    width: "100%",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    background: getTrackBackground({
                      values: values,
                      colors: ["#fff", "#007bff", "#fff"],
                      min: 0,
                      max: 100,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "13px",
                    width: "13px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    border: "2px solid #007bff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="range-value">${values[index]}</div>
                </div>
              )}
            />
          </div>
        </div>
        <div className="filtercar-color">
          <div className="filtercar-color-header">
            <h1>Color</h1>
          </div>
        </div>
        <div className="color-selection-grid">
          {colors.map((color, index) => (
            <div
              key={color.name}
              className={`color-option ${
                selectedColor === color.name ? "selected" : ""
              } ${index >= 6 && !showAllColors ? "hidden" : ""}`}
              onClick={() => setSelectedColor(color.name)}
            >
              <div
                className="color-display"
                style={{ backgroundColor: color.code }}
              ></div>
              <span className="color-name">{color.name}</span>
            </div>
          ))}
        </div>
        {!showAllColors && (
          <div className="all-colors" onClick={() => setShowAllColors(true)}>
            <span>All Colors</span>
          </div>
        )}
        <div className="underline"></div>
        <div className="filtercar-insurance">
          <div className="filtercar-insurance-header">
            <h1>Car Insurance</h1>
          </div>
          <div className="filtercar-insurance-checkbox">
            <input
              type="checkbox"
              checked={insuranceOptions.collisionDamage}
              onChange={() =>
                setInsuranceOptions({
                  ...insuranceOptions,
                  collisionDamage: !insuranceOptions.collisionDamage,
                })
              }
            />{" "}
            <span>Waiver of collision damage</span>
            <input
              type="checkbox"
              checked={insuranceOptions.faultPlus}
              onChange={() =>
                setInsuranceOptions({
                  ...insuranceOptions,
                  faultPlus: !insuranceOptions.faultPlus,
                })
              }
            />{" "}
            <span>Fault Plus</span>
          </div>
        </div>
        <div className="filtercar-search">
          <a onClick={handleSubmit} href="#">
            SEARCH
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilterCar;
