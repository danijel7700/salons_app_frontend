import { useEffect, useState } from "react";
import { Salon } from "../../entities/entities";
import HomePageNavbar from "../HomePageNavbar";
import "./SalonPage.css";
import axios from "axios";
import Modal from "react-modal";
import AddHairsylistCard from "./AddHairsylist";
import AppointmentElement from "./AppointmentElement";
import AddServiceCard from "./AddServiceCard";
import AddPictureCard from "./AddPicture";
import ChangeService from "./ChangeService";
import PostCard from "../SalonCard/PostCard";

Modal.setAppElement(document.body);

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

export default function () {
  const [isAddHSModalOpen, setIsAddHSModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isAddPicModalOpen, setIsAddPicModalOpen] = useState(false);
  const [salon, setSalon] = useState<Salon>();
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedHairstylist, setSelectedHairstylist] = useState("");
  const [listOfAppointment, setListOfAppointment] = useState([]);
  const [isChangeHSModalOpen, setIsChangeHSModalOpen] = useState(false);
  const [isChangeServiceModalOpen, setIsChangeServiceModalOpen] =
    useState(false);
  const [isChangePicModalOpen, setIsChangePicModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const openAddHSModal = async () => {
    document.body.style.overflow = "hidden";
    setIsAddHSModalOpen(true);
  };

  const closeAddHSModal = () => {
    document.body.style.overflow = "auto";
    setIsAddHSModalOpen(false);
    setFlag(!flag);
  };

  const openAddServiceModal = async () => {
    document.body.style.overflow = "hidden";
    setIsAddServiceModalOpen(true);
  };

  const closeAddServiceModal = () => {
    document.body.style.overflow = "auto";
    setIsAddServiceModalOpen(false);
    setFlag(!flag);
  };

  const openAddPicModal = async () => {
    document.body.style.overflow = "hidden";
    setIsAddPicModalOpen(true);
  };

  const closeAddPicModal = () => {
    document.body.style.overflow = "auto";
    setIsAddPicModalOpen(false);
    setFlag(!flag);
  };

  const openChangeHSModal = async () => {
    document.body.style.overflow = "hidden";
    setIsChangeHSModalOpen(true);
  };

  const closeChangeHSModal = () => {
    document.body.style.overflow = "auto";
    setIsChangeHSModalOpen(false);
    setFlag(!flag);
  };

  const openChangeServiceModal = async () => {
    document.body.style.overflow = "hidden";
    setIsChangeServiceModalOpen(true);
  };

  const closeChangeServiceModal = () => {
    document.body.style.overflow = "auto";
    setIsChangeServiceModalOpen(false);
    setFlag(!flag);
  };

  const openChangePicModal = async () => {
    document.body.style.overflow = "hidden";
    setIsChangePicModalOpen(true);
  };

  const closeChangePicModal = () => {
    document.body.style.overflow = "auto";
    setIsChangePicModalOpen(false);
    setFlag(!flag);
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
        closeChangeHSModal();
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
      <HomePageNavbar />
      <Modal
        isOpen={isAddHSModalOpen}
        onRequestClose={closeAddHSModal}
        className="custom-modal addUserModal"
        overlayClassName="custom-modal-overlay"
      >
        {/* <AddHairsylistCard /> */}
      </Modal>
      <Modal
        isOpen={isAddServiceModalOpen}
        onRequestClose={closeAddServiceModal}
        className="custom-modal addServiceModal"
        overlayClassName="custom-modal-overlay"
      >
        <AddServiceCard />
      </Modal>
      <Modal
        isOpen={isAddPicModalOpen}
        onRequestClose={closeAddPicModal}
        className="custom-modal addUserModal"
        overlayClassName="custom-modal-overlay"
      >
        {/* <AddPictureCard /> */}
      </Modal>
      <Modal
        isOpen={isChangeHSModalOpen}
        onRequestClose={closeChangeHSModal}
        className="custom-modal changeHSModal"
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
        isOpen={isChangeServiceModalOpen}
        onRequestClose={closeChangeServiceModal}
        className="custom-modal changeServiceModal"
        overlayClassName="custom-modal-overlay"
      >
        {salon?.services.map((service, index) => (
          <ChangeService key={index} service={service} />
        ))}
      </Modal>
      <Modal
        isOpen={isChangePicModalOpen}
        onRequestClose={closeChangePicModal}
        className="custom-modal showPicModal"
        overlayClassName="custom-modal-overlay"
      >
        {salon?.posts.map((p) => (
          <PostCard post={p} />
        ))}
      </Modal>

      <div className="mainDiv">
        <div className="headerDiv">
          <h1>{salon?.name}</h1>
        </div>
        <div className="contentDiv">
          <div className="leftContentDiv">
            <div className="partsDiv">
              <div className="partDiv">
                <button className="btnSalon" onClick={openAddHSModal}>
                  Dodaj frizera
                </button>
                <button className="btnSalon" onClick={openChangeHSModal}>
                  Izmeni frizere
                </button>
              </div>
              <div className="partDiv">
                <button className="btnSalon" onClick={openAddServiceModal}>
                  Dodaj uslugu
                </button>
                <button className="btnSalon" onClick={openChangeServiceModal}>
                  Izmeni usluge
                </button>
              </div>
              <div className="partDiv">
                <button className="btnSalon " onClick={openAddPicModal}>
                  Dodaj sliku
                </button>
                <button className="btnSalon" onClick={openChangePicModal}>
                  Prikazi slike
                </button>
              </div>
            </div>
          </div>

          <div className="rightContentDiv">
            <div>
              <h5>Zakazani termini kod</h5>
            </div>
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
                  <h4>Nema zakazanih termina</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
