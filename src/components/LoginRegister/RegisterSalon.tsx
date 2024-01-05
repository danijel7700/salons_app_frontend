import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./RegisterSalon.css";

const timeFrom = [
  "Ne radi",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
];
const timeTo = [
  "Ne radi",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const days = [
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Cetvrtak",
  "Petak",
  "Subota",
  "Nedelja",
];

function SalonRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pib, setPib] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [salonType, setSalonType] = useState("m"); // Po difoltu postavljamo tip salona na muški
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [street_number, setStreetNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputWorkTime, setInputWorkTime] = useState(false);

  const [fromTime, setFromTime] = useState(["", "", "", "", "", "", ""]);
  const [toTime, setToTime] = useState(["", "", "", "", "", "", ""]);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      setInputWorkTime(!inputWorkTime);
      return;
    }

    setPasswordMatchError(false);

    let workTime = [...fromTime];
    workTime = workTime.map((t, index) => {
      if (t === "Ne radi" || t === "") {
        return "Ne radi";
      }
      if (toTime[index] === "" || toTime[index] === "Ne radi") {
        return "error";
      }
      return `${t} - ${toTime[index]}`;
    });

    if (workTime.includes("error")) {
      return alert("Unesite kraj radnog vremena");
    }

    const registerData = {
      name,
      location: {
        street,
        number: street_number,
      },
      city,
      email,
      password,
      PIB: pib,
      type: salonType,
      workTime,
    };

    try {
      const response = await fetch("http://localhost:3000/salons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        switch (data.message.split(" ")[0].trim()) {
          case '"password"':
            setErrorMessage(
              "Šifra mora imati bar jedan znak, malo slovo, veliko slovo i cifru"
            );
            break;
          case '"email"':
            setErrorMessage("Nevalidan unos email adrese");
            break;
          case '"PIB"':
            setErrorMessage("PIB mora biti broj");
            break;
          case '"city"':
            setErrorMessage("Grad mora početi velikim slovom");
            break;
          case '"street"':
            setErrorMessage("Ulica mora početi velikim slovom");
            break;
          case '"name"':
            setErrorMessage("Ime salona mora početi velikim slovom ili cifrom");
            break;
        }
        setInputWorkTime(!inputWorkTime);
      }
      if (response.status === 409) {
        const textBetweenQuotesRegex = /"([^"]+)"/;
        const match = data.message.match(textBetweenQuotesRegex);
        console.log({ m: match });
        setErrorMessage(match);
      }
      if (response.ok) {
        setErrorMessage("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const workTimeSubmit = () => {
    setInputWorkTime(!inputWorkTime);
  };

  const workTimeNextSubmit = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      pib === "" ||
      city === "" ||
      street === "" ||
      street_number === ""
    ) {
      setErrorMessage("Popunite sva polja");
    } else {
      setErrorMessage("");
      setPasswordMatchError(false);
      setInputWorkTime(!inputWorkTime);
    }
  };

  const handleFromTimeSelect = (index: number, e: string) => {
    let updateTimeFrom = [];
    switch (index) {
      case 0:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[0] = e;
        setFromTime(updateTimeFrom);
        break;
      case 1:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[1] = e;
        setFromTime(updateTimeFrom);
        break;
      case 2:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[2] = e;
        setFromTime(updateTimeFrom);
        break;
      case 3:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[3] = e;
        setFromTime(updateTimeFrom);
        break;
      case 4:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[4] = e;
        setFromTime(updateTimeFrom);
        break;
      case 5:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[5] = e;
        setFromTime(updateTimeFrom);
        break;
      case 6:
        updateTimeFrom = [...fromTime];
        updateTimeFrom[6] = e;
        setFromTime(updateTimeFrom);
        break;
    }
  };

  const handleToTimeSelect = (index: number, e: string) => {
    let updateTimeTo = [];
    switch (index) {
      case 0:
        updateTimeTo = [...toTime];
        updateTimeTo[0] = e;
        setToTime(updateTimeTo);
        break;
      case 1:
        updateTimeTo = [...toTime];
        updateTimeTo[1] = e;
        setToTime(updateTimeTo);
        break;
      case 2:
        updateTimeTo = [...toTime];
        updateTimeTo[2] = e;
        setToTime(updateTimeTo);
        break;
      case 3:
        updateTimeTo = [...toTime];
        updateTimeTo[3] = e;
        setToTime(updateTimeTo);
        break;
      case 4:
        updateTimeTo = [...toTime];
        updateTimeTo[4] = e;
        setToTime(updateTimeTo);
        break;
      case 5:
        updateTimeTo = [...toTime];
        updateTimeTo[5] = e;
        setToTime(updateTimeTo);
        break;
      case 6:
        updateTimeTo = [...toTime];
        updateTimeTo[6] = e;
        setToTime(updateTimeTo);
        break;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Registracija salona</h2>
              {!inputWorkTime && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Ime salona
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Lozinka
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Sakrij" : "Prikaži"}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Ponovite lozinku
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {passwordMatchError && (
                      <p className="text-danger dangerText">
                        Lozinke se ne poklapaju.
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pib" className="form-label">
                      PIB
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pib"
                      value={pib}
                      onChange={(e) => setPib(e.target.value)}
                      required
                      minLength={9}
                      maxLength={9}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      Grad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="street" className="form-label">
                      Ulica i broj
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        className="form-control"
                        id="street_number"
                        value={street_number}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tip salona</label>
                    <select
                      className="form-select"
                      value={salonType}
                      onChange={(e) => setSalonType(e.target.value)}
                    >
                      <option value="m">Muški</option>
                      <option value="z">Ženski</option>
                      <option value="o">Muški i ženski</option>
                    </select>
                  </div>
                  <div className="text-center">
                    <Alert
                      variant="danger"
                      className={errorMessage ? "" : "d-none"}
                    >
                      {errorMessage}
                    </Alert>
                    <div className="btnNextDiv">
                      <button
                        className="btn btn-primary"
                        onClick={workTimeNextSubmit}
                      >
                        Dalje
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {inputWorkTime && (
                <div>
                  <div className="mb-3">
                    <div className="daysDiv">
                      {days.map((day, index) => (
                        <div className="dayDiv">
                          <label>{day}</label>
                          <div className="selectTimeInputsDiv">
                            <select
                              className="selectTime"
                              value={fromTime[index]}
                              onChange={(e) =>
                                handleFromTimeSelect(index, e.target.value)
                              }
                            >
                              {timeFrom.map((time, index) => (
                                <option>{time}</option>
                              ))}
                            </select>

                            {fromTime[index] !== "" &&
                              fromTime[index] !== "Ne radi" && (
                                <select
                                  className="selectTime"
                                  value={toTime[index]}
                                  onChange={(e) =>
                                    handleToTimeSelect(index, e.target.value)
                                  }
                                >
                                  {timeTo.map((time, index) => (
                                    <option>{time}</option>
                                  ))}
                                </select>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="btnsDiv">
                    <button
                      className="btn btn-primary"
                      onClick={workTimeSubmit}
                    >
                      Nazad
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Registruj salon
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalonRegistration;
