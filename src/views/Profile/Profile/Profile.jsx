import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./Profile.css";
import PlantsList from "../../Plants/PlantsList/PlantsList";
import PostsList from "../../Posts/PostsList/PostsList";
import logo from "../../../assets/img/Logo.png";
import { logout } from "../../../stores/AccesTokenStore";
import { followUser, getOtherUser, unFollowUser } from "../../../services/UserService";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyLikes, setShowMyLikes] = useState(false);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false)
 // const [copyCurrentUser, setCopyCurrentUser] = useState(currentUser)


  useEffect(() => {
    if (userId && !user) {
      getOtherUser(userId)
      .then((u) => {
        setUser(u)
      
      })
      .catch((err) => console.log(err))
    }
  }, [user])


  const handleFollowUser = () => {
    if(user.followers.includes(currentUser.id)) {
      unFollowUser(userId)
      .then((response) => {
        setUser(response.data); 
        
      })

      .catch((error) => console.log(error));
    } else { 
      followUser(userId)
        .then((response) => {
          setUser(response.data)
          console.log('user', user)
          console.log('current', currentUser)
        })

        .catch((error) => console.log(error));
    }
    }

  return (
    <div className="Profile">
      <Navbar />
      <img src={logo} />
      <div className="ProfileData">
        <div>
      

        {/* {!currentUser ? {followers} : {followersCurrent}} */}
          {/* <p>{followers}</p> */}
          <p>Seguidores</p>
        </div>

        <img className="ProfileImg" src={currentUser.image} />

        <div>
          {/* <p>{following}</p> */}
          <p>Siguiendo</p>
        </div>
      </div>

    <button onClick={handleFollowUser}>{user && user.followers.includes(currentUser.id) ? 'Unfollow' : 'Follow'}</button>

      {currentUser && (
        <div className="ProfileData">
          <p>
            <Link to="/edit-profile"> Editar </Link>
          </p>

          
          {(userId && user)? (<p>{user.userName}</p>) :
          (<p>{currentUser.userName}</p>) }


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

      <div>
        {showMyPosts && <PostsList all={false} />}
        {showMyPosts && <PlantsList />}
        {showMyPosts && <PostsList />}
      </div>
    </div>
  );
};

export default Profile;
