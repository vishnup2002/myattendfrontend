import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";

import LoginSignupStudent from "./LoginSignupStudent";
import LoginSignupTeacher from "./LoginSignupTeacher";
import StudentHome from "./StudentHome";

import TeacherHome from "./TeacherHome";

function App() {
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
          <Route path="/teacher" element={<TeacherHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
