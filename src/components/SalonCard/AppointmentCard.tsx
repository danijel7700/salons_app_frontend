import { Key, SetStateAction, useEffect, useState } from "react";
import { HairStylists, Salon } from "../../entities/entities";
import "./AppointmentCard.css";
import axios from "axios";
import { Button } from "react-bootstrap";

function formatDate(date: string) {
  const parts = date.split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AppointmentCard(salon: any) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStylistId, setSelectedStylistId] = useState("");
  const [selectServiceId, setSelectServiceId] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [freeTerms, setFreeTerms] = useState([]);
  const [followSalon, setFollowSalon] = useState(false);

  const fetchUserFollowSalon = () => {
    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    axios
      .get(`http://localhost:3000/users/followSalon/${salon.salon._id}`, {
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

  const handleStylistChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedStylistId(e.target.value);
    setFreeTerms([]);
  };

  const handleServiceChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectServiceId(e.target.value);
    setFreeTerms([]);
  };

  const handleTermChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedTerm(e.target.value);
  };

  const handleDateChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedDate(e.target.value);
    const date = formatDate(e.target.value.toString());
    const data = {
      hairStylistId: selectedStylistId,
      date,
      serviceId: selectServiceId,
    };

    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(`http://localhost:3000/salons/terms`, data, config)
      .then((res) => {
        setFreeTerms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReserveButton = () => {
    const data = {
      time: selectedTerm,
      date: formatDate(selectedDate),
      hairStylistId: selectedStylistId,
      serviceId: selectServiceId,
    };

    const userToken = localStorage.getItem("api_token_user");

    const token = "Bearer " + userToken;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(`http://localhost:3000/appointments`, data, config)
      .then((res) => {
        return alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        return alert(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchUserFollowSalon();
  }, []);

  return (
    <>
      {followSalon ? (
        <div className="appRootDiv">
          <div className="initAppDiv">
            <div className="selectDiv">
              <h5>Odaberite frizera:</h5>
              <select className="selectElDiv" onChange={handleStylistChange}>
                <option value="">...</option>
                {salon.salon.hairStylists.map(
                  (stylist: any, index: Key | null | undefined) => {
                    return (
                      <option key={index} value={stylist._id}>
                        {stylist.first_name} {stylist.last_name}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <div className="selectDiv">
              <h5>Odaberite uslugu:</h5>
              <select className="selectElDiv" onChange={handleServiceChange}>
                <option value="">...</option>
                {salon.salon.services.map(
                  (service: any, index: Key | null | undefined) => {
                    return (
                      <option key={index} value={service._id}>
                        {service.name}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
          </div>
          {selectedStylistId && selectServiceId && (
            <div className="selectDiv">
              <h5>Odaberite datum:</h5>
              <input
                className="selectElDiv"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={getCurrentDate()}
              />
            </div>
          )}
          {freeTerms.length !== 0 && (
            <div className="selectDiv">
              <h5>Odaberite termin:</h5>
              <select className="selectElDiv" onChange={handleTermChange}>
                <option value="">...</option>
                {freeTerms.map((term: any, index: Key | null | undefined) => {
                  return (
                    <option key={index} value={term}>
                      {term}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {selectedTerm !== "" && (
            <button
              className="salonCardHeaderButton appBtn"
              onClick={handleReserveButton}
            >
              Zakazi
            </button>
          )}
        </div>
      ) : (
        <h3 className="labelNotPosts labelNotFollow">
          Morate se pretplatiti na salon da bi zakazali termin
        </h3>
      )}
    </>
  );
}
