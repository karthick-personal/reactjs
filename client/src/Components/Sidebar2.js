
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar2 = () => {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center text-center px-3 pt-2 text-white min-vh-100">
       <li className="nav-item list-unstyled">
          <p to="/" className="nav-p align-middle px-0">
            <i className="fs-4 bi-house"></i> User Dashboard
          </p>
        </li>
      <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        <li className="nav-item">
          <Link to="/Userdashboard" className="nav-link align-middle px-0">
            <i className="fs-4 bi-house"></i> User Home
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/Tldashboard" className="nav-link align-middle px-0">
            <i className="fs-4 bi-house"></i> Create Task
          </Link>
        </li> */}
      </ul>
      <hr />
      <div className="dropdown pb-4">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
          <span className="d-none d-sm-inline mx-1">Logout</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              {/* Profile */}
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleSignOut}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar2;
