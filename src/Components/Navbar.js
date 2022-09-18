import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { delUser, logout } from "../Features/AuthSlice";

function Navbar(props) {
  const auth = useSelector((state) => state.auth);
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
      <div>
        <Link className="brandLogo link fs-5" to="/">
          MyAttend
        </Link>
        {auth.isLoggedIn && (
          <Link to={`/${auth.user}`} className="brandLogo link fs-6 ms-3">
            Home
          </Link>
        )}
      </div>

      {auth.isLoggedIn ? (
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
