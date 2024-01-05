import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav, Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Nav variant="tabs">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Container>
  );
}

export default App;
