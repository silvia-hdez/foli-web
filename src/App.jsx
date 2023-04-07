import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './views/Login/Login'
import AuthContext from './contexts/AuthContext'
import Profile from './Profile/Profile'
import PlantsList from './views/PlantsList/PlantsList'
import Signin from './views/SignUp/SignUp'



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
            <Route path='sign-in' element={<Signin />} />
            <Route path="plants" element={<PlantsList />} />
          </Routes>
          )
        }
    </div>
  )
}

export default App
