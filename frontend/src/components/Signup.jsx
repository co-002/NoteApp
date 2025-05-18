import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.success) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={submitHandler}>
        <h2 className="heading-text">Signup</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            className="form-control"
            placeholder="Enter name"
          />
        </div>

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
          Submit
        </button>

        <p className="signup-text">
          Alrady have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
