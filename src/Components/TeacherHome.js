import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TeacherHome(props) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login-signup-teacher");
    }
  });

  return (
    <div>
      <h1>Hi,Teacher</h1>
    </div>
  );
}

export default TeacherHome;
