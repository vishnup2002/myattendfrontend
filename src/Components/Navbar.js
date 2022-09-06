import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { delUser, logout } from "../Features/AuthSlice";

function Navbar(props) {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(delUser());
    navigate("/login-signup-student");
  };

  return (
    <div className="navbar px-2">
      <Link className="brandLogo link" to="/">
        MyAttend
      </Link>
      {auth ? (
        <Button variant="outline-primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Link className="loginSignup link" to="/login-signup-student">
          <Button variant="outline-primary">Login/Signup</Button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
