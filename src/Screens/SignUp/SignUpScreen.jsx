import React, { useState } from "react";
import "./SignUp.css";

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

  return (
    <div className="signup">
      <div className="container">
        <div className="sign-left">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="form-row">
              <div className="form-colum">
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                ].map(({ label, name, type }) => (
                  <div className="form-group" key={name}>
                    <label htmlFor={name}>
                      {label}{" "}
                      <span
                        className={`required ${
                          isSubmitted && errors[name] ? "" : "hidden"
                        }`}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={`input ${
                        isSubmitted && errors[name] ? "error" : ""
                      }`}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                    {isSubmitted && errors[name] && (
                      <p className="error-message">{label} is required</p>
                    )}
                  </div>
                ))}
              </div>
              {/* Avatar Upload */}
              <div className="form-group avatar-group">
                <label htmlFor="avatar">
                  Avatar{" "}
                  <span
                    className={`required ${
                      isSubmitted && errors.avatar ? "" : "hidden"
                    }`}
                  >
                    *
                  </span>
                </label>
                <div className="avatar-upload">
                  <button
                    type="button"
                    className="avatar-preview"
                    onClick={() => document.getElementById("avatar").click()}
                  >
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar Preview" />
                    ) : (
                      <span className="add-icon">+</span>
                    )}
                  </button>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="file-input hidden"
                  />
                </div>
                {isSubmitted && errors.avatar && (
                  <p className="error-message">Avatar is required</p>
                )}
              </div>
            </div>
            {/* Other form fields */}
            {[
              { label: "Phone Number", name: "phoneNumber", type: "tel" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "CCCD", name: "cccd", type: "text" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>
                  {label}{" "}
                  <span
                    className={`required ${
                      isSubmitted && errors[name] ? "" : "hidden"
                    }`}
                  >
                    *
                  </span>
                </label>
                <div className="input-container">
                  <input
                    type={name === "password" && showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className={`input ${
                      isSubmitted && errors[name] ? "error" : ""
                    }`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                  {name === "password" && (
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  )}
                </div>
                {isSubmitted && errors[name] && (
                  <p className="error-message">{label} is required</p>
                )}
              </div>
            ))}
            <button type="submit" className="sign-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="src/assets/Image/Frame 160.png"
          alt="Hotel"
          className="sign-right"
        />
      </div>
    </div>
  );
};

export default SignUpScreen;
