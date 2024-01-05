import { useState } from "react";
import "./Salon2Page.css";

const getTimeFrom = (time: string | undefined) => {
  return time?.split(" - ")[0];
};

const getTimeTo = (time: string | undefined) => {
  return time?.split(" - ")[1];
};

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

export default function WorkTimeCard(info: {
  time: string | undefined;
  index: number;
  onSubmit: (newTime: string) => void;
}) {
  const [fromTime, setFromTime] = useState(getTimeFrom(info.time));
  const [toTime, setToTime] = useState(getTimeTo(info.time));

  const handleSubmit = () => {
    const newTime =
      fromTime !== "Ne radi" ? `${fromTime} - ${toTime}` : "Ne radi";
    info.onSubmit(newTime);
  };

  return (
    <>
      <div className="workTimeChangeSalonPageGlobalDiv">
        <h3 className="dayChangeTimeSalonPageLabel">{days[info.index]}</h3>
        <div className="workTimeChangeSalonPageDiv">
          <div className="fromTimeChangeSalonPageDiv">
            <h5 className="workTimeLabel">Od</h5>
            <select
              className="selectTime"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
            >
              {timeFrom.map((time, index) => (
                <option>{time}</option>
              ))}
            </select>
          </div>
          {fromTime !== "Ne radi" && (
            <div className="toTimeChangeSalonPageDiv">
              <h5>Do</h5>
              <select
                className="selectTime"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              >
                {timeTo.map((time, index) => (
                  <option>{time}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          className="btn btn-primary btnChangePasswordSalon"
          onClick={handleSubmit}
        >
          Izmeni
        </button>
      </div>
    </>
  );
}
