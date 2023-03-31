import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './views/Login/Login'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
