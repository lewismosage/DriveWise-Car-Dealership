import React, { useState } from 'react';
import "./Login.css";
import Header from '../Header/Header';
import userIcon from "../assets/person.png";
import passwordIcon from "../assets/password.png";

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)

  let login_url = window.location.origin+"/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);        
    }
    else {
      alert("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    open && (
      <div>
        <Header />
        <div 
          className="modalBackdrop"
          onClick={() => {
            setOpen(false);
            onClose && onClose();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Stop propagation to allow clicking inside the modal
            className="modalContainer"
          >
            <form onSubmit={login}>
              <div className="login_panel">
                {/* Username input with icon and visible label */}
                <div className="input-group">
                  <img src={userIcon} className="input-icon" alt="Username" />
                  <input
                    type="text"
                    name="username"
                    value={userName}
                    className="input_field"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username" // Placeholder used here
                    required
                  />
                  <label className="floating-label">Username</label>
                </div>

                {/* Password input with icon and visible label */}
                <div className="input-group">
                  <img src={passwordIcon} className="input-icon" alt="Password" />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="input_field"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" // Placeholder used here
                    required
                  />
                  <label className="floating-label">Password</label>
                </div>

                <div>
                  <input className="action_button" type="submit" value="Login" />
                  <input
                    className="action_button"
                    type="button"
                    value="Cancel"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <a className="loginlink" href="/register">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default Login;