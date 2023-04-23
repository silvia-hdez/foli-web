import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./Profile.css";
import PlantsList from "../../Plants/PlantsList/PlantsList";
import PostsList from "../../Posts/PostsList/PostsList";
import logo from "../../../assets/img/Logo.png";

import {
  followUser,
  getOtherUser,
  unFollowUser,
} from "../../../services/UserService";
import Header from "../../../components/misc/Header/Header";
import { getAllMyPosts, getAllPosts } from "../../../services/PostService";
import MyPostCard from "../../../components/MyPostCard/MyPostCard";
import PlantCard from "../../../components/PlantCard/PlantCard";
import { getSavePosts, getSavedPlants } from "../../../services/SaveService";
import MyPlantCard from "../../../components/MyPlantCard/MyPlantCard";
import MyPostSaved from "../../../components/MyPostSaved/MyPostSaved";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyLikes, setShowMyLikes] = useState(false);
  const [activeButton, setActiveButton] = useState("posts");
  const [myPosts, setMyPosts] = useState([]);
  const [savedPlants, setSavedPlants] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (userId && !user) {
      getOtherUser(userId)
        .then((u) => {
          setUser(u);
        })
        .catch((err) => console.log(err));
    } else if (!userId) {
      console.log(currentUser)
      getAllMyPosts()
        .then((posts) => {
          setMyPosts(posts);
          getSavedPlants().then((plants) => {
            setSavedPlants(plants)
            getSavePosts().then((p) => {
              setSavedPosts(p)
            })
          })
        })
        .catch((error) => console.log(error));
    }
  }, [user, currentUser]);

  const handleFollowUser = () => {
    if (user.followers.includes(currentUser.id)) {
      unFollowUser(userId)
        .then((response) => {
          setUser(response.data);
        })

        .catch((error) => console.log(error));
    } else {
      followUser(userId)
        .then((response) => {
          setUser(response.data);
        })

        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="Profile">
      <Navbar />
      {/* <img src={logo} /> */}
      <Header />
      {/* Perfil de otro usuario */}
      {userId && user  ? (
        <div className="BlockProfile">
          <div className="ProfileData">
            <div>
              <p>{user.followers.length}</p>
              <p>Seguidores</p>
            </div>

            <img className="ProfileImg" src={user.image} />

            <div>
              <p>{user.following.length}</p>
              <p>Siguiendo</p>
            </div>
          </div>

          <div className="ProfileData">
            <button onClick={handleFollowUser}>
              {user && user.followers.includes(currentUser.id)
                ? "Unfollow"
                : "Follow"}
            </button>
            <p>{user.userName}</p>
            <button>Mensaje</button>
          </div>

          <>Publicaciones</>

          <div className="Publications">
            {user  ? (
              <div className="ShowMyPosts">
                {user.posts.map((post) => {
                  return <MyPostCard key={post._id} post={post} />;
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="BlockProfile">
          {/* Mi perfil */}
          <div className="ProfileData">
            <Link to={`/profile/${currentUser.id}/followers`}
            style={{textDecoration:'none'}}>
              <div className="FollowsDiv">
                <p>{currentUser.followers.length}</p>
                <p>Seguidores</p>
              </div>
            </Link>

            <Link to="/edit-profile">
              <img className="ProfileImg" src={currentUser.image} />
            </Link>
            <Link to={`/profile/${currentUser.id}/following`}
            style={{textDecoration:'none'}}>
              <div className="FollowsDiv">
                <p>{currentUser.following.length}</p>
                <p>Siguiendo</p>
              </div>
            </Link>
          </div>

          <div className="ProfileData">
            <p>{currentUser.userName}</p>
          </div>

          <div className="ButtonsProfile">
            <button
              className={activeButton === "posts" ? "active" : ""}
              onClick={() => {
                setShowMyPosts(true);
                setShowMyPlants(false);
                setShowMyLikes(false);
                setActiveButton("posts");
              }}
            >
              <i className="bi bi-images"></i>
            </button>

            <button
              className={activeButton === "plants" ? "active" : ""}
              onClick={() => {
                setShowMyPosts(false);
                setShowMyPlants(true);
                setShowMyLikes(false);
                setActiveButton("plants");
              }}
            >
              <i className="bi bi-flower1"></i>
            </button>

            <button
              className={activeButton === "likes" ? "active" : ""}
              onClick={() => {
                setShowMyPosts(false);
                setShowMyPlants(false);
                setShowMyLikes(true);
                setActiveButton("likes");
              }}
            >
              <i className="bi bi-bookmarks"></i>
            </button>
          </div>

            {showMyPosts ? (
              <div className="ShowMyPosts">
                {myPosts.map((post) => {
                  return <MyPostCard key={post._id} post={post} />;
                })}
              </div>
            ) : null}

            {showMyPlants ? (
              <div className="showMyPlants">
              {savedPlants.map((p) => {                    
                    return <MyPlantCard key={p.plant._id} plant={p.plant} />;
                })}
                {/* <PlantsList /> */}
              </div>
            ) : null}

            {showMyLikes && !showMyPosts && !showMyPlants ? (
              <div className="ShowMyPostsSaved">
              {savedPosts.map((p) => {        
                console.log(p)            
                    return <MyPostSaved key={p.post._id} post={p.post} />;
                })}
              </div>
            ) : null}
        </div>
      )}
    </div>
  );
};

export default Profile;
