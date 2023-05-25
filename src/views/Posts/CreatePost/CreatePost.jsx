import React, { useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useFormik } from "formik";
import { createPost } from "../../../services/PostService";
import { postSchema } from "../../../schemas/post.schema";
import FormControl from "../../../components/misc/FormControl/FormControl";
import Input from "../../../components/misc/Input/Input";
import { useNavigate } from "react-router-dom";
import './CreatePost.css'
import Header from "../../../components/misc/Header/Header";


const initialValues = {
  name: "",
  image: "",
  description: "",
  state: "Insta",
};

const CreatePost = (post) => {
  const navigate = useNavigate()


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: postSchema,
    onSubmit: (values) => {
      // console.log("Values:", values);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "image") {
          [...values["image"]].forEach((img, i) => {
            formData.append(`img-${i}`, img);
          });
        } else {
          formData.append(key, values[key]);
        }
        
      });


      createPost(formData)
      .then((response) => {

        navigate("/profile")
      })
      .catch((err) => {
        console.log(err);
      });
      

      
    setSubmitting(false);

    },
  });

  return (
    <div className="CreatePost">
     <Header/>
      <Navbar />
      <p style={{marginTop:'20px', fontSize:'30px'}}>Create a New Post</p>
      
      <form className="FormCreatePost" onSubmit={handleSubmit} encType="multipart/form-data">
        <label 
          text="Name"
          error={touched.name && errors.name}
          htmlFor="name"
        > Name 
          <Input
            id="name"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            error={touched.name && errors.name}
            placeholder="Nombre de la planta"
          />
        </label>

        <label
          text="Photos"
          error={touched.image && errors.image}
          htmlFor="image"
        > Photos
          <input
            id="image"
            name="image"
            type="file"
            multiple
            className="form-control"
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.files);
            }}
          />
        </label>

        <button
          className="SubmitCreatePost"
          type="submit"
          disabled={isSubmitting}
        >

          {isSubmitting ? "Submitting..." : "Submit"}

          
        </button>
      </form>

    </div>
  );
};

export default CreatePost;
