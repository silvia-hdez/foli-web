import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Navbar from "../components/misc/NavBar/NavBar";

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div>
      <Navbar />
      <h1>Profile of {currentUser.userName}</h1>
    </div>
  )
}

export default Profile;