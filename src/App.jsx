import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import AuthContext from "./contexts/AuthContext";
import Profile from "./views/Profile/Profile";
import PlantsList from "./views/PlantsList/PlantsList";
import SignUp from "./views/SignUp/SignUp";
import PlantDetail from "./views/PlantDetail/PlantDetail";
import PostsList from "./views/PostsList/PostsList";
import PostDetail from "./views/PostDetail/PostDetail";
import CreatePost from "./views/CreatePost/CreatePost";

function App() {
  const { isAuthLoaded } = useContext(AuthContext);

  return (
    <div className="App">
      {!isAuthLoaded ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Profile />} />
          <Route path="sign-up" element={<SignUp />} />

          <Route path="plants" element={<PlantsList />} />
          <Route path="plants/:id" element={<PlantDetail />} />

          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetail />} />

          <Route path="/new" element={<CreatePost />}/>
        </Routes>
      )}
    </div>
  );
}

export default App;
