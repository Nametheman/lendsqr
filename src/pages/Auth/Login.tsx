import React, { useState } from "react";
import "./Login.scss";
import logo from "@/assets/images/logo.svg";
import login from "@/assets/images/auth.svg";
import { useNavigate } from "react-router-dom";
import DUMMYDATA from "@/data/DUMMYDATA";
import { usePagination } from "@/store/usePagination";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setData } = usePagination();

  let timeOut = 2000;
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setData(DUMMYDATA);
      localStorage.setItem("usersData", JSON.stringify(DUMMYDATA));
      navigate("/dashboard/customers/users");
      setLoading(false);
    }, timeOut);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <main className="pageContainer">
      <img src={logo} alt="" />

      <div className="loginPage">
        <img src={login} alt="" />
        <div className="formContainer">
          <h2>Welcome!</h2>
          <p className="formDetails">Enter details to login.</p>
          <form action="#" onSubmit={handleFormSubmit}>
            <div className="inputsContainer">
              <input
                type="email"
                name="email"
                id="email"
                className="inputField"
                placeholder="Email"
              />
              <div className="passwordContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            <p className="forgotPassword">FORGOT PASSWORD?</p>
            <button type="submit" className="submitBtn">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
