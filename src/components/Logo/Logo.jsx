import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import logo from "../../assets/images/Logo.svg";

export default function Logo() {
  return (
    <Link to="/" className={css.container}>
      <img className={css.image} src={logo} alt="Tasteorama Logo" />
      <p className={css.text}>Tasteorama</p>
    </Link>
  );
}
