import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const loginForm = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    let params = {
      username: email,
      userPassword: password
    };

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'Login successful') {
          localStorage.setItem("userdata", JSON.stringify(result.userData));
          setSuccess('Login successful!');
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1000);
        } else {
          setError(result.error || 'An error occurred. Please try again.');
        }
      })
      .catch((err) => {
        setError('An error occurred. Please try again.');
        console.error('Error during login:', err);
      });
  };

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={`${process.env.PUBLIC_URL}/img/login/crop.jpg`} alt="Login" className="img-fluid w-100" />
      </div>
      <div className="login-box">
        <h2>LOGIN</h2>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={loginForm}>
          <div className="input-container">
            <input 
              type="email" 
              name='username' 
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <input 
              type="password" 
              name='password' 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          <div className="text-center">
            <Link to="/register"> <p>Not a member? Register Here</p></Link>
          </div>
          <button type="submit" className="login-button">SIGN IN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
