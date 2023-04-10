import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/misc/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import MyPostsList from "../../components/MyPostsList/MyPostsList";


const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <h1>Profile of {currentUser.userName}</h1>
      <p>id: {currentUser.id}</p>

      <h2>My posts</h2>
      <Routes>
        <Route path="/profile" element={<MyPostsList />} />
      </Routes>

      <h2>Mis fichas guardadas</h2>

      <h2>Mis posts guardados</h2>

    </div>
  );
};

export default Profile;
