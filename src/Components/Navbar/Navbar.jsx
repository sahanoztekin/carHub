import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="navbar-sign">
        <button className="log-in" onClick={() => openModal("login")}>
          Log-In
        </button>
        <button className="sign-up" onClick={() => openModal("signup")}>
          Sign-Up
        </button>

        {showModal && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {modalType === "login" ? (
                <form>
                  <label>Email:</label>
                  <input type="email" placeholder="Enter your email" />
                  <label>Password:</label>
                  <input type="password" placeholder="Enter your password" />
                  <button className="modal-content-log-sign" type="submit">
                    Log In
                  </button>
                </form>
              ) : (
                <form>
                  <label>Name:</label>
                  <input type="text" placeholder="Enter your name" />
                  <label>Email:</label>
                  <input type="email" placeholder="Enter your email" />
                  <label>Password:</label>
                  <input type="password" placeholder="Enter your password" />
                  <button className="modal-content-log-sign" type="submit">
                    Sign Up
                  </button>
                </form>
              )}
              <button className="modal-content-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
