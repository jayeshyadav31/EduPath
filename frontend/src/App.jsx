import { useState } from 'react'
import { Route, Routes, useNavigate ,Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import SignupPage from './pages/SignupPage'
import { useAuthContext } from './context/AuthContext'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Account from './pages/Account'
import CourseDetailsPage from './pages/CourseDetailsPage'
function App() {
  const {authUser}=useAuthContext()
  const navigate=useNavigate()
  return (
    <div className='justify-center h-screen flex-col p-4 items-center'>
      <Toaster/>
      <Header/>
     <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to="login"/>} />
        <Route path='/login' element={authUser?<Navigate to='/'/>:<LoginPage/>}/>
        <Route path='/signup' element={authUser?<Navigate to='/' />:<SignupPage/>} />
        <Route path='/account' element={authUser?<Account/>:<Navigate to="/login" />} />
        <Route path='/:id' element={authUser?<CourseDetailsPage/>:<Navigate to="login" />} />
     </Routes>
    </div>
  )
}

export default App
