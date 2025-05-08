import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const loginForm = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    let params = {
      username: email,
      userPassword: password,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === "Login successful") {
          // if (result.userData.userStatus !== "0" && result.userData.userStatus !== "1") {
          if (!["1", "0", "3","4"].includes(result.userData.userStatus)) {
            setError("Invalid login attempt. Please try again.");
            return;
          }
          localStorage.setItem("userdata", JSON.stringify(result.userData));
          setSuccess("Login successful!");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        } else {
          setError(result.error || "An error occurred. Please try again.");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.error("Error during login:", err);
      });
  };

  return (
    <div className="container-fluid">
      <div
        className="row h-100 align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="index.html" className="">
                <h3 className="text-primary">
                  <i className="fa fa-user-edit me-2"></i>HarvestHub
                </h3>
              </a>
              <h3>Sign In</h3>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={loginForm}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label> */}
                </div>
                {/* <a href="">Forgot Password</a> */}
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                Sign In
              </button>
            </form>
            <p className="text-center mb-0">
              Don't have an Account? <a href="">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



  