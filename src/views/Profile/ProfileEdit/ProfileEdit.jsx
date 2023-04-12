import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import { signupSchema } from "../../../schemas/signup.schema";
import { editCurrentUser } from "../../../services/UserService";
import FormControl from "../../../components/misc/FormControl/FormControl";
import Input from "../../../components/misc/Input/Input";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

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
        // image: currentUser.image
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
    <div>
      <Navbar />
      <h1>Editar Perfil</h1>

      <div className="user-data-container">
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="fullName" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              defaultValue={userData.fullName}
              name="fullName"
              id="fullName"
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <label htmlFor="userName" className="form-label">
              Nombre Usuario
            </label>
            <input
              type="text"
              defaultValue={userData.userName}
              name="userName"
              id="userName"
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <label htmlFor="image" className="form-label">
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

          <button className="btn btn-primary" type="submit">
            Editar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
