import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import MyPostsList from "../../../components/MyPostsList/MyPostsList";
import "./Profile.css";
import MyPlantsList from "../../../components/MyPlantsList/MyPlantsList";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true)

  console.log(currentUser);
  return (
    <div>
      <Navbar />
      <div className="Profile">
        <h1>Profile of {currentUser.userName}</h1>
        <img className="ProfileImg" src={currentUser.image} />
        <Link to="/edit-profile">Editar Perfil</Link>

        <button onClick={() => setShowMyPosts(!showMyPosts)}> Mis Posts</button>
        {showMyPosts && (
          <>
          <Routes>
          <Route path="/profile" element={<MyPostsList />} />
        </Routes>
        </>
        )}

    

        <button onClick={() => setShowMyPlants(!showMyPlants)}> Mis fichas guardadas</button>
        {showMyPlants && (
          <>
            <Routes>
              <Route path="/profile" element={<MyPlantsList />} />
            </Routes>
          </>
        )}

        <h2>Mis posts guardados</h2>
      </div>
    </div>
  );
};

export default Profile;
