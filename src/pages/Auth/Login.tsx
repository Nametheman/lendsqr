import { useState } from "react";
import "./Login.scss";
import logo from "@/assets/images/logo.svg";
import login from "@/assets/images/auth.svg";
import { useNavigate } from "react-router-dom";
import DUMMYDATA from "@/data/DUMMYDATA";
import { useFormik } from "formik";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  let timeOut = 2000;
  const handleFormSubmit = (values: { email: string; password: string }) => {
    setLoading(true);

    if (
      values.email === "seetest@lendsqr.com" &&
      values.password === "Emmanuel123"
    ) {
      setTimeout(() => {
        localStorage.setItem("usersData", JSON.stringify(DUMMYDATA));
        navigate("/dashboard/customers/users");
        setLoading(false);
      }, timeOut);
    } else {
      setTimeout(() => {
        alert("Invalid Credentials: Check documentation for credentials");
        setLoading(false);
      }, timeOut);
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const validate = (values: typeof initialValues) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validate,
    onSubmit: handleFormSubmit,
  });
  return (
    <main className="pageContainer">
      <img src={logo} alt="" />

      <div className="loginPage">
        <img src={login} alt="" />
        <div className="formContainer">
          <h2>Welcome!</h2>
          <p className="formDetails">Enter details to login.</p>
          <form action="#" onSubmit={handleSubmit}>
            <div className="inputsContainer">
              <input
                type="email"
                name="email"
                id="email"
                className="inputField"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              <p className="error">{errors.email}</p>
              <div className="passwordContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
                <p className="Passworderror">{errors.password}</p>
              </div>
            </div>
            <p className="forgotPassword">FORGOT PASSWORD?</p>
            <button type="submit" className="submitBtn">
              {loading ? (
                <TailSpin
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  wrapperClass=""
                />
              ) : (
                "LOG IN"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
