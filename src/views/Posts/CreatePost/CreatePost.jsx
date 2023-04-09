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
  state: 'Insta'  
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
      createPost({name: values.name, image: values.image, description: values.description, state: values.state})
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
          error={touched.images && errors.image}
          htmlFor="images"
        >
          <input
            id="images"
            name="images"
            type="file"
            multiple
            onChange={(event) => {
              setFieldValue("images", event.currentTarget.files[0]);
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
