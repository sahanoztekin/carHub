import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [modalType, setModalType] = useState("");
  const [rentedCars, setRentedCars] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setEmail(loggedInUser.email);
      setName(loggedInUser.name);
      setRentedCars(loggedInUser.rentedCars || []);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setShowLogoutConfirm(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("An account with this email already exists!");
      return;
    }

    const userData = { email, password, name, rentedCars: [] };
    localStorage.setItem(email, JSON.stringify(userData));
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
    setShowModal(false);
    alert("User registered successfully!");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem(email));
    if (userData && userData.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      setUser(userData);
      setShowModal(false);
      alert("Logged in successfully!");
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, email, name, password };
    localStorage.setItem(user.email, JSON.stringify(updatedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowModal(false);
    alert("Information updated successfully!");
  };

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
        {user ? (
          <>
            <span
              className="modal-content-username"
              onClick={() => openModal("userInfo")}
            >
              {user.name}
            </span>
            <button
              className="modal-content-logout"
              onClick={() => setShowLogoutConfirm(true)}
            >
              X
            </button>
          </>
        ) : (
          <>
            <button className="log-in" onClick={() => openModal("login")}>
              Log-In
            </button>
            <button className="sign-up" onClick={() => openModal("signup")}>
              Sign-Up
            </button>
          </>
        )}
        {showModal && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {modalType === "login" ? (
                <form onSubmit={handleLogin}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button className="modal-content-log-sign" type="submit">
                    Log In
                  </button>
                </form>
              ) : modalType === "signup" ? (
                <form onSubmit={handleSignUp}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <button className="modal-content-log-sign" type="submit">
                    Sign Up
                  </button>
                </form>
              ) : modalType === "userInfo" ? (
                <>
                  <p>Email: {user.email}</p>
                  <p>Name: {user.name}</p>
                  <button
                    className="modal-content-editbutton"
                    onClick={() => openModal("edit")}
                  >
                    Edit Info
                  </button>
                  {rentedCars.length > 0 && (
                    <ul>
                      {rentedCars.map((car) => (
                        <li key={car}>{car}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                modalType === "edit" && (
                  <form onSubmit={handleEdit}>
                    <label>Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <label>Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                    <label>New Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button className="modal-content-savebutton" type="submit">
                      Save Changes
                    </button>
                  </form>
                )
              )}
              <button className="modal-content-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
        {showLogoutConfirm && (
          <div className="modal" onClick={() => setShowLogoutConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <p>Do you want to log out?</p>
              <div className="modal-content-logout-button">
                <button
                  className="modal-content-logout-button-yes"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="modal-content-logout-button-no"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
