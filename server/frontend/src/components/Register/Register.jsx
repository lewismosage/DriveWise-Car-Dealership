import React, { useState } from "react";
import "./Register.css";
import userIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const goHome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    const registerUrl = `${window.location.origin}/djangoapp/register`;

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
          firstName,
          lastName,
          email,
        }),
      });
      const json = await response.json();
      if (json.status) {
        sessionStorage.setItem("username", json.userName);
        goHome();
      } else if (json.error === "Already Registered") {
        alert("User with this username is already registered");
        goHome();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span className="header-text">Sign Up</span>
        {/* Updated close button to be similar to the (x) in the Login component */}
        <span className="close-icon" onClick={goHome}>&times;</span>
      </div>
      <hr />
      <form onSubmit={register} className="register-form">
        <div className="input-group">
          <img src={userIcon} className="input-icon" alt="Username" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-field"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={userIcon} className="input-icon" alt="First Name" />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="input-field"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={userIcon} className="input-icon" alt="Last Name" />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="input-field"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={emailIcon} className="input-icon" alt="Email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={passwordIcon} className="input-icon" alt="Password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
