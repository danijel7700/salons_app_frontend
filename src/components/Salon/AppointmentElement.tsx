import axios from "axios";
import { useEffect, useState } from "react";
import "./AppointmentElement.css";
import { Service, User } from "../../entities/entities";

export default function AppointmentElement(app: any) {
  const [user, setUser] = useState<User>();
  const [service, setService] = useState<Service>();

  const fetchUser = () => {
    axios
      .get(`http://localhost:3000/users/${app.app.userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchService = () => {
    axios
      .get(`http://localhost:3000/services/service/${app.app.serviceId}`)
      .then((res) => {
        setService(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUser();
    fetchService();
  }, []);

  return (
    <>
      {console.log(app)}
      <div className="appElDiv">
        <div className="userDiv">
          <h5>
            {user?.firstName} {user?.lastName}
          </h5>
        </div>
        <div className="infoDiv">
          <h5>{service?.name}</h5>
          <h5>{app.app.time}</h5>
        </div>
      </div>
    </>
  );
}
