
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Dashboard/Home";
import { Login } from "./Components/Login";
import { Tldashboard } from "./Dashboard/Tldashboard";
import { Userdashboard } from "./Dashboard/Userdashboard";
import Sidebar from "./Components/Sidebar";
import Sidebar2 from "./Components/Sidebar2";
import { Signup } from "./Components/Signup";
import { Userhome } from "./Dashboard/Userhome";

const App = () => {
  return (
    <div className="row px-0">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          <Route
            path="/Home"
            element={
              <div className="row">
                <div className="col-md-2 px-0 background">
                  <Sidebar />
                </div>
                <div className="col-md-10">
                  <Home />
                </div>
              </div>
            }
          />
           <Route
            path="/Tldashboard"
            element={
              <div className="row">
                <div className="col-md-2 px-0 background">
                  <Sidebar />
                </div>
                <div className="col-md-10">
                  <Tldashboard />
                </div>
              </div>
            }
          />
          <Route
            path="/Userdashboard"
            element={
              <div className="row">
                <div className="col-md-2 px-0 background">
                  <Sidebar2 />
                </div>
                <div className="col-md-10">
                  <Userdashboard />
                </div>
              </div>
            }
          />
           <Route
            path="/Userhome"
            element={
              <div className="row">
                <div className="col-md-2 px-0 background">
                  <Sidebar2 />
                </div>
                <div className="col-md-10">
                  <Userhome />
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
