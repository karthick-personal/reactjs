
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("http://localhost:5000/register", values);

        if (response.status === 200 || response.status === 201) {
          console.log("Signup successful!");
          Swal.fire({
            title: 'Success!',
            text: 'Signup successful!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          resetForm(); 
          navigate.push("/");
        } else {
          console.log("Signup failed with status:", response.status);
         
        }
      } catch (error) {
        console.error("Signup error:", error);
       
      }
    },
  });
  const handleSignOut = (e) => {
    e.preventDefault();

   
    navigate("/");
  };
  return (
    <div>
      <div className="register-photo con-height">
        <div className="form-container">
          <div className="image-holder"></div>
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-center">
              <strong>Sign up</strong>
            </h2>
            <div className="form-group pb-2">
              <input
                type="text"
                className={`form-control form-control-lg ${
                  formik.touched.name && formik.errors.name
                    ? "is-invalid"
                    : ""
                }`}
                id="floatingInput1"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error textColour">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group pb-2">
              <input
                type="email"
                className={`form-control form-control-lg ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                id="floatingInput2"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error textColour">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group pb-4">
              <input
                type="password"
                className={`form-control form-control-lg ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="floatingInput3"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error textColour">{formik.errors.password}</div>
              )}
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-success btn-block btn-info"
                type="submit"
              >
                Signup
              </button>
            </div>
            <b className="already" href="#">
              Already have an account?
            </b>
            <div className="form-group text-center">
              <button
                className="btn btn-success btn-block btn-info"
                onClick={handleSignOut}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
