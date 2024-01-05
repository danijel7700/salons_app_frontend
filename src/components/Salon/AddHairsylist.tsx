import { useState } from "react";
import "./SalonPage.css";
import axios from "axios";

export default function AddHairsylistCard({
  onToggleFlag,
}: {
  onToggleFlag: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addHairstylistHandler = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
    };

    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(`http://localhost:3000/salons/add-hairstylist`, data, config)
      .then((res) => {
        console.log(res.data);
        onToggleFlag();
        return alert("Uspešno ste dodali frizera");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mainAddHSDiv">
        <h2 className="addHairSH">Dodajte frizera</h2>
        <div className="addUserBodyDiv">
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Ime
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Prezime
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary addUserBtn"
            onClick={addHairstylistHandler}
          >
            Dodaj frizera
          </button>
        </div>
      </div>
    </>
  );
}
