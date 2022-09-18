import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { joinClassroomURL } from "../Utils/constants";
import { options } from "../Utils/req";

function JoinClassroom(props) {
  const [status, setStatus] = useState("Joining...");
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const classid = searchParams.get("classid");
  useEffect(() => {
    if (!auth.isLoggedIn && auth.user !== "student") {
      navigate("/login-signup-student");
    }

    const joinClass = async () => {
      let resp = await fetch(joinClassroomURL(classid), options("GET"));
      let data = await resp.json();
      setStatus(data.message);
    };

    joinClass();
  }, [auth, navigate, classid]);
  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="mt-5">
        {status}
      </h1>
    </div>
  );
}

export default JoinClassroom;
