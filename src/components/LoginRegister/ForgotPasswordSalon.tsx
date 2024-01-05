import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordSalonCard() {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const sendEmail = () => {
    axios
      .post(`http://localhost:3000/salons/send-reset-email/${email}`, {}, {})
      .then((res) => {
        console.log(res.data);
        setFlag(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const recoverPassword = () => {
    const data = {
      token: code,
      newPassword: password,
    };

    axios
      .patch(`http://localhost:3000/salons/reset-password`, data, {})
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="forgotPassMainDiv">
        {!flag && (
          <div className="mb-3 forgotPassDiv">
            <label htmlFor="email" className="form-label forgotPassLabel">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <button
              className="btn btn-primary forgotPassBtn"
              onClick={sendEmail}
            >
              Pošalji kod
            </button>
          </div>
        )}
        {flag && (
          <div className="mb-3 forgotPassDiv">
            <label htmlFor="text" className="form-label forgotPassLabel">
              Verifikacioni kod
            </label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              required
            />
            <label htmlFor="text" className="form-label forgotPassLabel">
              Nova šifra
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button
              className="btn btn-primary forgotPassBtn"
              onClick={recoverPassword}
            >
              Obnovi šifru
            </button>
          </div>
        )}
      </div>
    </>
  );
}
