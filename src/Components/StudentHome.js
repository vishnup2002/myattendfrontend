import { startAuthentication } from "@simplewebauthn/browser";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  BASE_URL,
  getActiveClassroomsURL,
  getAuthStatusURL,
  handleAuthURL,
  verifyAuthURL,
} from "../Utils/constants";
import { options } from "../Utils/req";
import "./StudentHome.css";

function StudentHome(props) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(BASE_URL);

    socketRef.current.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login-signup-student");
    }

    const fetchactivesessions = async () => {
      const resp = await fetch(getActiveClassroomsURL, options("GET"));
      const data = await resp.json();
      setUserName(data.data.userName);
      setSessions(data.data.activeSessions);
      setLoading(false);
    };

    fetchactivesessions();
  }, [auth, navigate]);

  const handleAuth = async (sid) => {
    let resp = await fetch(handleAuthURL(sid), options("GET"));
    if (resp.status === 409) {
    } else {
      let data = await resp.json();

      let asseResp;
      try {
        asseResp = await startAuthentication(data.options);
      } catch (error) {
        console.log(error);
        throw error;
      }

      const verificationResp = await fetch(
        verifyAuthURL(sid),
        options("POST", JSON.stringify(asseResp))
      );

      const verificationJSON = await verificationResp.json();

      if (verificationJSON && verificationJSON.verified) {
        console.log(verificationJSON);
        const fetchactivesessions = async () => {
          const resp = await fetch(getActiveClassroomsURL, options("GET"));
          const data = await resp.json();

          setSessions(data.data.activeSessions);
          socketRef.current.emit("marked-attendance", {
            sid,
          });
        };
        fetchactivesessions();
      } else {
        console.log("error");
      }
    }
  };

  return (
    <div>
      <div className="dashboard">
        <h1 className="pe-5">{userName ? "Hi," + userName : "Hi,Student"}</h1>
      </div>
      <h2 className="ps-5">Active Sessions</h2>
      {loading ? (
        <div className="spinner-container">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <div id="classroom-list-container">
          {sessions.length === 0 ? (
            <p className="mt-5">Nothing here...</p>
          ) : (
            sessions.map((session, index) => {
              return (
                // <Link
                //   to={`/session?sessionid=${session._id}&session-name=${session.name}`}
                //   key={index}
                //   className="classroom-card"
                // >
                <div
                  className="card bg-transparent border border-primary m-2"
                  style={{ width: "18rem" }}
                  key={index}
                >
                  <div className="card-body">
                    <h5 className="card-title">{session.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {session.createdAt.slice(0, 10)}
                    </h6>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        const getAuthstatus = async (e) => {
                          const resp = await fetch(
                            getAuthStatusURL,
                            options("GET")
                          );
                          const data = await resp.json();
                          if (data.status === false) {
                            navigate("/student/register-auth");
                          } else {
                            handleAuth(session._id);
                          }
                        };

                        getAuthstatus(e);
                      }}
                    >
                      Mark Attendance
                    </Button>
                  </div>
                </div>
                // </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default StudentHome;
