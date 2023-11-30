import React, { useState, useEffect } from "react";
import axios from "axios";
import optionsArray from '../optionsData';
import DatePicker from 'react-datepicker';
import { Form } from 'react-bootstrap';

export const Home = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDes, setSelectedDes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/ticket")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSelectChange = (e) => {
    const selectedEmail = e.target.value;
    const selectedOption = users.find(
      (user) => user.projects === selectedEmail
    );

    if (selectedOption) {
      setSelectedName(selectedOption.name);
      setSelectedEmail(selectedEmail);
      setSelectedStatus(selectedOption.status);
      setSelectedPriority(selectedOption.priority);
      setSelectedDes(selectedOption.comments);
      setSelectedDate(selectedOption.date);
      setSelectedStartTime(selectedOption.starttime);
      setSelectedEndTime(selectedOption.endtime);
      console.log("Selected Email:", selectedEmail);
      console.log("Selected Name:", selectedName);
      console.log("Selected Status:", selectedOption.status);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const getPriorityForSelectedUser = () => {
    if (selectedEmail) {
      const userTicket = data.find(item => item.projects === selectedEmail);
      if (userTicket) {
        return <h6 className="card-subtitle mb-2 text-muted">Priority: {userTicket.priority}</h6>;
      }
    }
    return null;
  };
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-sm">
            <div className="card pb-3">
              <div className="card-header">Featured</div>
              <div className="card-body">
                <h5 className="card-title">User Task Details</h5>
                <label htmlFor="exampleFormControlSelect1">
                  Select user
                </label>
                <select
                  data-mdb-select-init
                  data-mdb-clear-button="true"
                  id="exampleFormControlSelect1"
                  defaultValue=""
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Select user
                  </option>
                  {users.map((user) => (
                    <option key={user.projects} value={user.projects}>
                      {user.projects}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-md-4 col-sm-12">
            {selectedEmail && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Email:{selectedEmail}</h5>
                  <h6 className="card-title">Project Title:{selectedName}</h6>
                  <h6 className="card-title">Task description:{selectedDes}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Priority: {selectedPriority}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Satus: {selectedStatus}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Date: {selectedDate}</h6>
                 
                  <p className="card-text"></p>
                  <label className="text-start">
                    Start Time:
                    <a href="#" className="card-link">
                      <div class="time"><i class="fa fa-clock-o"></i>{selectedStartTime} </div>
                    </a>
                  </label>
                  <label className="text-end">
                    End Time:
                    <a href="#" className="card-link text-end">
                      <div class="time text-end">   <i class="fa fa-clock-o text-end"></i>{selectedEndTime}</div>
                    </a>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
