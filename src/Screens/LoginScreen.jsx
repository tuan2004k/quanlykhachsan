import React from "react";
import "./Login.css"; 

const LoginScreen = () => {
  return (
    <div className="login-screen">
      <div className="login-left">
        <img
          src="https://pistachiohotel.com/UploadFile/Gallery/Overview/a2.jpg"
          alt="Hotel"
        />
        <div className="login-overlay">\
          
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Effortless Hotel Management for Exceptional Guest Experiences
            </h2>
            <p>Discover the finest hotels from all over the world.</p>
          </div>
        </div>
      </div>
      <div className="login-right">
        
        <div className="login-form" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 style={{  fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Welcome to <span style={{ color: "#4f46e5" }}>8 BROSS</span>
          </h2>

          <button className="social-btn">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
            Login with Google
          </button>

          <button className="social-btn">
            <img src="https://img.icons8.com/ios-filled/24/1877f2/facebook-new.png" alt="Facebook" />
            Login with Facebook
          </button>

          <p style={{ textAlign: "center", color: "#999", margin: "1rem 0" }}>— OR —</p>

          <form>
            <input type="email" placeholder="Email or Phone Number" />
            <input type="password" placeholder="Password" />
            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <a href="#" style={{ color: "#4f46e5", fontSize: "0.9rem" }}>Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem", color: "#4f46e5"}}>  
            Don't have an account?{" "}
            <a href="#" style={{ color: "#4f46e5", fontSize: "Bold" }}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
