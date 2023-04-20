import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./Profile.css";
import PlantsList from "../../Plants/PlantsList/PlantsList";
import PostsList from "../../Posts/PostsList/PostsList";
import logo from "../../../assets/img/Logo.png";
import { logout } from "../../../stores/AccesTokenStore";
import {
  followUser,
  getOtherUser,
  unFollowUser,
} from "../../../services/UserService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showMyPlants, setShowMyPlants] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyLikes, setShowMyLikes] = useState(false);
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (userId && !user) {
      getOtherUser(userId)
        .then((u) => {
          setUser(u);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

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
      <img src={logo} />

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
            <div>
              <PostsList />
            </div>
            <p>
              Tengo que aplicar una lógica a getAllMyPosts para que me traiga
              los del usuario del perfil. Meter el userId en sus parámetros y
              luego ternaria en PostList de 'all? 'all' : mine ? 'mine' : 'user'
              y configurlo en PlantCard
            </p>
            <p>Estas card son las del currenUser</p>
          </div>
        </div>
      ) : (
        <div className="BlockProfile">
          <div className="ProfileData">
            <div>
              <p>{currentUser.followers.length}</p>
              <p>Seguidores</p>
            </div>

            <img className="ProfileImg" src={currentUser.image} />

            <div>
              <p>{currentUser.following.length}</p>
              <p>Siguiendo</p>
            </div>
          </div>

          <div className="ProfileData">
            <p>
              <Link to="/edit-profile"> Editar </Link>{" "}
            </p>
            <p>{currentUser.userName}</p>
            <button onClick={logout}> Cerrar </button>
          </div>

          <div className="ButtonsProfile">
            <button
              onClick={() => {
                setShowMyPosts(true);
                setShowMyPlants(false);
                setShowMyLikes(false);
              }}
            >
              <i className="bi bi-images"></i>
            </button>

            <button
              onClick={() => {
                setShowMyPosts(false);
                setShowMyPlants(true);
                setShowMyLikes(false);
              }}
            >
              <i className="bi bi-flower1"></i>
            </button>

            <button
              onClick={() => {
                setShowMyPosts(false);
                setShowMyPlants(false);
                setShowMyLikes(true);
              }}
            >
              <i className="bi bi-signpost-split"></i>
            </button>
          </div>

          <div>
            {showMyPosts ? (
              <div>
                <PostsList all={false} />
              </div>
            ) : null}

            {showMyPlants ? (
              <div>
                <PlantsList />
              </div>
            ) : null}

            {showMyLikes && !showMyPosts && !showMyPlants ? (
              <div>
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
