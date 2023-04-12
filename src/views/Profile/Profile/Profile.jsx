import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import MyPostsList from "../../../components/MyPostsList/MyPostsList";
import "./Profile.css";
import MyPlantsList from "../../../components/MyPlantsList/MyPlantsList";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  return (
    <div>
      <Navbar />
      <div className="Profile">
        <h1>Profile of {currentUser.userName}</h1>
        <img className="ProfileImg" src={currentUser.image} />
        <Link to="/edit-profile">Editar Perfil</Link>
        <h2>My posts</h2>
        <Routes>
          <Route path="/profile" element={<MyPostsList />} />
        </Routes>

        <h2>Mis fichas guardadas</h2>
        <Routes>
          <Route path="/profile" element={<MyPlantsList />} />
        </Routes>

        <h2>Mis posts guardados</h2>
      </div>
    </div>
  );
};

export default Profile;
