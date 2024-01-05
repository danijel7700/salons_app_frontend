import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomePageNavbar from "../HomePageNavbar";
import "./RegisterUser.css";

function KorisnikRegistracija() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("m");
  const [phNumber, setPhNumber] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setPasswordMatchError(false);

    const registerData = {
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
      phoneNumber: {
        refferenceNumber: "+381",
        number: phNumber,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        console.log(gender);
        switch (data.message.split(" ")[0].trim()) {
          case '"password"':
            console.log("aaa");
            setErrorMessage(
              "Šifra mora imati bar jedan znak, malo slovo, veliko slovo i cifru"
            );
            break;
          case '"email"':
            setErrorMessage("Nevalidan unos email adrese");
            break;
          case '"firstName"':
            setErrorMessage("Ime mora početi velikim slovom");
            break;
          case '"lastName"':
            setErrorMessage("Prezime mora početi velikim slovom");
            break;
        }
      }
      if (response.status === 409) {
        const textBetweenQuotesRegex = /"([^"]+)"/;
        const match = data.message.match(textBetweenQuotesRegex);
        if (match.includes(email)) {
          setErrorMessage("Email adresa se već koristi");
        }
        if (match.includes(username)) {
          setErrorMessage("Korisničko ime se već koristi");
        }
      }
      if (response.ok) {
        setErrorMessage("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Registracija</h2>
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
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
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
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorMessage("");
                      }}
                      required
                    />
                    {passwordMatchError && (
                      <p className="text-danger">Lozinke se ne poklapaju.</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Ime
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setErrorMessage("");
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Prezime
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setErrorMessage("");
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Pol</label>
                    <select
                      className="form-select"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="m">Muški</option>
                      <option value="z">Ženski</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Broj telefona
                    </label>
                    <div className="phoneNumInputDiv">
                      <input
                        type="text"
                        className="form-control referenceNumInput"
                        id="lastName"
                        value={"+381"}
                        required
                      />
                      <input
                        type="text"
                        className="form-control phoneNumInput"
                        id="lastName"
                        value={phNumber}
                        maxLength={9}
                        minLength={8}
                        onChange={(e) => {
                          setPhNumber(e.target.value);
                          setErrorMessage("");
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <Alert
                      variant="danger"
                      className={errorMessage ? "" : "d-none"}
                    >
                      {errorMessage}
                    </Alert>
                    <button type="submit" className="btn btn-primary">
                      Registruj se
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KorisnikRegistracija;
