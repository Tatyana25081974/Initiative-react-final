import css from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={css.container}>
      <img className={css.image} src="/src/assets/images/Logo.svg" alt="logo" />
      <p className={css.text}>Tasteorama</p>
    </div>
  );
}
