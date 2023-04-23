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

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyLikes, setShowMyLikes] = useState(false);
  const [activeButton, setActiveButton] = useState("posts");
  const [myPosts, setMyPosts] = useState([]);
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
      getAllMyPosts()
        .then((posts) => {
          setMyPosts(posts);
        })
        .catch((error) => console.log(error));
      console.log("myposts", myPosts);

      console.log("user", userId);
      console.log("current", currentUser);
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
          console.log("user", user);
          console.log("current", currentUser);
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
      {userId && user ? (
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
            {user ? (
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
            <div>
              <p>{currentUser.followers.length}</p>
              <p>Seguidores</p>
            </div>

            <Link to="/edit-profile">
              <img className="ProfileImg" src={currentUser.image} />
            </Link>
            <div>
              <p>{currentUser.following.length}</p>
              <p>Siguiendo</p>
            </div>
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

          <div>
            {showMyPosts ? (
              <div className="ShowMyPosts">
                {myPosts.map((post) => {
                  return <MyPostCard key={post._id} post={post} />;
                })}
              </div>
            ) : null}

            {showMyPlants ? (
              <div>
                <PlantsList />
              </div>
            ) : null}

            {showMyLikes && !showMyPosts && !showMyPlants ? (
              <div className="ShowMyPostsSaved">
                <PostsList />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
