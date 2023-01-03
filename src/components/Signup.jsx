import React, { useState } from "react";
import SocialSignin from "./SocialSignin";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [erorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!(userDetails.name || userDetails.email || userDetails.password)) {
      setErrorMessage("All fields Are Required.");
      return;
    } else {
      setErrorMessage("");
    }
    console.log(userDetails);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      await updateProfile(user, {
        displayName: userDetails.name,
      });
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2 className="mt-5 text-center">Firebase Auth</h2>
      <h3 className=" text-center">Signup</h3>

      <form className="container">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <b className=" text-danger">{erorMessage}</b> <br />
        <button onClick={(e) => submitHandler(e)} className="btn btn-success">
          Signup
        </button>
        <div className="mb-3">
          <span>Already have an account ? </span>{" "}
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </form>

      <SocialSignin />
    </div>
  );
};

export default Signup;
