import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./NotFoundPage";
import HomePage from "./HomePage/HomePage";
import KorisnikRegistracija from "./LoginRegister/RegisterUser";
import Login from "./LoginRegister/LoginPage";
import SalonRegistration from "./LoginRegister/RegisterSalon";
import "./Salon/SalonPage.css";
import Salon2Page from "./Salon/Salon2Page";
import UserPage from "./User/UserPage";
import ForgotPasswordUserCard from "./LoginRegister/ForgotPasswordUser";

function AppRouting() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <h1>
              <HomePage />
            </h1>
          }
        />
        <Route
          path="/user"
          element={
            <h1>
              <UserPage flag={0} />
            </h1>
          }
        />
        <Route
          path="/user/inbox"
          element={
            <h1>
              <UserPage flag={1} />
            </h1>
          }
        />
        <Route
          path="/user/forgotPassword"
          element={
            <h1>
              <ForgotPasswordUserCard />
            </h1>
          }
        />
        <Route
          path="/salon/forgotPassword"
          element={
            <h1>
              <ForgotPasswordUserCard />
            </h1>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/registracija/korisnik"
          element={<KorisnikRegistracija />}
        />
        <Route path="/registracija/salon" element={<SalonRegistration />} />
        <Route
          path="/salon"
          element={
            <h1 className="h1SalonPage">
              <Salon2Page />
            </h1>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRouting;
