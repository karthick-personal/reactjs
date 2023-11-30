import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";

export const Userdashboard = () => {
  const [users, setUsers] = useState([]);
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/ticket")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [forceUpdateFlag]); 

  const handleStatusChange = (e, ticketId) => {
    const newStatus = e.target.value;
    const newDate = e.target.value;
    const newTime1 = document.getElementById(`starttime_${ticketId}`).value;
    const newTime2 = document.getElementById(`endtime_${ticketId}`).value;

    axios
      .put(`http://localhost:5000/ticket/${ticketId}`, {
        status: newStatus,
        date: newDate,
        starttime: newTime1,
        endtime: newTime2,
      })
      .then((response) => {
        console.log("Status updated successfully");
        setForceUpdateFlag((prevFlag) => !prevFlag);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 px-2" key={user._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Project: {user.comments}</h5>
                <h6 className="card-subtitle mb-2 ">
                  Task Details: {user.name}
                </h6>
                <p className="card-text">
                </p>

                <div className="card-subtitle mb-2 text-muted">
                  Priority: {user.priority}
                </div>
                <div>Date: {user.date}</div>

                <div className="input-group">
                  <input
                    type="time"
                    name="starttime"
                    className="form-control input"
                    id={`starttime_${user._id}`}
                    placeholder="Enter your time"
                    value={user.starttime || ""}
                    onChange={(e) => handleStatusChange(e, user._id)}
                  />
                </div>
                <div>
                  End Time:
                  <input
                    type="time"
                    name="endtime"
                    className="form-control input"
                    id={`endtime_${user._id}`}
                    placeholder="Enter your time"
                    value={user.endtime || ""}
                    onChange={(e) => handleStatusChange(e, user._id)}
                  />
                </div>
                <b>Status:</b>
                <select
                  className="form-select"
                  value={user.status}
                  onChange={(e) => handleStatusChange(e, user._id)}
                >
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="toDo">toDo</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
