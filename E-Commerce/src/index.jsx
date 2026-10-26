import axios from "axios";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import './bookindex.css';

const Index = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${API_BASE_URL}/index`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError("Failed to load courses. Please make sure the backend server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted fw-semibold">Loading available courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger mx-auto" style={{ maxWidth: '600px' }}>
                    <h5 className="alert-heading fw-bold">Oops! Something went wrong</h5>
                    <p className="mb-3">{error}</p>
                    <button onClick={fetchData} className="btn btn-primary btn-sm">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const works = data?.works || [];

    return (
        <div className="container py-4">
            <h1 className="Available">Available Courses</h1>
            {works.length === 0 ? (
                <p className="text-center text-muted">No courses found at the moment.</p>
            ) : (
                <div className="grid">
                    {works.map((work) => {
                        const cleanId = work.key ? work.key.replace(/^\/works\/?/, '') : '';
                        const subjectName = Array.isArray(work.subject) && work.subject.length > 0
                            ? work.subject[0]
                            : 'Computer Science';

                        return (
                            <div key={work.key} className="card shadow-sm border-0">
                                <div className="box">
                                    {work.cover_id ? (
                                        <img
                                            src={`https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`}
                                            alt={work.title}
                                            className="image"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span className="alt fw-medium">No Image Available</span>
                                    )}
                                </div>
                                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                                    <div>
                                        <h3 className="title text-dark" title={work.title}>
                                            {work.title}
                                        </h3>
                                        <p className="sub text-secondary small mb-3">
                                            {subjectName}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/course/${cleanId}`}
                                        state={{ work }}
                                        className="button text-decoration-none"
                                    >
                                        Start Learning
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Index;