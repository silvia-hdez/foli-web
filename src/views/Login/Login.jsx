import { useFormik } from 'formik';
import FormControl from '../../components/misc/FormControl/FormControl';
import Input from '../../components/misc/Input/Input';
import { loginSchema } from './schemas/login.schema';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    const {values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting} = useFormik({
        initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: (values) => {
        console.log(values);
    }
})

    return(
        <div>
            <h1>Login</h1>

<form onSubmit={handleSubmit}>
  <FormControl text="Email" error={touched.email && errors.email} htmlFor="email">
    <Input
      id="email"
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      error={touched.email && errors.email}
      placeholder="Enter your email..."
    />
  </FormControl>

  <FormControl text="Password" error={touched.password && errors.password} htmlFor="password">
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

  <button className="btn btn-primary" type="submit">
    {isSubmitting
      ? 'Submitting...'
      : 'Submit'
    }
  </button>
</form>
        </div>
    )
}

export default Login