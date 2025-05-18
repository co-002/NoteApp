import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res.success) {
      setFormData({
        email: "",
        password: ""
      })
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={submitHandler}>
        <h2 className="heading-text">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="signup-text">
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
