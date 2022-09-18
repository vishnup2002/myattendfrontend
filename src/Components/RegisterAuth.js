import { startRegistration } from "@simplewebauthn/browser";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegURL, verifyRegURL } from "../Utils/constants";
import { options } from "../Utils/req";

function RegisterAuth(props) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const handleReg = async () => {
        let resp = await fetch(handleRegURL, options("GET"));
        let data = await resp.json();

        let attResp;

        try {
          attResp = await startRegistration(data.options);
        } catch (error) {
          if (error.name === "InvalidStateError") {
            console.log(
              "Error: Authenticator was probably already registered by user"
            );
          } else {
            console.log(error);
          }
          throw error;
        }

        const verificationResp = await fetch(
          verifyRegURL,
          options("POST", JSON.stringify(attResp))
        );

        await verificationResp.json();
        setAuth(true);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      };
      handleReg();
    }, 2000);
  }, [navigate]);

  return (
    <div>
      {!auth ? (
        <div>
          <h1 style={{ textAlign: "center" }} className="mt-5">
            Register authentication
          </h1>
          <p className="m-5">
            Please wait
            <br />
            <br />
            Caution!!
            <br />
            Once registered you cannot change..
          </p>
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }} className="mt-5">
            Registration Complete!!
          </h1>
        </div>
      )}
    </div>
  );
}

export default RegisterAuth;
