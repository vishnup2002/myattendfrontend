import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function StudentHome(props) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login-signup-student");
    }
  });

  return (
    <div>
      <h1>Hi,Student</h1>
    </div>
  );
}

export default StudentHome;
