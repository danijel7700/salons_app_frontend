import { useEffect, useState } from "react";
import { Salon } from "../../entities/entities";
import HomePageNavbar from "../HomePageNavbar";
import "./SalonPage.css";
import "./Salon2Page.css";
import axios from "axios";
import Modal from "react-modal";
import { Nav, NavLink } from "react-bootstrap";
import AppointmentElement from "./AppointmentElement";
import PostCard from "../SalonCard/PostCard";
import AddPictureCard from "./AddPicture";
import ChangeService from "./ChangeService";
import { useNavigate } from "react-router-dom";
import {
  faEnvelope,
  faRestroom,
  faMapPin,
  faKey,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChangePasswordCard from "./ChangePassword";
import AddHairsylistCard from "./AddHairsylist";
import WorkTimeCard from "./WorkTimeCard";

Modal.setAppElement(document.body);

const days = [
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
  "Nedelja",
];

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

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(date: string) {
  const parts = date.split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const getTimeFrom = (time: string | undefined) => {
  return time?.split(" - ")[0];
};

const getTimeTo = (time: string | undefined) => {
  return time?.split(" - ")[1];
};

export default function Salon2Page(service: any) {
  const [salon, setSalon] = useState<Salon>();
  const [listOfAppointment, setListOfAppointment] = useState([]);
  const [isAddHSModalOpen, setIsAddHSModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [selectedHairstylist, setSelectedHairstylist] = useState("");
  const [navApp, setNavApp] = useState(false);
  const [navInfo, setNavInfo] = useState(true);
  const [navPicture, setNavPicture] = useState(false);
  const [navServices, setNavServices] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [isAddPicModalOpen, setIsAddPicModalOpen] = useState(false);
  const [isListHSModalOpen, setIsListHSModalOpen] = useState(false);
  const [currentIndexWT, setCurrentIndexWT] = useState(-1);
  const [timeForChangeFrom, setTimeForChangeFrom] = useState("");
  const [timeForChangeTo, setTimeForChangeTo] = useState("");
  const [isChangeWTModalOpen, setIsChangeWTModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  const handleFlag = () => {
    setFlag(!flag);
    closeAddPicModal();
  };

  const handleNavInfo = () => {
    setFlag(!flag);
    setNavInfo(true);
    setNavPicture(false);
    setNavApp(false);
    setNavServices(false);
  };

  const handleNavPosts = () => {
    setFlag(!flag);
    setNavInfo(false);
    setNavPicture(true);
    setNavApp(false);
    setNavServices(false);
  };

  const handleNavApp = () => {
    setFlag(!flag);
    setNavInfo(false);
    setNavPicture(false);
    setNavApp(true);
    setNavServices(false);
  };

  const handleNavServices = () => {
    setFlag(!flag);
    setNavInfo(false);
    setNavPicture(false);
    setNavApp(false);
    setNavServices(true);
  };

  const openAddHSModal = async () => {
    document.body.style.overflow = "hidden";
    setIsAddHSModalOpen(true);
  };

  const closeAddHSModal = () => {
    document.body.style.overflow = "auto";
    setIsAddHSModalOpen(false);
    setFlag(!flag);
  };

  const openAddPicModal = () => {
    document.body.style.overflow = "hidden";
    setIsAddPicModalOpen(true);
  };

  const closeAddPicModal = () => {
    document.body.style.overflow = "auto";
    setIsAddPicModalOpen(false);
    setFlag(!flag);
  };

  const openListHSModal = () => {
    document.body.style.overflow = "hidden";
    setIsListHSModalOpen(true);
  };

  const closeListHSModal = () => {
    document.body.style.overflow = "auto";
    setIsListHSModalOpen(false);
    setFlag(!flag);
  };

  const openChangePassModal = () => {
    document.body.style.overflow = "hidden";
    setIsChangePassModalOpen(true);
  };

  const closeChangePassModal = () => {
    document.body.style.overflow = "auto";
    setIsChangePassModalOpen(false);
    setFlag(!flag);
  };

  const openChangeWTModal = () => {
    document.body.style.overflow = "hidden";
    setIsChangeWTModalOpen(true);
  };

  const closeChangeWTModal = () => {
    document.body.style.overflow = "auto";
    setIsChangeWTModalOpen(false);
    setFlag(!flag);
  };

  const handleAppDataChange = (e: string, flag: number) => {
    let date;
    let hairStylistId;
    if (flag == 0) {
      date = selectedDate;
      hairStylistId = e;
      setSelectedHairstylist(e);
    } else {
      date = e;
      hairStylistId = selectedHairstylist;
      setSelectedDate(e);
    }

    date = formatDate(date);

    fetchApponitmets(hairStylistId, date);
  };

  const fetchApponitmets = (hairstylistId: string, date: string) => {
    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    axios
      .get(
        `http://localhost:3000/appointments?hairstylistId=${hairstylistId}&date=${date}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setListOfAppointment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSalon = () => {
    const id = localStorage.getItem("api_salon_id");
    axios.get(`http://localhost:3000/salons/${id}`).then((res) => {
      setSalon(res.data);
      if (res.data.hairStylists.length === 0) {
        setIsAddHSModalOpen(true);
      } else {
        setSelectedHairstylist(res.data.hairStylists[0]._id);
        fetchApponitmets(
          res.data.hairStylists[0]._id,
          formatDate(getCurrentDate())
        );
      }
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteHS = (id: string) => {
    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .delete(`http://localhost:3000/salons/delete/${id}`, config)
      .then((response) => {
        closeListHSModal();
        return alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeWorkTime = (index: number) => {
    setCurrentIndexWT(index);
    openChangeWTModal();
  };

  const submitChangeWorkTime = (newTime: string) => {
    let workTimeList = salon?.workTime;

    if (workTimeList) {
      workTimeList[currentIndexWT] = newTime;
    }

    console.log(workTimeList);

    const configData = { workTime: workTimeList };

    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .patch(`http://localhost:3000/salons/change-workTime`, configData, config)
      .then((response) => {
        setFlag(!flag);
        closeChangeWTModal();
        return alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSalon();
  }, [flag]);

  return (
    <>
      <div className="mainDiv">
        <div className="headerDiv">
          <h1>{salon?.name}</h1>
          <button className="logoutBtn" onClick={handleLogout}>
            Odjavi se
          </button>
        </div>
        <Nav variant="tabs" className="navEl">
          <NavLink
            onClick={handleNavInfo}
            className={navInfo ? "navSalonPage" : ""}
          >
            Informacije
          </NavLink>
          <NavLink
            onClick={handleNavServices}
            className={navServices ? "navSalonPage" : ""}
          >
            Usluge
          </NavLink>
          <NavLink
            onClick={handleNavPosts}
            className={navPicture ? "navSalonPage" : ""}
          >
            Slike
          </NavLink>
          <NavLink
            onClick={handleNavApp}
            className={navApp ? "navSalonPage" : ""}
          >
            Zakazivanja
          </NavLink>
        </Nav>
        <div className="mainContentDiv">
          <Modal
            isOpen={isAddPicModalOpen}
            onRequestClose={closeAddPicModal}
            className="custom-modal addUserModal"
            overlayClassName="custom-modal-overlay"
          >
            <AddPictureCard onToggleFlag={handleFlag} />
          </Modal>
          <Modal
            isOpen={isChangePassModalOpen}
            onRequestClose={closeChangePassModal}
            className="custom-modal changePassModal"
            overlayClassName="custom-modal-overlay"
          >
            <ChangePasswordCard onToggleFlag={closeChangePassModal} />
          </Modal>
          <Modal
            isOpen={isListHSModalOpen}
            onRequestClose={closeListHSModal}
            className="custom-modal listHSModal"
            overlayClassName="custom-modal-overlay"
          >
            {salon?.hairStylists.map((hs) => (
              <div className="changeHSDiv">
                <h4>
                  {hs.first_name} {hs.last_name}
                </h4>
                <button
                  className="changeHSBtn"
                  onClick={(e) => handleDeleteHS(hs._id)}
                >
                  Izbriši
                </button>
              </div>
            ))}
          </Modal>
          <Modal
            isOpen={isAddHSModalOpen}
            onRequestClose={closeAddHSModal}
            className="custom-modal addHSModal"
            overlayClassName="custom-modal-overlay"
          >
            <AddHairsylistCard onToggleFlag={closeAddHSModal} />
          </Modal>
          <Modal
            isOpen={isChangeWTModalOpen}
            onRequestClose={closeChangeWTModal}
            className="custom-modal changeTimeModal"
            overlayClassName="custom-modal-overlay"
          >
            <WorkTimeCard
              time={salon?.workTime[currentIndexWT]}
              index={currentIndexWT}
              onSubmit={submitChangeWorkTime}
            />
          </Modal>
          {navApp && (
            <div className="appContentDiv">
              <div className="appsFormDiv">
                <div className="selectHSDiv">
                  <select
                    className="selectHS"
                    onChange={(e) => handleAppDataChange(e.target.value, 0)}
                  >
                    {salon?.hairStylists.map((hairStylist, index) => {
                      return (
                        <option key={index} value={hairStylist._id}>
                          {hairStylist.first_name} {hairStylist.last_name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="selectHS"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleAppDataChange(e.target.value, 1)}
                    min={getCurrentDate()}
                  />
                </div>
                <div className="showHSDiv">
                  {listOfAppointment.length !== 0 ? (
                    listOfAppointment.map((app, index) => {
                      return <AppointmentElement key={index} app={app} />;
                    })
                  ) : (
                    <h4 className="appNotFound">Nema zakazanih termina</h4>
                  )}
                </div>
              </div>
            </div>
          )}
          {navPicture && (
            <div className="picturesDiv">
              <div className="postDiv" onClick={openAddPicModal}>
                <img
                  src={require(`../../images/addPicture.png`)}
                  className="postImage"
                />
              </div>
              {salon?.posts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          )}
          {navServices && (
            <div className="salonPageServicesDiv">
              {salon?.services.map((service, index) => (
                <ChangeService key={index} service={service} />
              ))}
            </div>
          )}
          {navInfo && (
            <div className="salonPageInfoDiv">
              <div className="salonPageInfoLeftDiv">
                <h4 className="infoLine salonPageInfoLine">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  {salon?.email}
                </h4>
                <h4 className="infoLine salonPageInfoLine">
                  <FontAwesomeIcon icon={faMapPin} className="icon" />
                  {salon?.location.street} {salon?.location.number},{" "}
                  {salon?.city}
                </h4>
                <h4 className="infoLine salonPageInfoLine">
                  <FontAwesomeIcon icon={faRestroom} className="icon" />
                  {salon?.type}
                </h4>
                <h4
                  className="infoLine salonPageInfoLine changePassSalonSpan"
                  onClick={openChangePassModal}
                >
                  <FontAwesomeIcon icon={faKey} className="icon" />
                  Promeni šifru
                </h4>
                <h4
                  className="infoLine salonPageInfoLine changePassSalonSpan"
                  onClick={openListHSModal}
                >
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  Lista frizera
                </h4>
                <h4
                  className="infoLine salonPageInfoLine changePassSalonSpan"
                  onClick={openAddHSModal}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="icon" />
                  Dodaj frizera
                </h4>
                <span className="styleMark badge salonPageMark">
                  {salon?.markInfo.mark.toFixed(1)}
                </span>
              </div>
              <div className="salonPageInfoRightDiv">
                <div className="workTimeLabelDiv">
                  <h3>Radno vreme</h3>
                </div>
                {salon?.workTime.map((time, index) => (
                  <div
                    className="workTimeSalonPageDiv"
                    key={index}
                    onClick={(e) => handleChangeWorkTime(index)}
                  >
                    <label>{days[index]}</label>
                    <label>{time}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
