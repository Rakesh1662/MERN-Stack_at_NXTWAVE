import Login from './login'
import Register from './register'
import Navigation from './navigation'
import { Route, Routes, Navigate } from 'react-router-dom'
import Index from './index'
import Course from './course'
import Quiz from './quiz'
import ProtectedRoute from './ProtectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path='/index' element={<ProtectedRoute><Index /></ProtectedRoute>}/>
        <Route path='/course/:id' element={<ProtectedRoute><Course /></ProtectedRoute>}/>
        <Route path='/quiz' element={<ProtectedRoute><Quiz /></ProtectedRoute>}/>
        
        <Route path='*' element={<Navigate to='/login'/>}/>
      </Routes>
    </>
  )
}

export default App
