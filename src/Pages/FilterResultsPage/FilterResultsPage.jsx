import React, { useState, useRef } from "react";
import "./FilterResultsPage.css";
import Cars from "./cars.json";
import NoData from "../../Components/NoData/NoData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Lamborghini from "../../assets/img/lamborghini.svg";
import Ferrari from "../../assets/img/ferrari.svg";
import Porsche from "../../assets/img/porsche.svg";
import Bugatti from "../../assets/img/bugatti.svg";
import wFerrari from "../../assets/img/whiteferrari.svg";
import Mercedes from "../../assets/img/mercedes.svg";
import bFerrari from "../../assets/img/bferrari.svg";

const carImages = {
  LAMBORGHINI: Lamborghini,
  FERRARI: Ferrari,
  PORSCHE: Porsche,
  BUGATTI: Bugatti,
  WFERRARI: wFerrari,
  MERCEDES: Mercedes,
  BFERRARI: bFerrari,
};

const FilterResultsPage = () => {
  const [currentCar, setCurrentCar] = useState(0);
  const visibleCount = 10;
  const [offset, setOffset] = useState(0);
  const carPointRef = useRef(null);
  const carSelectRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllSearchParams = () => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const {
    startDate,
    endDate,
    minPrice,
    maxPrice,
    cityName,
    colorName,
    collisionDamage,
    faultPlus,
  } = getAllSearchParams();

  const filterCars = Cars.cars
    .filter((car) => car.color.toLowerCase().includes(colorName.toLowerCase()))
    .filter((car) => car.price >= minPrice && car.price <= maxPrice);

  // const handleSubmit = () => {
  //   navigate("/payments");
  // };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCarChange = (index) => {
    setCurrentCar(index);
    if (index >= offset + visibleCount) {
      setOffset(index - visibleCount + 1);
    } else if (index < offset) {
      setOffset(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentCar(swiper.realIndex);
  };

  if (filterCars.length === 0) {
    return <NoData />;
  }

  const handlePay = () => {
    const userInfoStringify = localStorage.getItem("loggedInUser");
    const userCar = filterCars[currentCar];
    const userInfo = JSON.parse(userInfoStringify);

    const paymentInfo = {
      userId: userInfo.id,
      carModel: userCar.name,
      carYear: userCar.year,
      startDate: startDate,
      endDate: endDate,
    };

    const rentedCars = JSON.parse(localStorage.getItem("rentedCars") ?? "[]");
    localStorage.setItem(
      "rentedCars",
      JSON.stringify([...rentedCars, paymentInfo])
    );
    alert("Payment successful for " + userCar.name);
    navigate("/");
  };

  return (
    <div className="filter-results-container">
      <div className="center-circle"></div>
      <div className="filter-results-header">
        <span className="filter-results-circle"></span>
        <h1>Filter Cars</h1>
        <span className="filter-results-circle"></span>
      </div>
      <div className="filter-results-car">
        {/* <img
          src={carImages[filterCars[currentCar].img] || ""}
          alt={`${filterCars[currentCar].name}-CAR`}
        />
        <h1>{filterCars[currentCar].name}</h1> */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={handleSlideChange}
        >
          {filterCars.map((car, index) => (
            <SwiperSlide key={index}>
              <img src={carImages[car.img] || ""} alt={`${car.name}-CAR`} />
              <h1>{car.name}</h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="filter-results-car-detail">
        <div className="filter-results-car-detail-content">
          <div className="filter-results-car-detail-content-detail">
            <p>{filterCars[currentCar].detail}</p>
          </div>

          <div className="filter-results-car-detail-content-price">
            <h1>${filterCars[currentCar].price}</h1>
            <a onClick={toggleModal}>SELECT</a>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div
              className="payments-pay-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={toggleModal}>
                X
              </button>
              <div className="card-number">
                <p>Card Number</p>
                <input type="tel" name="credit-number" />
              </div>
              <div className="card-holder">
                <p>Card Holder</p>
                <input type="text" name="cardholder" />
              </div>
              <div className="valid-and-cvv">
                <div className="valid">
                  <p>Valid (MM/YY)</p>
                  <input
                    name="credit-expires"
                    type="tel"
                    pattern="\d*"
                    maxLength="7"
                  />
                </div>
                <div className="card-cvv">
                  <p>Cvv</p>
                  <input
                    type="tel"
                    pattern="\d*"
                    maxLength="4"
                    name="credit-cvc"
                  />
                </div>
              </div>
              <div className="pay-submit">
                <a href="#" onClick={handlePay}>
                  PAY
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="filter-results-car-detail-modal">
          <p>{filterCars[currentCar].year}</p>
          <span></span>
          <p>{filterCars[currentCar].type}</p>
        </div>
      </div>
      {/* <div
        className="filter-results-car-point"
        ref={carPointRef}
        onMouseDown={(e) => handleMouseDown(e, carPointRef)}
      >
        {filterCars.slice(offset, offset + visibleCount).map((_, index) => (
          <span
            key={index}
            className={index + offset === currentCar ? "active" : ""}
            onClick={() => handleCarChange(index + offset)}
          ></span>
        ))}
      </div> */}
      <div className="filter-result-car-selective" ref={carSelectRef}>
        <div className="line-container">
          <div
            className="line"
            style={{ width: "25px", left: `${25 * (currentCar - offset)}px` }}
          ></div>
        </div>
        {filterCars.slice(offset, offset + visibleCount).map((_, index) => (
          <a key={index} onClick={() => handleCarChange(index + offset)}>
            {index + offset + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FilterResultsPage;
