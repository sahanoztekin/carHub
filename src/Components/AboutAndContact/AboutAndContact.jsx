import React, { useState } from "react";
import "./AboutAndContact.css";

const AboutAndContact = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="aboutandcontact-container">
      <button
        className="contact-and-about-button"
        onClick={() => openModal("rent a car")}
      >
        about
      </button>
      <span className="aboutandcontent-line"></span>
      <button
        className="contact-and-about-button"
        onClick={() => openModal("5555 01 5555")}
      >
        contact
      </button>

      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{modalContent}</p>
            <button className="modal-content-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutAndContact;
