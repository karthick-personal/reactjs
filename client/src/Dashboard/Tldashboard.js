
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
// import { useRouter } from "next/router";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const Tldashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      ticketid: "",
      date: "",
      projects: "",
      comments: "",
      priority: "",
      assigned: "",
      category: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      date: Yup.date().required("Date is required"),
      projects: Yup.string().required("user is required"),
      priority: Yup.string().required("Priority is required"),
      status: Yup.string().required("Status is required"),
      comments: Yup.string().required("description are required"),
    }),
    onSubmit: (values) => {
      console.log("submit");
      axios.post("http://localhost:5000/ticket", values).then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Task assigned successfully!",
        }).then(() => {
          setModalOpen(false);
        });
      });
      formik.resetForm();
    },
  });
  return (
    <>
      <div class="row">
        <div class="col-lg-8">
          <div class="card card-header-actions">
            <div class="card-header">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                Create Task
              </button>
            </div>
            <div class="card-body">
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: isModalOpen ? "block" : "none" }}
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Assign Task
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form onSubmit={formik.handleSubmit}>
                        <label for="recipient-name" class="col-form-label">
                          Task title:
                        </label>
                        <div class="mb-3">
                          <input
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="name"
                            className="form-control input"
                            id="name"
                            placeholder="Enter your name"
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label">
                            User:
                          </label>
                          <select
                            value={formik.values.projects}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="projects"
                            className="form-select form-control select"
                            id="projects"
                          >
                            <option value="" label="Select a user" />
                            {users.map((user) => (
                              <option key={user.email} value={user.email}>
                                {user.email}
                              </option>
                            ))}
                          </select>
                          {formik.touched.projects && formik.errors.projects ? (
                            <div className="text-danger">
                              {formik.errors.projects}
                            </div>
                          ) : null}
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">
                            date:
                          </label>
                          <input
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="date"
                            className="form-control input"
                            id="date"
                            placeholder="Enter your name"
                          />
                          {formik.touched.date && formik.errors.date ? (
                            <div className="text-danger">
                              {formik.errors.date}
                            </div>
                          ) : null}
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">
                            Priority:
                          </label>
                          <select
                            value={formik.values.priority}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="priority"
                            className="form-select form-control select"
                            id="priority"
                          >
                            <option value="" label="Select a priority" />
                            <option value="high">High</option>
                            <option value="low">Low</option>
                            <option value="middle">Middle</option>
                          </select>
                          {formik.touched.priority && formik.errors.priority ? (
                            <div className="text-danger">
                              {formik.errors.priority}
                            </div>
                          ) : null}
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">
                            Status:
                          </label>
                          <select
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="status"
                            className="form-select form-control select"
                            id="status"
                          >
                            <option value="" label="Select a status" />
                            <option value="toDo">toDo</option>
                          </select>
                          {formik.touched.status && formik.errors.status ? (
                            <div className="text-danger">
                              {formik.errors.status}
                            </div>
                          ) : null}
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">
                            Project:
                          </label>
                          <textarea
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="comments"
                            className="form-control textarea"
                            id="comments"
                            rows="2"
                            placeholder="Enter your comments"
                          ></textarea>
                          {formik.touched.comments && formik.errors.comments ? (
                            <div className="text-danger">
                              {formik.errors.comments}
                            </div>
                          ) : null}
                        </div>

                        <button type="submit" class="btn btn-primary">
                          Assign
                        </button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
