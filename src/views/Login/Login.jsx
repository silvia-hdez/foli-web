import { useFormik } from "formik";
import FormControl from "../../components/misc/FormControl/FormControl";
import Input from "../../components/misc/Input/Input";
import { loginSchema } from "../../schemas/login.schema";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { login as loginService } from "../../services/AuthService";
import { Link } from "react-router-dom";
import './Login.css'

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useContext(AuthContext);

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
    validationSchema: loginSchema,
    onSubmit: (values) => {
      //console.log(JSON.stringify(values))
      loginService({ email: values.email, password: values.password }) 
        .then((response) => {
          login(response.accessToken);
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
      
      <h1>Inicia Sesión</h1>

      <form onSubmit={handleSubmit}>
        <FormControl className="FormControl"
          text="Email"
          error={touched.email && errors.email}
          htmlFor="email"
        >
          <Input className="Input"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
            placeholder="Enter your email..."
          />
        </FormControl>

        <FormControl className="FormControl"
          text="Password"
          error={touched.password && errors.password}
          htmlFor="password"
        >
          <Input
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
            placeholder="Enter your password..."
            type="password"
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
      <div className="LinkRegistro">
        <p>¿No tienes una cuenta?</p>
        <Link className="LinkLogin" to='/sign-up'>Regístrate</Link>
      </div>
      
      </div>
    </div>
  );
};

export default Login;
