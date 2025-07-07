import css from "./NetworkError.module.css";

export const NetworkError = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.errorBox}>
        <p className={css.mainText}>Network error</p>
        <p className={css.subText}>Pls reload the page</p>
      </div>
    </div>
  );
};
