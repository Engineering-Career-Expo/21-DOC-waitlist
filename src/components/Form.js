import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorMessage from "@/components/ValidationStatus/ErrorMessage";
import Error from "./FormStatus/Error";

const Form = ({ success, errorOccured, processing, formStatus }) => {
  const firstnameref = useRef(null);
  const lastnameref = useRef(null);
  const usernameref = useRef(null);
  const emailref = useRef(null);
  const trackref = useRef(null);
  const participationref = useRef(null);
  const expectationsref = useRef(null);
  const gainref = useRef(null);

  const sendToGoogleSheet = async (formData) => {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const content = await response.json();
    if (content) {
      const status = content.data?.status;

      if (status === 200) {
        //success
        success();
        formik.resetForm();
      } else {
        errorOccured();
      }
    }
  };
  // validation scheme
  const validateSchema = yup.object().shape({
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    username: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("This field is required"),
    track: yup.string().required("This field is required"),
    participation: yup.string().nullable(),
    expectations: yup.string().nullable(),
    gain: yup.string().nullable(),
  });

  // focus on label click
  function Focus(id) {
    if (id === "firstname") {
      firstnameref.current.focus();
    } else if (id === "lastname") {
      lastnameref.current.focus();
    } else if (id === "username") {
      usernameref.current.focus();
    } else if (id === "email") {
      emailref.current.focus();
    } else if (id === "track") {
      trackref.current.focus();
    } else if (id === "participation") {
      participationref.current.focus();
    } else if (id === "expectations") {
      expectationsref.current.focus();
    } else if (id === "gain") {
      gainref.current.focus();
    }
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      track: "",
      participation: "",
      expectations: "",
      gain: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      processing();
      const formData = values;
      sendToGoogleSheet(formData);
    },
    validateOnChange: false,
  });

  return (
    <>
      {formStatus.error && <Error />}
      <form
        className="mt-8 pb-6"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="inputDiv">
          <input
            ref={firstnameref}
            value={formik.values.firstname}
            onChange={formik.handleChange}
            id="firstname"
            name="firstname"
            type="text"
            className={`peer input placeholder-transparent ${
              formik.errors.name ? "border-red-500" : ""
            } `}
            placeholder="First Name"
          />
          <label
            onClick={() => Focus("firstname")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            Firstname
          </label>
          <div className="line"></div>
          {formik.errors.firstname && (
            <ErrorMessage message={formik.errors.firstname} />
          )}
        </div>
        <div className="inputDiv">
          <input
            ref={lastnameref}
            value={formik.values.lastname}
            onChange={formik.handleChange}
            id="lastname"
            name="lastname"
            type="text"
            className={`peer input placeholder-transparent ${
              formik.errors.name ? "border-red-500" : ""
            } `}
            placeholder="Last Name"
          />
          <label
            onClick={() => Focus("lastname")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            Lastname
          </label>
          <div className="line"></div>
          {formik.errors.lastname && (
            <ErrorMessage message={formik.errors.lastname} />
          )}
        </div>
        <div className="inputDiv">
          <input
            ref={usernameref}
            value={formik.values.username}
            onChange={formik.handleChange}
            id="username"
            name="username"
            type="text"
            className={`peer input placeholder-transparent ${
              formik.errors.name ? "border-red-500" : ""
            } `}
            placeholder="Username"
          />
          <label
            onClick={() => Focus("username")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            Username
          </label>
          <div className="line"></div>
          {formik.errors.username && (
            <ErrorMessage message={formik.errors.username} />
          )}
        </div>
        <div className="inputDiv">
          <input
            ref={emailref}
            placeholder="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={`input peer ${
              formik.errors.name ? "border-red-500" : ""
            }`}
            type="text"
          />
          <div className="line"></div>
          <label
            onClick={() => Focus("email")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            Email Address
          </label>
          {formik.errors.email && (
            <ErrorMessage message={formik.errors.email} />
          )}
        </div>
        <div
          className="inputDiv py-2.5 h-48"
          role="tracks"
          aria-labelledby="track-list"
        >
          <label className="block pb-1.5 text-gray-500 text-base">
            Track (
            <span className="">
              <strong className="text-sm">You can only pick one track!</strong>
            </span>
            )
          </label>
          <div>
            <label className="text-gray-500 text-base">
              <input
                type="radio"
                name="track"
                value="Frontend Development"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.track === "Frontend Development"}
              />
              &nbsp; Frontend
            </label>
            <br />
            <label className="text-gray-500 text-base">
              <input
                type="radio"
                name="track"
                value="Backend Development"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.track === "Backend Development"}
              />
              &nbsp; Backend
            </label>
            <br />
            <label className="text-gray-500 text-base">
              <input
                type="radio"
                name="track"
                value="Python"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.track === "Python"}
              />
              &nbsp; Python
            </label>
            <br />
            <label className="text-gray-500 text-base">
              <input
                type="radio"
                name="track"
                value="Data Science"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.track === "Data Science"}
              />
              &nbsp; Data science
            </label>
            <br />
            <label className="text-gray-500 text-base">
              <input
                type="radio"
                name="track"
                value="Data Analytics"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.track === "Data Analytics"}
              />
              &nbsp; Data analytics
            </label>
            <br />
            <label className="text-gray-500 text-base">
              <input
                type="radio"
                name="track"
                value="Data Structure and Algorithms (DSA)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={
                  formik.values.track === "Data Structure and Algorithms (DSA)"
                }
              />
              &nbsp; DSA
            </label>
          </div>
          {formik.touched.track && formik.errors.track ? (
            <ErrorMessage message={formik.errors.track} />
          ) : null}
        </div>

        <div className="inputDiv">
          <input
            ref={participationref}
            placeholder="Yes/No and when (if Yes)."
            name="participation"
            onChange={formik.handleChange}
            value={formik.values.participation}
            className={`input peer ${
              formik.errors.name ? "border-red-500" : ""
            }`}
            type="text"
          />
          <div className="line"></div>
          <label
            onClick={() => Focus("participation")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            Have you participated in any ECX program before?
          </label>
          {formik.errors.participation && (
            <ErrorMessage message={formik.errors.participation} />
          )}
        </div>
        <div className="inputDiv">
          <input
            ref={expectationsref}
            placeholder="What do you expect and what will make your experience great."
            name="expectations"
            onChange={formik.handleChange}
            value={formik.values.expectations}
            className={`input peer ${
              formik.errors.name ? "border-red-500" : ""
            }`}
            type="text"
          />
          <div className="line"></div>
          <label
            onClick={() => Focus("expectations")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            What would like to see in this program?
          </label>
          {formik.errors.expectations && (
            <ErrorMessage message={formik.errors.expectations} />
          )}
        </div>
        <div className="inputDiv">
          <input
            ref={gainref}
            placeholder="Why do you want to partake in the program, what do you get out of it."
            name="gain"
            onChange={formik.handleChange}
            value={formik.values.gain}
            className={`input peer ${
              formik.errors.name ? "border-red-500" : ""
            }`}
            type="text"
          />
          <div className="line"></div>
          <label
            onClick={() => Focus("gain")}
            className="absolute bottom-2.5 text-gray-500 text-base transition-all duration-300 ease-in"
          >
            What are you looking to gain in this program?
          </label>
          {formik.errors.gain && <ErrorMessage message={formik.errors.gain} />}
        </div>

        <button
          disabled={formStatus.loading}
          type="submit"
          className="w-28 h-10 bg-blue-500 rounded-md relative left-2/4 -translate-x-2/4 text-white "
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Form;
