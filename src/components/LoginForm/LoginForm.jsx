import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import clsx from "clsx";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).max(32).required("Required"),
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const d = useDispatch();
  const nav = useNavigate();
  const { isAuthLoading } = useSelector((s) => s.auth);

  const submit = async (v, { setFieldError }, a) => {
    try {
      const res = await d(login(v)).unwrap();
      if (login.fulfilled.match(res)) nav("/");
      else toast.error(res.payload);
      a.setSubmitting(false);
    } catch (err) {
      if (err === "User not found") {
        setFieldError("password", "This user does not exist");
      } else if (err === "Unauthorized") {
        setFieldError(
          "password",
          "The email or password that you entered is incorrect"
        );
      } else {
        toast.error(
          "Ooops. Something went wrong. Please reload the page and try again."
        );
      }
    }
  };

  return (
    <div className={css.authCard}>
      <h2 className={css.title}>Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={submit}
      >
        {({ isSubmitting, errors, setFieldError }) => (
          <Form className={css.form}>
            {/* Email */}
            <label className={css.label}>
              Enter your email address
              <Field
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className={clsx(css.input, errors.password && css.errorInput)}
                onFocus={() => setFieldError("password", "")}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>

            {/*   Password + eye   */}
            <div className={css.inputWrap}>
              <label className={css.label}>
                Create a strong password
                <Field
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="********"
                  className={clsx(css.input, errors.password && css.errorInput)}
                  onFocus={() => setFieldError("password", "")}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </label>

              {/* Кнопка‑іконка */}
              <button
                type="button"
                className={css.eyeBtn}
                onClick={() => setShowPass((p) => !p)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {/* {showPass ? <EyeOff size={24} /> : <Eye size={24} />} */}
                <img
                  src={showPass ? "/images/eyeoff.svg" : "/images/eye.svg"}
                  alt=""
                  className={css.eyeIcon}
                />
              </button>
            </div>

            {/*   Submit   */}
            <button
              type="submit"
              disabled={isSubmitting || isAuthLoading}
              className={css.submit}
            >
              {isAuthLoading ? "Loading…" : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.switchText}>
        Don&apos;t have an account? <Link to="/auth/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
