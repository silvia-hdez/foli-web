import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import "./Profile.css";
import PlantsList from "../../Plants/PlantsList/PlantsList";
import PostsList from "../../Posts/PostsList/PostsList";
import logo from '../../../assets/img/Logo.png'

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true)
  const [showMyLikes, setShowMyLikes] = useState(false)

  

  console.log(currentUser);
  return (
    <div className="Profile">
    <img src={logo} />
     
      <div className="ProfileData">
        <div>
          <p>100</p>
          <p>Seguidores</p>
        </div>

          <Link to="/edit-profile"> 
            <img className="ProfileImg" src={currentUser.image} />
          </Link>
       
        <div>
          <p>500</p>
          <p>Siguiendo</p>
        </div>  
      </div>

      <p>{currentUser.userName}</p>

      <div className="ButtonsProfile">
          <button onClick={() => setShowMyPosts(!showMyPosts)}> <i className="bi bi-images"></i></button>
          <button onClick={() => setShowMyPlants(!showMyPlants)}> <i className="bi bi-flower1"></i></button>
          <button onClick={() => setShowMyLikes(!showMyLikes)}><i className="bi bi-signpost-split"></i></button>
      </div>

     
      <div className="MyPosts">

      {showMyPosts && (
        <>
          <Routes>
            <Route path="/profile" element={<PostsList />} />
          </Routes>
        </>
      )}

        {showMyPlants && (
          <>
            <Routes>
              <Route path="/profile" element={<PlantsList />} />
            </Routes>
          </>
        )}

        {showMyLikes && (
          <>
            <Routes>
              <Route path="/profile" element={<PostsList />} />
            </Routes>
          </>
        )}


      </div>

      <Navbar />
      
    </div>
  );
};

export default Profile;
