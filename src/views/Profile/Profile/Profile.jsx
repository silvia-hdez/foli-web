import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./Profile.css";
import PlantsList from "../../Plants/PlantsList/PlantsList";
import PostsList from "../../Posts/PostsList/PostsList";
import logo from "../../../assets/img/Logo.png";
import { logout } from "../../../stores/AccesTokenStore";
import { getOtherUser } from "../../../services/UserService";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyLikes, setShowMyLikes] = useState(false);
  const {userId} = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getOtherUser(userId)
      .then((user) => {
        setUser(user)
      })
      .catch((err) => console.log(err))
  }, [userId])

// const followers = user.followers.length
// const following = user.following.length
  return (
    <div className="Profile">
      <Navbar />
      <img src={logo} />

      <div className="ProfileData">
        <div>
          {/* <p>{followers}</p> */}
          <p>Seguidores</p>
        </div>

        <img className="ProfileImg" src={currentUser.image} />

        <div>
          {/* <p>{following}</p> */}
          <p>Siguiendo</p>
        </div>
      </div>

      {currentUser && (
        <div className="ProfileData">
        <p>
          <Link to="/edit-profile"> Editar </Link>
        </p>
        <p>{currentUser.userName}</p>
        <button onClick={logout}> Cerrar </button>
      </div>
      )}
      

      <div className="ButtonsProfile">
        <button onClick={() => setShowMyPosts(!showMyPosts)}>

          <i className="bi bi-images"></i>
        </button>
        <button onClick={() => setShowMyPlants(!showMyPlants)}>

          <i className="bi bi-flower1"></i>
        </button>
        <button onClick={() => setShowMyLikes(!showMyLikes)}>
          <i className="bi bi-signpost-split"></i>
        </button>
      </div>

      <div className="MyPosts">
        {showMyPosts && (
          <>
            <Routes>
              <Route path="/profile" element={<PostsList all={false}/>} />
            </Routes>
          </>
        )}
      </div>
      <div>
        {showMyPlants && (
          <>
            <Routes>
              <Route path="/profile" element={<PlantsList />} />
            </Routes>
          </>
        )}
      </div>
      <div>
        {showMyLikes && (
          <>
            <Routes>
              <Route path="/profile" element={<PostsList />} />
            </Routes>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
