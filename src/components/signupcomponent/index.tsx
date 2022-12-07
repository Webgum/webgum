import styles from "./signup.module.scss";
import { Formik } from "formik";
import Link from "next/link";

interface Values {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpComponent = () => {
  return (
    <div className={styles.container}>
      <h1>Hello!!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, vitae
        consequuntur eligendi
        Sequi, vitae consequuntur eligendi
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values: Values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "Required";
          } else if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password should exceed 6 characters";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Your passwords should tally";
          } else if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values: Values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="text"
              name="name"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword}
            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </form>
        )}
      </Formik>
      <Link href="/login">Existing User?</Link>
    </div>
  );
};

export default SignUpComponent;
