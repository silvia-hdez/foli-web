import * as Yup from "yup";

export const postSchema = Yup.object({
  name: Yup.string("Name err").required("Required"),
  image: Yup.mixed().required("Required"),
  user: Yup.string("user err"),
  description: Yup.string("Description err"),
  comments: Yup.string("Comments err"),
  state: Yup.string("State err"),
});
