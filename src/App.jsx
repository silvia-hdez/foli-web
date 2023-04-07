import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './views/Login/Login'
import AuthContext from './contexts/AuthContext'
import Profile from './Profile/Profile'
import PlantsList from './views/PlantsList/PlantsList'
import SignUp from './views/SignUp/SignUp'
import PlantDetail from './views/PlantDetail/PlantDetail'
import PostsList from './views/PostsList/PostsList'




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
            <Route path='sign-up' element={<SignUp />} />

            <Route path="plants" element={<PlantsList />} />
            <Route path="plants/:id" element={<PlantDetail />} />

            <Route path='/posts' element={<PostsList />}/>
            
            
          </Routes>
          )
        }
    </div>
  )
}

export default App
