import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";

import LoginSignupStudent from "./LoginSignupStudent";
import LoginSignupTeacher from "./LoginSignupTeacher";
import StudentHome from "./StudentHome";

import TeacherHome from "./TeacherHome";
import CreateClassroom from "./CreateClassroom";
import Classroom from "./Classroom";
import CreateSession from "./CreateSession";
import Session from "./Session";
import JoinClassroom from "./JoinClassroom";
import RegisterAuth from "./RegisterAuth";
import { useEffect } from "react";
import { checkAuthenticatedURL } from "../Utils/constants";
import { options } from "../Utils/req";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const checkAuth = async (user) => {
      const resp = await fetch(checkAuthenticatedURL(user), options("GET"));
      if (resp.status === 401) {
        window.alert("Seems like session expired... Logout and login again");
      }
    };
    if (auth.isLoggedIn) {
      checkAuth(auth.user);
    }
  }, [auth]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login-signup-student"
            element={<LoginSignupStudent />}
          />
          <Route
            path="/login-signup-teacher"
            element={<LoginSignupTeacher />}
          />
          <Route path="/student" element={<StudentHome />} />
          <Route path="/student/join" element={<JoinClassroom />} />
          <Route path="/student/register-auth" element={<RegisterAuth />} />

          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/classroom" element={<Classroom />} />

          <Route
            path="/teacher/create-classroom"
            element={<CreateClassroom />}
          />

          <Route path="/session" element={<Session />} />

          <Route path="/session/create-session" element={<CreateSession />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
