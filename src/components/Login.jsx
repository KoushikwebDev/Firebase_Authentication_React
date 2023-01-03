import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import SocialSignin from "./SocialSignin";

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
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
      const { user } = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2 className="mt-5 text-center">Firebase Auth</h2>
      <h3 className=" text-center">Login</h3>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            name="password"
            required
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <b className=" text-danger">{erorMessage}</b> <br />
        <button
          onClick={(e) => submitHandler(e)}
          type="submit"
          className="btn btn-success"
        >
          Login
        </button>
        <div className="mb-3">
          <span>First time here ? </span>
          <Link to="/signup">
            <button className="btn btn-primary mx-1">Signup</button>
          </Link>
        </div>
        <div>
          <span>Forget password ? </span>
          <Link>
            <button className="btn btn-danger mx-1">Forget Password</button>
          </Link>
        </div>
      </form>
      <SocialSignin />
    </div>
  );
};

export default Login;
