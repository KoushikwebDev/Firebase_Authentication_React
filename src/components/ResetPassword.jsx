import { updatePassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmNewPassword) {
      setErrorMessage("Password Not Matched");
      return;
    }
    if (!(password.newPassword || password.confirmNewPassword)) {
      setErrorMessage("Please Enter Your New Passsword");
      return;
    }
    setErrorMessage("");

    try {
      const user = auth.currentUser;
      console.log(user);
      await updatePassword(user, password.newPassword);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="container p-3 my-5 border">
        <h2 className="text-center"> Reset your password </h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your new password :
            </label>
            <input
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              required
              type="password"
              name="password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm your new password :
            </label>
            <input
              value={password.confirmNewPassword}
              onChange={(e) =>
                setPassword((prev) => ({
                  ...prev,
                  confirmNewPassword: e.target.value,
                }))
              }
              required
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <b className=" text-danger">{errorMessage}</b> <br />
          <button
            onClick={(e) => changePassword(e)}
            className="btn btn-success mt-2"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
