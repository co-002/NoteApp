import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid p-0">
          <a className="navbar-brand" href="/">
            NoteApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {isLoggedIn ? (
                  ""
                ) : (
                  <div className="d-flex ">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                    <Link to={"/signup"} className="nav-link">
                      Signup
                    </Link>
                  </div>
                )}
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="nav-link"
                  >
                    Logout
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
