import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import SignupPage from './pages/SignupPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='justify-center h-screen flex p-4 items-center'>
      <Toaster/>
     <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>} />
     </Routes>
    </div>
  )
}

export default App
