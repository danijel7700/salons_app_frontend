import { useState } from "react";
import "./ChangePass.css";
import axios from "axios";

export default function ChangePasswordCard({
  onToggleFlag,
}: {
  onToggleFlag: () => void;
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .patch(
        `http://localhost:3000/salons/change-password/${password}`,
        {},
        config
      )
      .then((response) => {
        onToggleFlag();
        return alert("Uspešno ste izmenili šifru");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="changePassDiv">
        <div className="mb-3 changePassElementDiv">
          <label htmlFor="password" className="form-label">
            Lozinka
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
        <div className="mb-3 changePassElementDiv">
          <label htmlFor="password" className="form-label">
            Nova lozinka
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
        <div className="mb-3 changePassElementDiv">
          <label htmlFor="confirmPassword" className="form-label">
            Ponovite novu lozinku
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
            <p className="text-danger dangerText">Lozinke se ne poklapaju.</p>
          )}
        </div>
        <button
          className="btn btn-primary btnChangePasswordSalon"
          onClick={handleSubmit}
        >
          Promeni šifru
        </button>
      </div>
    </>
  );
}
