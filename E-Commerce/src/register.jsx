import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            });

            console.log("Registration response:", response.data);
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            console.error("Registration error:", err);
            const msg =
                err.response?.data?.message ||
                (typeof err.response?.data === "string" ? err.response.data : "") ||
                "Failed to register. Please check your backend connection.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center bg-secondary"
            style={{ minHeight: "calc(100vh - 80px)", padding: "20px" }}
        >
            <div className="bg-white p-4 rounded shadow col-11 col-sm-8 col-md-5 col-lg-4">
                <h2 className="text-center mb-4 fw-bold">Register</h2>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">
                            Name:
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            id="name"
                            autoComplete="off"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">
                            Email:
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            id="email"
                            autoComplete="off"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label fw-semibold">
                            Password:
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            id="pwd"
                            autoComplete="off"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-success w-100 py-2 fw-semibold"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary fw-bold text-decoration-none">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;