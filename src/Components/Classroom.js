import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getSessionURL } from "../Utils/constants";
import { options } from "../Utils/req";
import "./Classroom.css";

function Classroom() {
  const auth = useSelector((state) => state.auth);
  const [sessions, setSessions] = useState([]);
  const [classname, setClassname] = useState("Classroom");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const classid = searchParams.get("classid");

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login-signup-teacher");
    }
    const fetchSessions = async () => {
      const resp = await fetch(getSessionURL(classid), options("GET"));
      const data = await resp.json();
      setSessions(data.data.sessions);
      setClassname(data.data.className);
      setLoading(false);
    };

    fetchSessions();
  }, [auth, navigate, classid]);

  return (
    <div>
      <div className="dashboard">
        <h1 className="pe-5">{classname}</h1>
        <Link to={`/session/create-session?classid=${classid}`}>
          <Button variant="success">Create session</Button>
        </Link>
      </div>
      {loading ? (
        <div className="spinner-container">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <div id="classroom-list-container">
          {sessions.length !== 0 ? (
            sessions.map((session, index) => {
              return (
                <Link
                  to={`/session?sessionid=${session._id}&session-name=${session.name}`}
                  key={index}
                  className="classroom-card"
                >
                  <div
                    className="card bg-transparent border border-primary m-2"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{session.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {session.createdAt.slice(0, 10)}
                      </h6>
                      <p className="card-text">
                        {"Attended : " + session.present.length}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="mt-5">Nothing here...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Classroom;
