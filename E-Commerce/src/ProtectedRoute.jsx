import { Navigate } from "react-router-dom"
const protectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    if(token){
        return children
    }
    return <Navigate to="/login" replace />
}

export default protectedRoute