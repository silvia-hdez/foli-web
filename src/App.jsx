import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './views/Login/Login'
import AuthContext from './contexts/AuthContext'
import Profile from './Profile/Profile'



function App() {
  const {isAuthLoaded} = useContext(AuthContext)

  return (
    <div className="App">
         {!isAuthLoaded
          ? <p>Loading...</p>
          : (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
          )
        }
    </div>
  )
}

export default App
