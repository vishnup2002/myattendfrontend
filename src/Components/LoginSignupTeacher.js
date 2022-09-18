import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setUser } from "../Features/AuthSlice";
import { RegisterTeacherURL, SignInTeacherURL } from "../Utils/constants";
import "./LoginSignup.css";

function Form({ option, setStatus }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/" + auth.user);
    }
  }, [auth, navigate]);

  const dispatch = useDispatch();

  const options = (method = "GET", body) => {
    return {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body,
    };
  };

  async function handleSubmit() {
    if (option === 1) {
      const body = JSON.stringify({
        email,
        password,
      });

      let resp = await fetch(SignInTeacherURL, options("POST", body));
      let respJson = await resp.json();
      if (resp.status === 422) {
        setStatus(respJson.message);
      } else {
        localStorage.setItem("token", respJson.data.token);
        console.log("set in local storage");
        dispatch(login());
        dispatch(setUser("teacher"));
        navigate("/teacher");
      }
    } else if (option === 2) {
      const body = JSON.stringify({
        email,
        password,
        name,
      });
      let resp = await fetch(RegisterTeacherURL, options("POST", body));
      let respJson = await resp.json();

      if (resp.status === 409) {
        setStatus(respJson.message);
      } else {
        localStorage.setItem("token", respJson.data.token);
        console.log("set in local storage");
        dispatch(login());
        dispatch(setUser("teacher"));
        navigate("/teacher");
      }
    } else if (option === 3) {
    }
  }

  return (
    <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
      <div
        className={
          "account-form-fields " +
          (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
        }
      >
        <input
          className="text-white border-bottom border-success"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="text-white border-bottom border-success"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required={option === 1 || option === 2 ? true : false}
          disabled={option === 3 ? true : false}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="text-white border-bottom border-success"
          id="repeat-password"
          name="repeat-password"
          type="password"
          placeholder="Repeat password"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button
        className="btn-submit-form mt-4"
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
      >
        {option === 1 ? "Sign in" : option === 2 ? "Sign up" : "Reset password"}
      </button>
    </form>
  );
}

function LoginSignupTeacher() {
  const [option, setOption] = React.useState(1);
  const [status, setStatus] = React.useState("");

  return (
    <div className="container">
      <header>
        <div
          className={
            "header-headings " +
            (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
          }
        >
          <span>Sign in as Teacher</span>
          <span>Create an account</span>
          <span>Reset your password</span>
        </div>
      </header>
      <ul className="options">
        <li
          className={option === 1 ? "active" : ""}
          onClick={() => setOption(1)}
        >
          Sign in
        </li>
        <li
          className={option === 2 ? "active" : ""}
          onClick={() => setOption(2)}
        >
          Sign up
        </li>
        <li
          className={option === 3 ? "active" : ""}
          onClick={() => setOption(3)}
        >
          Forgot
        </li>
      </ul>
      <Form option={option} setStatus={setStatus} />
      <footer>
        <p>{status}</p>
        <Link to="/login-signup-student">Instead login/Signup as student</Link>
      </footer>
    </div>
  );
}

export default LoginSignupTeacher;
