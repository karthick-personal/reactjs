
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/login", values)
        .then((result) => {
          console.log(result);
          if (result.data === "Success") {
            localStorage.setItem("isAuthenticated", "true");
    
           
            if (values.email === 'k@gmail.com') {
            
              Swal.fire({
                icon: 'success',
                title: 'Welcome to Admin Dashboard',
                showConfirmButton: false,
                timer: 5000,
              });
    
            
              navigate("/Home");
            } else {
              
              Swal.fire({
                icon: 'success',
                title: 'Welcome to User Dashboard',
                showConfirmButton: false,
                timer: 5000,
              });
              navigate("/Userdashboard");
            }
          } else {
            if (result.data === "InvalidEmailOrPassword") {
              setError("Invalid email or password");
            } else {
              setError("Invalid email or password");
            }
          }
        })
        .catch((err) => {
          console.error(err);
          setError("An error occurred. Please try again later.");
        });
    },
    
  });

  const handleSignOut = (e) => {
    e.preventDefault();
    navigate("/Signup");
  };

  return (
    <div>
      <div className="register-photo con-height">
        <div className="form-container">
          <div className="image-holder"></div>
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-center">
              <strong>Login</strong>
            </h2>
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
               {error && (
              <div className="error textColour">
                {error}
              </div>
            )}
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-success btn-block btn-info"
                type="submit"
              >
                Login
              </button>
            </div>
            
            <div className="form-group text-center">
              <b className="already" href="#">
                If you do not have an account?
              </b>
              <button
                className="btn btn-success btn-block btn-info"
                onClick={handleSignOut}
              >
                Signup
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};
