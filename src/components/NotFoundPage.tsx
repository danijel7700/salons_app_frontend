import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      {" "}
      <div
        className="bg-image"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="text-center bg-secondary text-light rounded p-4">
            <h1>Stranica nije pronađena</h1>
            <Button variant="primary" onClick={handleButtonClick}>
              Nazad
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
