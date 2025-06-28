// import css from "./AuthPage.module.css";

import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";

const AuthPage = () => {
  const { authType } = useParams();
  // console.log(authType);

  return (
    <div>
      {authType === "login" && (
        <>
          <p>Login</p>
          <LoginForm />
        </>
      )}
      {authType === "register" && (
        <>
          <p>Register</p>
          <RegisterForm />
        </>
      )}

      {!["login", "register"].includes(authType) && <NotFound />}
    </div>
  );
};

export default AuthPage;
