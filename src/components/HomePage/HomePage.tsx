import React, { useState, useEffect } from "react";
import SalonCard from "../SalonCard/SalonCard";
import HomePageNavbar from "../HomePageNavbar";
import { Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [salons, setSalons] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cityTerm, setCityTerm] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoggedInSalon, setIsLoggedInSalon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInSalon = localStorage.getItem("api_token_salon");
    if (loggedInSalon) {
      navigate("/salon");
    }

    if (localStorage.getItem("loggedIn")) {
      setLoggedIn(true);
    }

    let pagOptions = "";

    switch (sortOption) {
      case "default":
        pagOptions = "";
        break;
      case "rating-desc":
        pagOptions = 'sort={"sortBy":"markInfo.mark", "direction":-1}&';
        break;
      case "rating-asc":
        pagOptions = 'sort={"sortBy":"markInfo.mark", "direction":1}&';
        break;
    }

    if (cityTerm !== "") {
      pagOptions += `filter={"city":"${cityTerm}"`;
    } else {
      pagOptions += `filter={`;
    }

    switch (filterOption) {
      case "all":
        pagOptions += "}&";
        break;
      case "muski":
        pagOptions +=
          cityTerm === "" ? '"type":"Muški"}&' : ',"type":"Muški"}&';
        break;
      case "zenski":
        pagOptions +=
          cityTerm === "" ? '"type":"Ženski"}&' : ',"type":"Ženski"}&';
        break;
      case "musko-zenski":
        pagOptions +=
          cityTerm === ""
            ? '"type":"Muško-Ženski"}&'
            : ',"type":"Muško-Ženski"}&';
        break;
    }

    if (searchTerm !== "") {
      pagOptions = `reg=${searchTerm}`;
    }

    console.log(`http://localhost:3000/salons?${pagOptions}`);

    const fetchSalons = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/salons?${pagOptions}`
        );
        if (!response.ok) {
          throw new Error("HTTP Error! Status: " + response.status);
        }
        const data = await response.json();
        setSalons(data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalons();
  }, [sortOption, filterOption, searchTerm, isLoggedIn, cityTerm]);

  return (
    <>
      <HomePageNavbar />
      <div className="container mt-5">
        <div className="searchSalonsDiv">
          <input
            id="searchInput"
            type="text"
            className="form-control searchSalonsInput"
            placeholder="Pretraži salone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="filterDiv">
            <label htmlFor="sortSelect">Sortiranje:</label>
            <select
              id="sortSelect"
              className="selectForm"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
              }}
            >
              <option value="default">Osnovno</option>
              <option value="rating-desc">Po oceni opadajuće</option>
              <option value="rating-asc">Po oceni rastuće</option>
            </select>
          </div>
          <div className="filterCityDiv">
            <input
              id="searchInput"
              type="text"
              className="form-control searchSalonsCityInput"
              placeholder="Grad..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setCityTerm(cityInput);
                }
              }}
            />
          </div>
          <div className="filterDiv">
            <label htmlFor="filterSelect">Tip:</label>
            <select
              id="filterSelect"
              className="selectForm"
              value={filterOption}
              onChange={(e) => {
                setFilterOption(e.target.value);
              }}
            >
              <option value="all">Sve</option>
              <option value="muski">Muški</option>
              <option value="zenski">Ženski</option>
              <option value="musko-zenski">Muško-Zenski</option>
            </select>
          </div>
        </div>
        {salons.map((salon, index) => (
          <SalonCard key={index} salon={salon} />
        ))}
      </div>
    </>
  );
}
