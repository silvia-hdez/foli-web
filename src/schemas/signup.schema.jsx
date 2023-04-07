import * as Yup from "yup";

export const signupSchema = Yup.object({
  email: Yup
    .string("Email err")
    .email("Invalid email")
    .required("Required"),
  password: Yup
    .string("Password err")
    .min(8, "Length invalid")
    .required("Required"),
  fullName: Yup
    .string("FullName err"),
  userName: Yup   
    .string("UserName err")
    .min(6, "Length invalid"),
   userPhone: Yup
    .string("Phone err")
    .required("Required")
    .min(9, "Length invalid")
});
