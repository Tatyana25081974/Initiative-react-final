import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";

const registerSchema = Yup.object({
  name: Yup.string().min(2).max(32).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).max(32).required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  terms: Yup.boolean().oneOf([true], "Required"),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthLoading } = useSelector((s) => s.auth);

  const handleSubmit = async (values, actions) => {
    const { confirmPassword: _CONFIRM, ...payload } = values;
    const res = await dispatch(register(payload));

    if (register.fulfilled.match(res)) navigate("/");
    else toast.error(res.payload);
    actions.setSubmitting(false);
  };

  return (
    <div className={css.authCard}>
      <h2 className={css.title}>Register</h2>
      <h3 className={css.title3}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </h3>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            {/*   Name  */}
            <label className={css.label}>
              Enter your name
              <Field
                name="name"
                type="text"
                placeholder="Max"
                className={css.input}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </label>

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

            {/*  Password  */}
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

              <button
                type="button"
                className={css.eyeBtn}
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/*  Confirm Password */}
            <div className={css.inputWrap}>
              <label className={css.label}>
                Repeat your password
                <Field
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="********"
                  className={css.input}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={css.error}
                />
              </label>

              <button
                type="button"
                className={css.eyeBtn}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/*  Terms */}
            <label className={css.checkboxRow}>
              <Field type="checkbox" name="terms" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
            <ErrorMessage name="terms" component="span" className={css.error} />

            {/*  Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isAuthLoading}
              className={css.submit}
            >
              {isAuthLoading ? "Loading…" : "Create account"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.switchText}>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
