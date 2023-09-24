import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import { SportsEsports } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/search");
  }, [user, loading]);
  return (
    <div className="container">
      <div className="black-column">
        <h1>Welcome to Cutscene</h1>
        <SportsEsports className="black-icon" />
      </div>
      <div className="white-column">
        <h1>Login</h1>
        <div className="login">
          <div className="login__container">
            <div className="login__inputs">
              <input
                type="text"
                className="login__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              <input
                type="password"
                className="login__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button onClick={logInWithEmailAndPassword} className="login__btn">
              Login
            </button>
            <button
              className="login__btn login__google"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
            <Link className="forgot-pass" to="/reset">
              Forgot Password
            </Link>
            <h5>
              Don't have an account? <Link to="/register">Register</Link> now.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

{
  /* <div className="login">
<div className="login__container">
  <input
    type="text"
    className="login__textBox"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="E-mail Address"
  />
  <input
    type="password"
    className="login__textBox"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
  />
  <button
    className="login__btn login__google"
    onClick={signInWithGoogle}
  >
    Login with Google
  </button>
  <div>
    <Link to="/reset">Forgot Password</Link>
  </div>
  <div>
    Don't have an account? <Link to="/register">Register</Link> now.
  </div>
</div>
</div> */
}
