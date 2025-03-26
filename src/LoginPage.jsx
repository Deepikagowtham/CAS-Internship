import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 🚀 Added Slide-in Effect for Form */}
        <div className="left-section slide-in-top">
          <h2>Welcome Back!</h2>
          <p>Please log in to your account.</p>

          <form>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="example@gmail.com" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="●●●●●●●" />
            </div>

            <div className="options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Remember me</label>
              </div>
              <a href="#">Forgot Password?</a>
            </div>

            {/* 🚀 Updated Buttons with Navigation */}
            <button type="button" className="login-btn" onClick={() => navigate("/add-stock")}>
              Log In
            </button>
            <button type="button" className="alt-btn" onClick={() => navigate("/signup-page")}>
              Sign Up
            </button>
          </form>

          <p className="terms-text">
            By signing in, you agree to our terms and data policy.
          </p>
        </div>

        {/* 🚀 Image with Slide-in Effect */}
        <div className="right-section slide-in-right">
          <img
            src="https://i.pinimg.com/736x/3b/17/5b/3b175bd66d5e4117a2139f6a23a8daca.jpg"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
