import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import SignupPage from './pages/SignupPage'
import { useAuthContext } from './context/AuthContext'
import HomePage from './pages/HomePage'
import Header from './components/Header'
function App() {
  const {authUser}=useAuthContext()
  const navigate=useNavigate()
  return (
    <div className='justify-center h-screen flex-col p-4 items-center'>
      <Toaster/>
      <Header/>
     <Routes>
        <Route path='/' element={authUser?<HomePage/>:navigate('/login')} />
        <Route path='/login' element={authUser?navigate('/'):<LoginPage/>}/>
        <Route path='/signup' element={authUser?navigate('/'):<SignupPage/>} />
     </Routes>
    </div>
  )
}

export default App
