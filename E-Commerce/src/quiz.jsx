import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./config";
import "./quiz.css";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [finished, setFinished] = useState(false);

    const fetchQuestions = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${API_BASE_URL}/quiz`);
            if (response.data && Array.isArray(response.data.questions)) {
                setQuestions(response.data.questions);
            } else {
                setError("No quiz questions found.");
            }
        } catch (err) {
            console.error('Error fetching questions:', err);
            setError("Failed to load quiz questions. Please check if the backend server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleOptionClick = (option, index) => {
        if (!questions[currentQuestion]) return;

        if (index === questions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setFinished(false);
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Quiz...</span>
                </div>
                <p className="mt-3 text-muted fw-semibold">Loading Quiz Questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger mx-auto" style={{ maxWidth: '600px' }}>
                    <h5 className="alert-heading fw-bold">Unable to Load Quiz</h5>
                    <p className="mb-3">{error}</p>
                    <button onClick={fetchQuestions} className="btn btn-primary btn-sm">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (finished) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="container py-5">
                <div className="quiz-container mx-auto p-4 p-md-5" style={{ maxWidth: '650px' }}>
                    <h1 className="fw-bold mb-3">Quiz Completed! 🎉</h1>
                    <p className="lead mb-2">
                        Your Score: <strong className="text-primary">{score}</strong> / {questions.length}
                    </p>
                    <p className="text-muted mb-4">You achieved <strong>{percentage}%</strong></p>

                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <button onClick={restartQuiz} className="btn btn-primary px-4 py-2">
                            Retake Quiz
                        </button>
                        <Link to="/index" className="btn btn-outline-secondary px-4 py-2">
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const current = questions[currentQuestion];
    if (!current) {
        return null;
    }

    const progressPercentage = Math.round(((currentQuestion + 1) / questions.length) * 100);

    return (
        <div className="container py-5">
            <div className="quiz-container-question mx-auto p-4 p-md-5" style={{ maxWidth: '750px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-muted">
                        <strong>Question {currentQuestion + 1}</strong> of <span className="total-score">{questions.length}</span>
                    </h5>
                    <span className="badge bg-primary px-3 py-2">
                        Score: {score}
                    </span>
                </div>

                <div className="progress mb-4" style={{ height: '8px' }}>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${progressPercentage}%` }}
                        aria-valuenow={progressPercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>

                <h4 className="mt-3 question fw-semibold text-dark mb-4">
                    {current.question}
                </h4>

                <div className="options d-flex flex-column gap-2">
                    {current.options.map((option, index) => (
                        <button
                            key={index}
                            className="option btn text-start py-3 px-3 border shadow-sm"
                            onClick={() => handleOptionClick(option, index)}
                        >
                            <span className="badge bg-light text-dark border me-2">
                                {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;