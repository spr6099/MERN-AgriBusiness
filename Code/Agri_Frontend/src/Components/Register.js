import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // Ensure this CSS file is imported

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  console.log(image);

  const RegisterForm = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!username || !email || !password || !category) {
      setError("All fields are required.");
      return;
    }

    // Password validation:at least 6 characters
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long ");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("category", category);
    formData.append("password", password);
    formData.append("status", 2);

    if (
      (category === "dealer" || category === "farmer" || category === "bank") &&
      image
    ) {
      formData.append("image", image);
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result) {
          setSuccess("Registration successful!");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setError("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        setError("Registration failed. Please try again.");
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="image-container">
          <img
            src={`${process.env.PUBLIC_URL}/img/login/bag.jpg`}
            alt="Register"
            className="img-fluid"
          />
        </div>
        <div className="register-box">
          <h3>Register</h3>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          )}

          <form onSubmit={RegisterForm}>
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label className="form-label" htmlFor="category">
                Category
              </label>{" "}
              <br />
              <div className="options ">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    id="farmerCategory"
                    value="farmer"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="farmerCategory">
                    Farmer
                  </label>{" "}
                  &nbsp;&nbsp;
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    id="publicCategory"
                    value="public"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="publicCategory">
                    Public
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    id="dealerCategory"
                    value="dealer"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="dealerCategory">
                    Dealer
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    id="bankCategory"
                    value="bank"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="bankCategory">
                    Bank
                  </label>
                </div>
              </div>
            </div>

            {(category === "farmer" ||
              category === "dealer" ||
              category === "bank") && (
              <div className="input-container">
                <label className="form-label" htmlFor="farmerImage">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="farmerImage"
                  onChange={handleFileChange}
                />
              </div>
            )}

            <div className="input-container">
              <textarea
                name="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-container">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary">
              Sign up
            </button>

            <div className="text-center">
              <Link to="/login">
                {" "}
                <p>Already a member? Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
