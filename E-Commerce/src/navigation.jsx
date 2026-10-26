import './navigation.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(Boolean(token));
    }, [location]);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        navigate('/login');
    };

    return (
        <nav className='nav-con'>
            <Link to={isAuth ? "/index" : "/login"} className='E-Commerce text-decoration-none'>
                E-Commerce
            </Link>

            <div className='nav-links'>
                {!isAuth ? (
                    <>
                        <Link to="/login" className='nav-link'>Login</Link>
                        <Link to="/register" className='nav-link'>Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/index" className='nav-link'>Home</Link>
                        <Link to="/quiz" className='nav-link'>Quiz</Link>
                        <button onClick={logout} className='btn btn-outline-light btn-sm fw-semibold'>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;