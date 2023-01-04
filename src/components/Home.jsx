import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import { signOut, sendEmailVerification } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const btnRef = useRef(null);

  const fetchData = async () => {
    auth.onAuthStateChanged((user) => {
      setuser(user);

      if (!user) {
        navigate("/login");
        return;
      }
      // console.log(user.emailVerified);
      if (user.emailVerified) {
        setIsEmailSend(true);
        btnRef.current.style.backgroundColor = "#828079";
        btnRef.current.style.color = "#b3a998";
      }
      // console.log(user);
    });
  };
  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      let user = auth.currentUser;
      let res = await sendEmailVerification(user);
      console.log(user, res);
      setIsEmailSend(true);
      btnRef.current.style.backgroundColor = "#828079";
      btnRef.current.style.color = "#b3a998";
      alert(
        "Verifiaction mail send, if Not in primary mail box, check in spam"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const signout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      alert("Signout Successfull.");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container border mt-5 p-3">
      <h3 className="text-center"> Firebase Auth </h3>
      <h4 className="text-center">Home</h4>
      <h6 className="d-flex justify-content-end">
        Welcome,{user?.displayName}
      </h6>
      <div className="d-flex justify-content-end align-items-center">
        <button onClick={(e) => signout(e)} className="btn btn-danger mx-1">
          Logout
        </button>
        <button
          onClick={() => navigate("/resetpassword")}
          className="btn btn-primary mx-1"
        >
          Change Password
        </button>
      </div>

      <div className="my-3">
        <h6>UID : {user.uid}</h6>
        <h6>Name : {user.displayName}</h6>
        <h6>Email : {user.email} </h6>
        <h6>Email Verified : {user.emailVerified ? "Yes" : "No"} </h6>
        <h6>Phone : {user.phoneNumber ? "" : "Null"}</h6>
        <h6>Auth Method : {user.providerId}</h6>

        {/* <h6>Registered on : {user.metadata.creationTime}</h6> */}
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <button
          onClick={(e) => verifyEmail(e)}
          className="btn btn-primary"
          disabled={isEmailSend}
          ref={btnRef}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default Home;
