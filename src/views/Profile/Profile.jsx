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
      <Routes>
        <Route path="/profile" element={<MyPostsList />} />

      </Routes>

    </div>
  );
};

export default Profile;
