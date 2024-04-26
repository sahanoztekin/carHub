import React from "react";
import "./NoData.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const NoData = () => {
  const navigate = useNavigate();

  const returnHomePage = () => {
    navigate("/");
  };

  return (
    <div className="nodata-container">
      <div className="nodata-modal">
        <h1>No vehicle was found according to the selected features.</h1>
        <button onClick={returnHomePage}>Return</button>
      </div>
    </div>
  );
};

export default NoData;
