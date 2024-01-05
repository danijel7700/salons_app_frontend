import { useState } from "react";
import "./SalonPage.css";
import axios from "axios";

export default function AddServiceCard() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [terms, setTerms] = useState("");

  const addServiceHandler = () => {
    console.log(name, cost, terms);
    const data = {
      name,
      cost,
      terms,
    };
    const salonToken = localStorage.getItem("api_token_salon");
    const token = "Bearer " + salonToken;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(`http://localhost:3000/services`, data, config)
      .then((res) => {
        console.log(res.data);
        return alert("Dodavanje uspešno");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mainAddHSDiv">
        <h2 className="addHairSH">Dodajte uslugu</h2>
        <div className="addUserBodyDiv">
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Naziv
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
          <div className="costAndTermsDiv">
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Cena
              </label>
              <input
                type="number"
                className="form-control"
                id="cost"
                value={cost}
                min={50}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Broj termina
              </label>
              <input
                type="number"
                className="form-control"
                id="terms"
                value={terms}
                min={1}
                onChange={(e) => setTerms(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="btn btn-primary addUserBtn"
            onClick={addServiceHandler}
          >
            Dodaj uslugu
          </button>
        </div>
      </div>
    </>
  );
}
