import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email.trim(),
        password: password.trim()
      });

      console.log("Login response:", response.data);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/index');
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : '') ||
        "Login failed. Please check your credentials or server status.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center bg-secondary'
      style={{ minHeight: 'calc(100vh - 80px)', padding: '20px' }}
    >
      <div className="bg-white p-4 rounded shadow col-11 col-sm-8 col-md-5 col-lg-4">
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              autoComplete="off"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              autoComplete="off"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 py-2 fw-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary fw-bold text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
