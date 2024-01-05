import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./SalonCard.css";
import { Button, Card, CardTitle, Nav, NavLink } from "react-bootstrap";
import CurrentSalonCard from "./CurrentSalonCard";

Modal.setAppElement(document.body);

export default function SalonCard({ salon }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = async () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card mb-3 salon-card salon" onClick={openModal}>
        <div className="card-body">
          <h1 className="card-title">{salon.name}</h1>
          <p className="card-text salonLocationLabel">
            {salon.location.street} {salon.location.number}, {salon.city}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text salonLocationLabel">{salon.type}</p>
            <span className="badge bg-primary">
              {salon.markInfo.mark.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <CurrentSalonCard id={salon._id} />
      </Modal>
    </>
  );
}
