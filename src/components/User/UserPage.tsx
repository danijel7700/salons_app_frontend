import React, { useContext, useEffect, useState } from "react";
import "./UserPage.css";
import { Dropdown, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Appointment,
  Notification,
  Salon,
  User,
} from "../../entities/entities";
import HomePageNavbar from "../HomePageNavbar";
import {
  faEnvelope,
  faRestroom,
  faMapPin,
  faKey,
  faUserPlus,
  faUser,
  faClock,
  faScissors,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export default function UserPage(props: { flag: number }) {
  const socket = useContext(WebsocketContext);

  const [user, setUser] = useState<User>();
  const [apps, setApps] = useState<Appointment[]>();
  const [salons, setSalons] = useState<Salon[]>();
  const [messages, setMessages] = useState<Notification[]>([]);
  const [messages2, setMessages2] = useState<string[]>();

  const a: string[] = [];

  const navigate = useNavigate();

  const fetchUser = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    axios
      .get(`http://localhost:3000/users/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchApp = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    let appsPom: Appointment[] = [];

    axios
      .get(`http://localhost:3000/appointments/myApp`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setApps(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSalons = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    let appsPom: Appointment[] = [];

    axios
      .get(`http://localhost:3000/users/salons`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setSalons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchMessages = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    axios
      .get(`http://localhost:3000/notifications`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSalonsNames = () => {
    const userId = localStorage.getItem("api_user_id");

    axios
      .get(`http://localhost:3000/users/salonNames/${userId}`)
      .then((res) => {
        const data = { salons: res.data };
        console.log(data);
        socket.emit("joinRoom", data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUser();
    fetchApp();
    fetchSalons();
    fetchMessages();

    socket.on("connect", () => {
      console.log("Connected!");
    });

    fetchSalonsNames();

    socket.on("onMessage", (data) => {
      console.log("onMessage event recived!");
      console.log(data);
      setMessages((prevMessages) => {
        if (prevMessages) {
          return [data, ...prevMessages];
        } else {
          return [data];
        }
      });
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  return (
    <>
      {console.log(`PORUKE - ${messages}`)}
      <HomePageNavbar />
      <div className="userMainDiv">
        <div className="userContentDiv">
          <div className="headerUserDiv">
            <h2>{user?.username}</h2>
            <button className="logoutUserBtn" onClick={handleLogout}>
              Odjavi se
            </button>
          </div>
          {props.flag === 0 && (
            <div className="userInfoDiv">
              <div className="userLeftDiv">
                <h4 className="infoLine userPageInfoLine">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  {user?.firstName} {user?.lastName}
                </h4>
                <h4 className="infoLine userPageInfoLine">
                  <FontAwesomeIcon icon={faPhone} className="icon" />0
                  {user?.phoneNumber.number}
                </h4>
                <h4 className="infoLine userPageInfoLine">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  {user?.email}
                </h4>
                <h4 className="infoLine userPageInfoLine">
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  Moji termini
                </h4>
                <div className="myAppsDiv">
                  {apps?.map((app, index) => (
                    <div key={index} className="userAppDiv">
                      <h4>{app.salonName}</h4>
                      <div className="serviceTimeDiv">
                        <label>{app.serviceName}</label>
                        <label>
                          {app.date} {app.time}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="userRightDiv">
                <h4 className="infoLine userPageInfoLine">
                  <FontAwesomeIcon icon={faScissors} className="icon" />
                  Moji saloni
                </h4>
                <div className="mySalonsDiv">
                  {salons?.map((salon, index) => (
                    <div key={index} className="userSalonDiv">
                      <h3>{salon.name}</h3>
                      <div className="serviceTime2Div">
                        <h5>
                          {salon.location.street} {salon.location.number}
                        </h5>
                        <h5>{salon.type}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {props.flag === 1 && (
            <div className="userInboxDiv">
              {messages?.map((mess, index) => (
                <div key={index} className="notificationDiv">
                  <h5>{mess.salonName}</h5>
                  <label>{mess.content}</label>
                  <label className="messTimeLabel">{mess.time}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
