import React, { useState } from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import { Link } from "react-router-dom"; // To navigate to the login page
import Logo from "../assets/Image/Logo.png";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    cccd: "",
    password: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: false });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
      setErrors({ ...errors, avatar: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "avatar" && formData[key].trim() === "") {
        newErrors[key] = true;
      }
      if (key === "avatar" && !formData.avatar) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  const handleLoginRedirect = () => {
    history.push("/login"); // Redirect to the login page
  };

  return (

    <div className="flex h-screen overflow-hidden">   
      {/* Left Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <form onSubmit={handleSubmit}>
          <img src={Logo}  className="w-27 h-27 mx-auto pb-4" alt="" srcset="" />
          

          <div className="space-y-4">
            
          {/* FIRST NAME AND LAST NAME */}
            <div className="flex space-x-4 mb-6">
               {[{ label: "First Name", name: "firstName", type: "text" }, { label: "Last Name", name: "lastName", type: "text" }].map(
                ({ label, name, type }) => (
                  <div className="w-1/3" key={name}>
                    <label htmlFor={name} className="block mb-2">
                      {label}{" "}
                      <span
                        className={`text-red-500 ${isSubmitted && errors[name] ? "" : "hidden"}`}
                      >
                        *
                      </span>
                    </label>
                    <InputField
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitted && errors[name] ? "border-red-500" : ""}`}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                    {isSubmitted && errors[name] && (
                      <p className="text-red-500 text-sm">This field is required</p>
                    )}
                  </div>
                )
              )}
                   {/* AVATAR  */}
              <div className="w-1/3 flex justify-center">
                <Button
                  type="button"
                  className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  onClick={() => document.getElementById("avatar").click()}
                >
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-3xl">+</span>
                  )}
                </Button>
                <InputField
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

             
            </div>

            {[{ label: "Phone Number", name: "phoneNumber", type: "tel" }, { label: "Email Address", name: "email", type: "email" }, { label: "CCCD", name: "cccd", type: "text" }, { label: "Password", name: "password", type: "password" }].map(
              ({ label, name, type }) => (
                <div className="form-group mb-4" key={name}>
                  <label htmlFor={name} className="block mb-2">
                    {label}{" "}
                    <span
                      className={`text-red-500 ${isSubmitted && errors[name] ? "" : "hidden"}`}
                    >
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <InputField
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitted && errors[name] ? "border-red-500" : ""}`}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                    {name === "password" && (
                      <Button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "👁️" : "🙈"}
                      </Button>
                    )}
                  </div>
                  {isSubmitted && errors[name] && (
                    <p className="text-red-500 text-sm">This field is required</p>
                  )}
                </div>
              )
            )}

            <Button
              type="submit"
              className="w-full mx-auto bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </Button>

            <p className="text-center text-indigo-600">
              Don't have an account?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="flex-1 hidden md:block">
        <img
          src="src/assets/Image/Hotel.jpg"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUpScreen;
