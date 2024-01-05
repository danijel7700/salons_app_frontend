import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePageNavbar from "../HomePageNavbar";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import axios from "axios";

function Login() {
  const socket = useContext(WebsocketContext);

  const [isSalon, setIsSalon] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      navigate("/");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {};

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isSalon) {
      const loginData = {
        email: email,
        password: password,
      };
      try {
        const response = await fetch(
          "http://localhost:3000/salons-auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );
        const data = await response.json();
        if (response.status === 401) {
          setErrorMessage(data.message);
        }
        if (response.ok) {
          setErrorMessage("");
          localStorage.setItem("api_token_salon", data.access_token);
          localStorage.setItem("api_salon_id", data.salon._id);
          navigate("/salon");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const loginData = {
        username: username,
        password: password,
      };

      try {
        const response = await fetch("http://localhost:3000/users-auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (response.status === 401) {
          setErrorMessage(data.message);
        }
        if (response.ok) {
          setErrorMessage("");
          localStorage.setItem("api_token_user", data.access_token);
          localStorage.setItem("api_user_id", data.user._id);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Prijavi se</h2>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isSalon"
                    checked={isSalon}
                    onChange={() => setIsSalon(!isSalon)}
                  />
                  <label className="form-check-label" htmlFor="isSalon">
                    Prijavi se kao salon
                  </label>
                </div>
                {isSalon ? ( // Prikazivanje forme za salon
                  <form onSubmit={handleSubmit}>
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
                      <p>
                        <a href="/salon/forgotPassword">
                          Zaboravili ste šifru?
                        </a>
                      </p>
                    </div>
                    <div className="text-center">
                      <Alert
                        variant="danger"
                        className={errorMessage ? "" : "d-none"}
                      >
                        {errorMessage}
                      </Alert>
                      <button type="submit" className="btn btn-primary">
                        Prijavi se kao salon
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <p>
                        Nemate profil?{" "}
                        <a href="/registracija/salon">Registrujte se ovde</a>.
                      </p>
                    </div>
                  </form>
                ) : (
                  // Prikazivanje forme za korisnika (difoltno)
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Korisničko ime
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setErrorMessage("");
                        }}
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
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage("");
                          }}
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
                      <p>
                        <a href="/user/forgotPassword">Zaboravili ste šifru?</a>
                      </p>
                    </div>
                    <div className="text-center">
                      <Alert
                        variant="danger"
                        className={errorMessage ? "" : "d-none"}
                      >
                        {errorMessage}
                      </Alert>
                      <button type="submit" className="btn btn-primary">
                        Prijavi se kao korisnik
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <p>
                        Nemate profil?{" "}
                        <a href="/registracija/korisnik">Registrujte se ovde</a>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
