import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import { signupSchema } from "../../../schemas/signup.schema";
import { editCurrentUser } from "../../../services/UserService";
import FormControl from "../../../components/misc/FormControl/FormControl";
import Input from "../../../components/misc/Input/Input";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { Navigate } from "react-router-dom";

const ProfileEdit = () => {
  const { currentUser } = useContext(AuthContext);

  const initialValues = {
    fullName: currentUser.fullName,
    userName: currentUser.userName,
    userPhone: currentUser.userPhone,
    email: currentUser.email,
    image: "",
  };

  const [editedProfile, setEditedProfile] = useState(false);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
    setFieldValue
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      editCurrentUser(currentUser.id, values)
        .then((response) => {
          console.log(JSON.stringify(response));
          setEditedProfile(true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <Navbar />
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <FormControl
          text="Nombre Completo"
          error={touched.fullName && errors.fullName}
          htmlFor="fullName"
        >
          <Input
            id="fullName"
            name="fullName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.fullName}
            error={touched.fullName && errors.fullName}
            placeholder={initialValues.fullName}
          />
        </FormControl>

        <FormControl
          text="Nombre de usuario"
          error={touched.userName && errors.userName}
          htmlFor="userName"
        >
          <Input
            id="userName"
            name="userName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.userName}
            error={touched.userName && errors.userName}
            placeholder={initialValues.userName}
          />
        </FormControl>

        <FormControl
          text="Teléfono"
          error={touched.userPhone && errors.userPhone}
          htmlFor="userPhone"
        >
          <Input
            id="userPhone"
            name="userPhone"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.userPhone}
            error={touched.userPhone && errors.userPhone}
            placeholder={initialValues.userPhone}
          />
        </FormControl>

        <FormControl
          text="Email"
          error={touched.email && errors.email}
          htmlFor="email"
        >
          <Input
            id="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={touched.email && errors.email}
            placeholder={currentUser.email}
            disabled
          />
        </FormControl>

        <FormControl
          text="Image"
          error={touched.image && errors.image}
          htmlFor="image"
        >
          <Input
            id="image"
            name="image"
            type="file"
            onBlur={handleBlur}
            value={values.image}
            error={touched.image && errors.image}
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.file);
            }}
          />
        </FormControl>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {editedProfile && <Navigate to="/profile" />}
    </div>
  );
};

export default ProfileEdit;
