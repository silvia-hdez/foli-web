import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { editCurrentUser } from "../../../services/UserService";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";
import Header from "../../../components/misc/Header/Header";
import { logout } from "../../../stores/AccesTokenStore";

const ProfileEdit = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUserData({
        fullName: currentUser.fullName,
        userName: currentUser.userName,
        userPhone: currentUser.userPhone,
        email: currentUser.email,
        image: currentUser.image,
      });
    }
  }, [currentUser]);

  //console.log('useEffect: ', currentUser)

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setUserData({ ...userData, [name]: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let data in userData) {
      formData.append(data, userData[data]);
      console.log("onSubmit: ", userData);
    }

    editCurrentUser(formData)
      .then((res) => {
        console.log("***** ", res);
        setCurrentUser(res);
        navigate("/profile");
      })
      .catch((err) => {
        err?.response?.data.message;
      });
  };

  return (
    <div className="EditProfile">
      <Header />
      <Navbar />
      <h2 style={{marginTop:'20px'}}>Editar Perfil</h2>

      <div className="UserContainer">
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="fullName" className="form-label"
            style={{marginRight:'8px'}}>
              Nombre
            </label>
            <input
              type="text"
              defaultValue={userData.fullName}
              style={{borderColor:'#dee2e6', borderRadius:'10px'}}
              name="fullName"
              id="fullName"
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <label htmlFor="userName" className="form-label"
             style={{marginRight:'8px'}}>
              Nombre Usuario
            </label>
            <input
              type="text"
              defaultValue={userData.userName}
              style={{borderColor:'#dee2e6', borderRadius:'10px'}}
              name="userName"
              id="userName"
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <label htmlFor="image" className="form-label" >
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleOnChange}
              className="form-control"
            ></input>
          </div>
          <div>
            <label htmlFor="userPhone" className="form-label">
              Phone number
            </label>
            <input
              type="text"
              defaultValue={userData.userPhone}
              name="userPhone"
              id="userPhone"
              onChange={handleOnChange}
              className="form-control"
            ></input>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', marginTop:'16px'}}>
            <button className="SubmitCreatePost" type="submit">
              Editar Perfil
            </button>
            <button className="SubmitCreatePost" onClick={logout}> Cerrar </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
