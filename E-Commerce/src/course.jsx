import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import './course.css';

const Course = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const work = state?.work;

    if (!work) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: '600px' }}>
                    <h2 className="fw-bold mb-3">Course Not Found</h2>
                    <p className="text-secondary mb-4">
                        We couldn't load details for course ID "{id}". Please return to the courses list and select a course to learn.
                    </p>
                    <div>
                        <button onClick={() => navigate('/index')} className="btn btn-primary px-4 py-2">
                            Back to Available Courses
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Handle OpenLibrary description formats (can be string or { type, value })
    const descriptionText = typeof work.description === 'object' && work.description !== null
        ? work.description.value
        : (typeof work.description === 'string' && work.description.trim() ? work.description : 'Comprehensive programming course covering key concepts, best practices, and real-world implementation.');

    const authorsList = Array.isArray(work.authors) && work.authors.length > 0
        ? work.authors.map(a => a.name || 'Author').join(', ')
        : 'Open Source Community';

    const subjectsList = Array.isArray(work.subject) && work.subject.length > 0
        ? work.subject.slice(0, 5).join(', ')
        : 'Computer Science, Programming';

    return (
        <div className='container mx-auto p-4'>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className='coursetitle mb-0 fw-bold fs-2 text-dark'>{work.title}</h1>
                <Link to="/index" className="btn btn-outline-secondary btn-sm">
                    &larr; Back to Courses
                </Link>
            </div>

            <div className='row g-4'>
                <div className='col-lg-8'>
                    <div className='ratio ratio-16x9 bg-dark rounded shadow overflow-hidden'>
                        <iframe
                            src={`https://www.youtube.com/embed/${work.video_id || 'dQw4w9WgXcQ'}`}
                            title="Course Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className='desc-con mt-4 bg-white p-4 rounded shadow-sm'>
                        <h3 className='h4 fw-bold mb-3 text-dark border-bottom pb-2'>About this Course</h3>
                        <p className="text-secondary mb-3">{descriptionText}</p>

                        <div className="row g-2 pt-2">
                            <div className="col-sm-6">
                                <p className="mb-1"><strong>Author(s): </strong>{authorsList}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-1"><strong>Subjects: </strong>{subjectsList}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-1"><strong>Edition Count: </strong>{work.edition_count ?? 'N/A'}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-1"><strong>First Published: </strong>{work.first_publish_year ?? work.publish_date ?? 'N/A'}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-1">
                                    <strong>Availability: </strong>
                                    <span className="badge bg-success">
                                        {work.availability?.status || 'Active'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="bg-white p-4 rounded shadow-sm sticky-top" style={{ top: '90px' }}>
                        <h3 className="fs-5 fw-bold mb-3 text-dark border-bottom pb-2">Course Modules</h3>

                        <ul className="list-unstyled mb-0">
                            <li className="p-2 bg-primary bg-opacity-10 text-primary fw-semibold rounded mb-2" style={{ cursor: "pointer" }}>
                                1. Course Introduction &amp; Overview
                            </li>
                            <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                                2. Setting Up the Development Environment
                            </li>
                            <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                                3. Fundamental Concepts &amp; Architecture
                            </li>
                            <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                                4. Hands-on Project Implementation
                            </li>
                            <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                                5. Advanced Techniques &amp; Optimization
                            </li>
                            <li className="p-2 hover-bg-light rounded" style={{ cursor: "pointer" }}>
                                6. Summary &amp; Quiz Preparation
                            </li>
                        </ul>

                        <div className="mt-4 pt-3 border-top text-center">
                            <Link to="/quiz" className="btn btn-success w-100 fw-semibold">
                                Take Course Quiz &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;