import { useState } from "react";
import "./ChangeService.css";
import axios from "axios";

export default function ChangeService(service: any) {
  const [cost, setCost] = useState("");
  const [currentCost, setCurrentCost] = useState(service.service.cost);
  const [showChangeDiv, setShowChangeDiv] = useState(false);

  const handlerShowDiv = () => {
    setShowChangeDiv(!showChangeDiv);
  };

  const handlerChange = () => {
    if (cost === "" || +cost < 50) {
      return alert("Unesite cenu");
    }

    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    const serviceData = {
      id: service.service._id,
      cost,
      terms: service.service.terms,
    };

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .patch("http://localhost:3000/services", serviceData, config)
      .then((response) => {
        console.log(response.data);
        setShowChangeDiv(!showChangeDiv);
        setCurrentCost(cost);
        return alert("Uspešno izmenjeno");
      })
      .catch((error) => {
        console.error(error);
      });

    setShowChangeDiv(!showChangeDiv);
  };

  return (
    <>
      <div>
        <div className="salonPageServiceDiv" onClick={handlerShowDiv}>
          <label> {service.service.name}</label>
          <label> {currentCost} din</label>
        </div>
        {showChangeDiv && (
          <div className="changeCostDiv">
            <label htmlFor="text" className="form-label">
              Cena
            </label>
            <input
              type="number"
              className="form-control changeCostInput"
              id="cost"
              min={50}
              onChange={(e) => setCost(e.target.value)}
              required
            />
            <button className=" changeCostBtn" onClick={handlerChange}>
              Izmeni
            </button>
          </div>
        )}
      </div>
    </>
  );
}
