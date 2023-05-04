import React, { useState } from 'react';
import { signup as signupService } from "../../services/AuthService";
import { useFormik } from "formik";
import { signupSchema } from '../../schemas/signup.schema';
import FormControl from '../../components/misc/FormControl/FormControl';
import Input from '../../components/misc/Input/Input';
import { Link, Navigate } from 'react-router-dom';



const initialValues = {
    fullName: "",
    userName: "",
    userPhone: "",
    email: "",
    password: ""
}

const SignUp = () => {
    let [signedUp, setSignedUp] = useState(false)
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setFieldError
      } = useFormik({
        initialValues: initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: signupSchema,
        onSubmit: (values) => {
          signupService({ email: values.email, password: values.password, fullName: values.fullName,
                        userName: values.userName, userPhone: values.userPhone }) 
            .then((response) => {
            //   console.log(JSON.stringify(response))
              setSignedUp(true)
            })
            .catch((err) => {
                if (err?.response?.data?.message) {
                    setFieldError("email", err?.response?.data?.message);
                  } else {
                    setFieldError("email", err.message);
                  }
                setSubmitting(false);
            });
        },
      });
    

    return (
        <div className="Login">

        <div className="BoxLogin">

        
            <h1>Create your account</h1>

            <form onSubmit={handleSubmit}>
                <FormControl text= "Full Name" error={touched.fullName && errors.fullName} htmlFor="fullName">
                    <Input id="fullName" name="fullName" onBlur={handleBlur}
                        onChange={handleChange} value={values.fullName} error={touched.fullName && errors.fullName}
                        placeholder="Full Name" 
                    />
                </FormControl>

                <FormControl text= "User Name" error={touched.userName && errors.userName} htmlFor="userName">
                    <Input id="userName" name="userName" onBlur={handleBlur}
                        onChange={handleChange} value={values.userName} error={touched.userName && errors.userName}
                        placeholder="User Name" 
                    />
                </FormControl>

                <FormControl text= "Phone" error={touched.userPhone && errors.userPhone} htmlFor="userPhone">
                    <Input id="userPhone" name="userPhone" onBlur={handleBlur}
                        onChange={handleChange} value={values.userPhone} error={touched.userPhone && errors.userPhone}
                        placeholder="Phone" 
                    />
                </FormControl>

                
                <FormControl text= "Email" error={touched.email && errors.email} htmlFor="email">
                    <Input id="email" name="email" onBlur={handleBlur}
                        onChange={handleChange} value={values.email} error={touched.email && errors.email}
                        placeholder="Email" 
                    />
                </FormControl>

                <FormControl text= "Password" error={touched.password && errors.password} htmlFor="password">
                    <Input id="password" name="password" onBlur={handleBlur}
                        onChange={handleChange} value={values.password} error={touched.password && errors.password}
                        placeholder="*******" type='password'
                    />
                </FormControl>

                <button
                    className="SubmitCreatePost"
                    type="submit"
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            </form>
            {signedUp && <Navigate to="/login" />}
            <div className="LinkRegistro">
        <p>Have an account already?</p>
        <Link className="LinkLogin" to='/login'>Log in</Link>
      </div>
      </div>
        </div>
    );
};

export default SignUp;