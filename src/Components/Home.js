import React from "react";
import Typer from "./Typer";
import "./home.css";

function Home(props) {
  return (
    <div className="home-container">
      <div className="desc">
        <Typer heading="MyAttend:" dataText={["Simple", "Secure", "Swift"]} />
      </div>
      <div className="image-container">
        <img
          src={require("../Statics/images/classroom.png")}
          alt="classroom"
          className="classroom"
        />
      </div>
    </div>
  );
}

export default Home;
