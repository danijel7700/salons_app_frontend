import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePageNavbar.css";
import { faUser, faInbox, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserPage from "./User/UserPage";

export default function HomePageNavbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("api_token_user") ||
      localStorage.getItem("api_token_salon")
    ) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Container>
        <Nav variant="tabs" className="navBar">
          <div className="leftDiv">
            <Nav.Link href="/">
              <FontAwesomeIcon
                icon={faHouse}
                className="icon"
              ></FontAwesomeIcon>
            </Nav.Link>
          </div>
          <div>
            {!isLoggedIn ? (
              <Nav.Link href="/login" className="loginLabel">
                Prijavi se
              </Nav.Link>
            ) : (
              <div className="loginUserElDiv">
                <Nav.Link href="/user/inbox">
                  <FontAwesomeIcon
                    icon={faInbox}
                    className="icon"
                  ></FontAwesomeIcon>
                </Nav.Link>
                <Nav.Link href="/user">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="icon"
                  ></FontAwesomeIcon>
                </Nav.Link>
              </div>
            )}
          </div>
        </Nav>
      </Container>
    </>
  );
}
