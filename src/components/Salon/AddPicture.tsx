import { useState } from "react";
import "./SalonPage.css";
import axios from "axios";
import { getLineAndCharacterOfPosition } from "typescript";

export default function AddPictureCard({
  onToggleFlag,
}: {
  onToggleFlag: () => void;
}) {
  const [picture, setPicture] = useState<File | null>();

  const addPictureHandler = () => {
    const salonToken = localStorage.getItem("api_token_salon");

    const token = "Bearer " + salonToken;

    if (picture) {
      const formData = new FormData();
      formData.append("files", picture);
      onToggleFlag();

      axios
        .post("http://localhost:3000/salons/add-images", formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          return alert(res.data);
          onToggleFlag();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Nema slike za otpremu.");
    }
  };

  const handleAddPicture = (e: { target: { files: any[] } }) => {
    console.log(e.target.files[0]);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setPicture(file);
  };

  return (
    <>
      <div className="mainAddHSDiv">
        <h2 className="addHairSH">Dodaj sliku</h2>
        <div className="addUserBodyDiv">
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Slika
            </label>
            <input
              type="file"
              className="form-control"
              id="picture"
              accept="image/*"
              onChange={handleFileInput}
              required
            />
          </div>

          <button
            className="btn btn-primary addUserBtn"
            onClick={addPictureHandler}
          >
            Dodaj sliku
          </button>
        </div>
      </div>
    </>
  );
}
