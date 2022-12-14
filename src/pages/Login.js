import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import Header from '../Components/Header'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  const [User, setUser] = useState(initialValues);

  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = User;

    const object = {
      username: username.trim(),
      password: password.trim(),
    };

    setFormErrors(validate(User));
    // add entity - POST
    // e.preventDefault();
    // creates entity

    if (username.trim() === "" || password.trim() === "") {
      return;
    } else {
      fetch("http://localhost:5000/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(object, { username, password }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json(console.log(response)))
        .then((json) => {
          setData({
            User: json,
          });
          if (json.message === "successfully login") {
            localStorage.setItem("token", json.token);
            setIsLoggedin(true);

            navigate("/AccountSetting");
          }

          console.log(json);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsSubmit(true);
    }
  };

  useEffect(() => {
    const res = data?.User?.message;
    setMessage(res);
  }, [data]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(User);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "!'Please Enter Your Email / Username'";
    } // else if(!regex.test(values.username)) {
    // 	errors.username = "!'This is not Email Format'"
    // }

    if (!values.password) {
      errors.password = "!'Please Enter Your Password'";
    }

    return errors;
  };

  return (
    <div>
      {/* <Header /> */}
      <section className="reg_sec">
        <div className="container">
          <div className="row justify-content-center">
            <form method="POST" className="login-form" onSubmit={handleSubmit}>
              <label className="reg-lbl"> Username or E-mail </label>
              <input
                type="text"
                autoComplete="username"
                id="fname"
                name="username"
                placeholder="Name"
                onChange={handleChange}
                className="text_set"
              />
              <p style={{ color: "red" }}>{formErrors.username}</p>

              <label className="reg-lbl">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                className="ct_text-set1"
              />
              <p style={{ color: "red" }}>{formErrors.password}</p>

              <button
                type="submit"
                className="reg_btn-1 d-flex justify-content-center m-0 mt-4 m-auto"
              >
                Login
              </button>
              <br />

              {Object.keys(formErrors, message).length === 0 && isSubmit ? (
                <h3 className="Success text-center">{message}</h3>
              ) : (
                ""
              )}

              <p className="text-center m-0 fs-6 mb-1">
                <span>Not a member?</span>
                <Link to="/register" className="signup">
                  SignUp!
                </Link>
              </p>

              <p className="text-center m-0 fs-6">
                <Link className="forgot_p p-0" to="/forgot">
                  Forget Password?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
