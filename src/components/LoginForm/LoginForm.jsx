import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).max(32).required("Required"),
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const d = useDispatch();
  const nav = useNavigate();
  const { isAuthLoading } = useSelector((s) => s.auth);

  const submit = (v, a) => {
    const res = d(login(v));
    if (login.fulfilled.match(res)) nav("/");
    else toast.error(res.payload);
    a.setSubmitting(false);
  };

  return (
    <div className={css.authCard}>
      <h2 className={css.title}>Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            {/* Email */}
            <label className={css.label}>
              Enter your email address
              <Field
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className={css.input}
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
                  className={css.input}
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
