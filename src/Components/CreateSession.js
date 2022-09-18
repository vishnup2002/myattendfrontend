import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateSessionURL } from "../Utils/constants";
import { options } from "../Utils/req";
import "./CreateClassroom.css";

function CreateSession(props) {
  const [sessionName, setSessionName] = useState("");
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const classid = searchParams.get("classid");
  const handleClick = async (e) => {
    const body = JSON.stringify({ name: sessionName, classID: classid });

    let resp = await fetch(CreateSessionURL, options("POST", body));

    let respJson = await resp.json();
    console.log(respJson);

    navigate(-1);
  };
  return (
    <div className="formContainer p-3">
      <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
        <h1>Enter the name of session</h1>
        <input
          className="text-white border-bottom mt-3"
          id="SessionName"
          name="SessionName"
          type="text"
          placeholder="Session Name"
          required
          onChange={(e) => {
            setSessionName(e.target.value);
          }}
        />

        <Button variant="success" className="mt-5 p-2" onClick={handleClick}>
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateSession;
