import React from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useFormik } from "formik";
import { createPost } from "../../../services/PostService";
import { postSchema } from "../../../schemas/post.schema";
import FormControl from "../../../components/misc/FormControl/FormControl";
import Input from "../../../components/misc/Input/Input";

const initialValues = {
  name: "",
  image: "",
  description: "",
  state: "Insta",
};

const CreatePost = (post) => {
  // const { currentUser } = useContext(AuthContext);
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
      console.log("Values:", values);

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
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      setSubmitting(false);
    },
  });

  return (
    <div>
      <Navbar />
      New Post
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FormControl
          text="Name"
          error={touched.name && errors.name}
          htmlFor="name"
        >
          <Input
            id="name"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            error={touched.name && errors.name}
            placeholder="Nombre de la planta"
          />
        </FormControl>

        <FormControl
          text="Photos"
          error={touched.image && errors.image}
          htmlFor="image"
        >
          <input
            id="image"
            name="image"
            type="file"
            multiple
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.files);
            }}
          />
        </FormControl>

        <FormControl
          text="Descripción"
          error={touched.description && errors.description}
          htmlFor="description"
        >
          <Input
            id="description"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
            error={touched.description && errors.description}
            placeholder="Descripción"
            type="textarea"
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
    </div>
  );
};

export default CreatePost;
