import React, { useEffect, useState } from "react";
import "./SalonCard.css";
import { Alert, Button, Card, CardTitle, Nav, NavLink } from "react-bootstrap";
import {
  faEnvelope,
  faRestroom,
  faMapPin,
  faClock,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ServiceCard from "./ServiceCard";
import PostCard from "./PostCard";
import { error } from "console";
import AppointmentCard from "./AppointmentCard";
import { Salon } from "../../entities/entities";

const days = [
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
  "Nedelja",
];

export default function CurrentSalonCard(id: any) {
  const [salon, setSalon] = useState<Salon>();
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [navInfo, setNavInfo] = useState(true);
  const [navPosts, setNavPosts] = useState(false);
  const [navApp, setNavApp] = useState(false);
  const [navServices, setNavServices] = useState(false);
  const [newMark, setNewMark] = useState(0);
  const [giveMark, setGiveMark] = useState(false);
  const [refreshSalon, setRefreshSalon] = useState(false);
  const [followSalon, setFollowSalon] = useState(false);

  const fetchUserFollowSalon = (id: string) => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    const salonId = salon?._id ? salon?._id : id;

    axios
      .get(`http://localhost:3000/users/followSalon/${salonId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setFollowSalon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSalon = () => {
    axios.get(`http://localhost:3000/salons/${id.id}`).then((res) => {
      setSalon(res.data);
      fetchUserFollowSalon(res.data._id);
    });
  };

  const handleNavInfo = () => {
    setNavInfo(true);
    setNavPosts(false);
    setNavApp(false);
    setNavServices(false);
  };

  const handleNavPosts = () => {
    setNavInfo(false);
    setNavPosts(true);
    setNavApp(false);
    setNavServices(false);
  };

  const handleNavApp = () => {
    setNavInfo(false);
    setNavPosts(false);
    setNavApp(true);
    setNavServices(false);
  };

  const handleNavServices = () => {
    setNavInfo(false);
    setNavPosts(false);
    setNavApp(false);
    setNavServices(true);
  };

  const handleMarkClick = (mark: number) => {
    setNewMark(mark);
  };

  const handleGiveMark = () => {
    setNewMark(0);
    setGiveMark(!giveMark);
  };

  const handleRateSalon = () => {
    const userToken = localStorage.getItem("api_token_user");
    const data = {
      salonId: salon?._id,
      mark: newMark,
    };

    const token = "Bearer " + userToken;

    const headers = {
      Authorization: token,
    };

    axios
      .post("http://localhost:3000/users/rate-salon", data, { headers })
      .then((response) => {
        setGiveMark(false);
        setRefreshSalon(!refreshSalon);
        return alert(response.data);
      })
      .catch((error) => {
        return alert(error.response.data.message);
      });
  };

  const followHandler = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    const headers = {
      Authorization: token,
    };

    axios
      .post(
        `http://localhost:3000/users/subscribe/${salon?._id}`,
        {},
        { headers }
      )
      .then((response) => {
        setRefreshSalon(!refreshSalon);
        return alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unfollowHandler = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    const headers = {
      Authorization: token,
    };

    axios
      .post(
        `http://localhost:3000/users/unsubscribe/${salon?._id}`,
        {},
        { headers }
      )
      .then((response) => {
        setRefreshSalon(!refreshSalon);
        return alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("api_token_user")) {
      setIsLoggedIn(true);
    }
    fetchSalon();
  }, [refreshSalon]);

  return (
    <>
      <div className="salonCardHeader">
        <h1>{salon?.name}</h1>
        {loggedIn && (
          <button
            className="salonCardHeaderButton"
            onClick={!followSalon ? followHandler : unfollowHandler}
          >
            {!followSalon ? "Pretplati se" : "Otprati salon"}
          </button>
        )}
      </div>
      <Nav
        variant="tabs"
        className={
          loggedIn ? "salonCardHeaderNavLogin" : "salonCardHeaderNavNotLogin"
        }
      >
        <NavLink onClick={handleNavInfo}>Informacije</NavLink>
        <NavLink onClick={handleNavServices}>Usluge</NavLink>
        <NavLink onClick={handleNavPosts}>Slike</NavLink>
        {loggedIn && <NavLink onClick={handleNavApp}>Zakazi</NavLink>}
      </Nav>
      {navInfo && (
        <div className="infoDiv">
          <div className="infoDivLeft">
            <div className="info">
              <h4 className="infoLine">
                <FontAwesomeIcon icon={faMapPin} className="icon" />
                {salon?.location.street} {salon?.location.number}, {salon?.city}
              </h4>
              <h4 className="infoLine">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                {salon?.email}
              </h4>
              <h4 className="infoLine">
                <FontAwesomeIcon icon={faRestroom} className="icon" />
                {salon?.type}
              </h4>
            </div>
            <div className="info divMark">
              <span className="styleMark badge" onClick={handleGiveMark}>
                {salon?.markInfo.mark.toFixed(1)}
              </span>
              <div className={loggedIn && giveMark ? "giveMarkDiv" : "d-none"}>
                <div className="marksDiv">
                  <FontAwesomeIcon
                    icon={fa1}
                    className={
                      newMark === 1 ? "icon markIconClick" : "icon markIcon"
                    }
                    onClick={() => handleMarkClick(1)}
                  />
                  <FontAwesomeIcon
                    icon={fa2}
                    className={
                      newMark === 2 ? "icon markIconClick" : "icon markIcon"
                    }
                    onClick={() => handleMarkClick(2)}
                  />
                  <FontAwesomeIcon
                    icon={fa3}
                    className={
                      newMark === 3 ? "icon markIconClick" : "icon markIcon"
                    }
                    onClick={() => handleMarkClick(3)}
                  />
                  <FontAwesomeIcon
                    icon={fa4}
                    className={
                      newMark === 4 ? "icon markIconClick" : "icon markIcon"
                    }
                    onClick={() => handleMarkClick(4)}
                  />
                  <FontAwesomeIcon
                    icon={fa5}
                    className={
                      newMark === 5 ? "icon markIconClick" : "icon markIcon"
                    }
                    onClick={() => handleMarkClick(5)}
                  />
                </div>

                <button
                  className={newMark !== 0 ? "giveMarkBtn" : "d-none"}
                  onClick={handleRateSalon}
                >
                  Oceni
                </button>
              </div>
            </div>
          </div>
          <div className="infoDivRight">
            <h4 className="serviceLabel">RADNO VREME</h4>

            <div className="servicesDiv">
              {salon?.workTime.map((time, index) => (
                <div className="serviceDiv workTimeDiv" key={index}>
                  <label>{days[index]}</label>
                  <label>{time}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {navServices && (
        <div className="servicesMainDiv">
          <div className="servicesGlobalDiv">
            <h4 className="serviceLabel">USLUGE</h4>
            <div className="servicesDiv">
              {salon?.services.length ? (
                salon?.services.map((service, index) => (
                  <ServiceCard key={index} service={service} />
                ))
              ) : (
                <h5 className="labelNotServices">
                  Salon još uvek nema nijednu uslugu
                </h5>
              )}
            </div>
          </div>
        </div>
      )}
      {navPosts && (
        <div className={salon?.posts.length ? "postsDiv" : "postsDivNo"}>
          {salon?.posts.length ? (
            salon?.posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          ) : (
            <h3 className="labelNotPosts">Salon još uvek nema nijednu sliku</h3>
          )}
        </div>
      )}
      {navApp && <AppointmentCard salon={salon} />}
    </>
  );
}
