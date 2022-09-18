import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  activateAttendanceURL,
  BASE_URL,
  deactivateAttendanceURL,
  getPresentStudentsURL,
} from "../Utils/constants";
import { options } from "../Utils/req";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./TeacherHome.css";

function Session(props) {
  const searchParams = useSearchParams()[0];

  const [active, setActive] = useState(false);
  const [strength, setStrength] = useState();
  const [presentCount, setPresentCount] = useState(0);
  const sessionid = searchParams.get("sessionid");
  const sessionName = searchParams.get("session-name");

  const [presentStudents, setPresentStudents] = useState([]);

  //socket.io

  useEffect(() => {
    const getPresent = async () => {
      const resp = await fetch(
        getPresentStudentsURL(sessionid),
        options("GET")
      );
      const data = await resp.json();
      setPresentStudents(data.data.present);
      setActive(data.data.sessionStatus);
      setStrength(data.data.classStrength);
    };
    getPresent();
  }, [sessionid]);

  useEffect(() => {
    const socket = io.connect(BASE_URL);

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("join-room", sessionid);
      socket.on("attendance-count", (data) => {
        console.log(data);
        setPresentCount(data.count);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionid]);

  const handleActivate = async (e) => {
    await fetch(activateAttendanceURL(sessionid), options("GET"));
    console.log("activated");
    setActive(true);
  };

  const handleDeactivate = async (e) => {
    await fetch(deactivateAttendanceURL(sessionid), options("GET"));
    console.log("deactivated");
    const resp = await fetch(getPresentStudentsURL(sessionid), options("GET"));
    const data = await resp.json();
    setPresentStudents(data.data.present);
    setActive(false);
  };
  return (
    <div>
      <div className="dashboard">
        <h1 className="pe-5">{sessionName ? sessionName : "Session"}</h1>

        {!active ? (
          <Button
            variant="success"
            onClick={(e) => {
              handleActivate(e);
            }}
          >
            Activate Attendance
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={(e) => {
              handleDeactivate(e);
            }}
          >
            Deactivate Attendance
          </Button>
        )}
      </div>
      {!active ? (
        <div id="present-students-list-container">
          <h3 className="ms-2 mt-3">Present Students</h3>
          <ul className="list-group list-group-flush list-group-numbered list-group-flush">
            {presentStudents.map((student, index) => {
              return (
                <li
                  className="list-group-item p-3 bg-transparent color text-white"
                  key={index}
                >
                  {student.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div id="progress-bar-container-super">
          <div id="progress-bar-container">
            <CircularProgressbar
              value={presentCount}
              maxValue={strength}
              text={`${presentCount}/${strength}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Session;
