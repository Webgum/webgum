import { Formik } from "formik";
import Link from "next/link";
import styles from "./signin.module.scss";

interface Values {
  name: string;
  email: string;
  password: string;
}

const SignInComponent = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome Back!!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, vitae
        consequuntur eligendi Sequi, vitae consequuntur eligendi
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validate={(values: Values) => {
          const errors: any = {};
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password should exceed 6 characters";
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
            {errors.email && (
              <div className={styles.errormessage}>
                {errors.email && touched.email && errors.email}
              </div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && (
              <div className={styles.errormessage}>
                {errors.password && touched.password && errors.password}
              </div>
            )}
            <div className={styles.btns}>
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
              <button type="submit" disabled={isSubmitting}>
                Sign In With Google
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.walletbtn}
              >
                Connect Wallet
              </button>
            </div>
          </form>
        )}
      </Formik>
      <Link href="/register">New User?</Link>
    </div>
  );
};

export default SignInComponent;
