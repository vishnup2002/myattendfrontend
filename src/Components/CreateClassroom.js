import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CreateClassRoomURL } from "../Utils/constants";
import { options } from "../Utils/req";
import "./CreateClassroom.css";

function CreateClassroom(props) {
  const [classname, setClassName] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    const body = JSON.stringify({ name: classname });

    let resp = await fetch(CreateClassRoomURL, options("POST", body));

    let respJson = await resp.json();
    console.log(respJson);

    navigate(-1);
  };
  return (
    <div className="formContainer p-3">
      <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
        <h1>Enter the name of your class</h1>
        <input
          className="text-white border-bottom mt-3"
          id="ClassName"
          name="ClassName"
          type="text"
          placeholder="Class Name"
          required
          onChange={(e) => {
            setClassName(e.target.value);
          }}
        />

        <Button variant="success" className="mt-5 p-2" onClick={handleClick}>
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateClassroom;
