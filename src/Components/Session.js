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
import "./Session.css";
import { InfinitySpin } from "react-loader-spinner";

function Session(props) {
  const searchParams = useSearchParams()[0];

  const [active, setActive] = useState(false);
  const [strength, setStrength] = useState();
  const [presentCount, setPresentCount] = useState(0);
  const sessionid = searchParams.get("sessionid");
  const sessionName = searchParams.get("session-name");
  const [absentStudents, setAbsentStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTotalStudents(data.data.students);
      let abs = data.data.students.filter((student) => {
        return !data.data.present.some((value) => value._id === student._id);
      });

      setAbsentStudents(abs);
      setLoading(false);
    };
    getPresent();
  }, [sessionid]);

  useEffect(() => {
    const socket = io.connect(BASE_URL);

    socket.on("connect", () => {
      socket.emit("join-room", sessionid);
      socket.on("attendance-count", (data) => {
        setPresentCount(data.count);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionid]);

  const handleActivate = async (e) => {
    await fetch(activateAttendanceURL(sessionid), options("GET"));

    setActive(true);
  };

  const handleDeactivate = async (e) => {
    const fetchdata = async () => {
      await fetch(deactivateAttendanceURL(sessionid), options("GET"));

      const resp = await fetch(
        getPresentStudentsURL(sessionid),
        options("GET")
      );
      const data = await resp.json();
      setPresentStudents(data.data.present);

      let abs = totalStudents.filter((student) => {
        return !data.data.present.some((value) => value._id === student._id);
      });

      setAbsentStudents(abs);

      setLoading(false);
    };
    fetchdata();
    setLoading(true);
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
      {loading ? (
        <div className="spinner-container">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : !active ? (
        <div id="present-students-list-container">
          <div className="m-3">
            <h3 className="ms-2 mt-3">Present Students</h3>
            <ul className="list-group list-group-flush list-group-numbered list-group-flush">
              {presentStudents.length !== 0 ? (
                presentStudents.map((student, index) => {
                  return (
                    <li
                      className="list-group-item p-3 bg-transparent color text-white"
                      key={index}
                    >
                      {student.name}
                    </li>
                  );
                })
              ) : (
                <p className="m-3">No one in here...</p>
              )}
            </ul>
          </div>
          <div className="m-3">
            <h3 className="ms-2 mt-3">Absent Students</h3>
            <ul className="list-group list-group-flush list-group-numbered list-group-flush">
              {absentStudents.length !== 0 ? (
                absentStudents.map((student, index) => {
                  return (
                    <li
                      className="list-group-item p-3 bg-transparent color text-white"
                      key={index}
                    >
                      {student.name}
                    </li>
                  );
                })
              ) : (
                <p className="m-3">No one in here...</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div id="progress-bar-container-super" className="mb-5">
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
