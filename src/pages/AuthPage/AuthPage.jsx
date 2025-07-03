import { useParams, Navigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = () => {
  const { authType } = useParams();
  if (authType === "register") return <RegisterForm />;
  if (authType === "login") return <LoginForm />;
  return <Navigate to="/auth/login" replace />;
};
export default AuthPage;
