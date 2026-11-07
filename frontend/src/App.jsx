import React, { useEffect } from 'react'
import { Toaster } from "react-hot-toast"
import { Routes, Navigate, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SingupPage from './pages/SingupPage'
import ProfilePage from './pages/ProfilePage.jsx'

import PageLoader from './components/PageLoader.jsx'
import { useAuthstore } from './store/useauthstore.js'




const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthstore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />


  return (
    <div className="min-h-screen">
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"}/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage /> :<Navigate to={"/"}/>}/>
        <Route path='/singup' element={<SingupPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App