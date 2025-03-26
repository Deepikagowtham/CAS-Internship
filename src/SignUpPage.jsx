import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./LoginPage.css";

const SignUpPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="left-section slide-in-top"> {/* Animation Class */}
          <h2>Welcome to</h2>
          <h2> Sudha Pharmacy!</h2>
          <p>Please create your account.</p>

          <form>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="example@gmail.com" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="●●●●●●●" />
            </div>
            <div className="input-group">
              <label>Retype Password</label>
              <input type="password" placeholder="●●●●●●●" />
            </div>

            <div className="options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Remember me</label>
              </div>
            </div>

            {/* 🚀 Updated Buttons with Navigation */}
            <button type="button" className="login-btn" onClick={() => navigate("/add-stock")}>
              Sign Up
            </button>
            <button type="button" className="alt-btn" onClick={() => navigate("/login-page")}>
              Log In
            </button>
          </form>

          <p className="terms-text">
            By signing up, you agree to our terms and data policy.
          </p>
        </div>

        {/* 🚀 Image with Slide-in Effect */}
        <div className="right-section slide-in-right">
          <img
            src="https://i.pinimg.com/736x/61/95/ff/6195ff2632584facb959af10cdd98047.jpg"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
