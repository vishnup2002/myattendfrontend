import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getClassroomURL } from "../Utils/constants";
import { options } from "../Utils/req";
import "./TeacherHome.css";

function TeacherHome(props) {
  const auth = useSelector((state) => state.auth);
  const [classrooms, setClassrooms] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login-signup-teacher");
    }
    const fetchClassrooms = async () => {
      const resp = await fetch(getClassroomURL, options("GET"));
      const data = await resp.json();
      setClassrooms(data.data.classrooms);
      setUserName(data.data.userName);
      setLoading(false);
    };

    fetchClassrooms();
  }, [auth, navigate]);

  return (
    <div>
      <div className="dashboard">
        <h1 className="pe-5">{userName ? "Hi," + userName : "Hi,Teacher"}</h1>
        <Link to="/teacher/create-classroom">
          <Button variant="success">Create classroom</Button>
        </Link>
      </div>
      {loading ? (
        <div className="spinner-container">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <div id="classroom-list-container">
          {classrooms.length !== 0 ? (
            classrooms.map((classroom, index) => {
              return (
                <div key={index} className="classroom-card">
                  <div
                    className="card bg-transparent border border-primary m-2"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <Link to={`/classroom?classid=${classroom._id}`}>
                        <h5 className="card-title">{classroom.name}</h5>
                      </Link>

                      <h6 className="card-subtitle mb-2 text-muted">
                        {classroom.teacher.name}
                      </h6>
                      <p className="card-text">
                        {"Students : " + classroom.Students.length}
                      </p>
                      {navigator.clipboard ? (
                        <Button
                          variant="outline-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(
                              `${window.location.origin.toString()}/student/join?classid=${
                                classroom._id
                              }`
                            );
                            e.target.innerText = "Copied to clipboard";
                            e.target.className = "btn btn-outline-success";
                            setTimeout(() => {
                              e.target.innerText = "Copy joining link";
                              e.target.className = "btn btn-outline-primary";
                              e.target.blur();
                            }, 2000);
                          }}
                        >
                          Copy joining link
                        </Button>
                      ) : (
                        <p>{`${window.location.origin.toString()}/student/join?classid=${
                          classroom._id
                        }`}</p>
                      )}
                    </div>
                  </div>
                </div>
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

export default TeacherHome;
