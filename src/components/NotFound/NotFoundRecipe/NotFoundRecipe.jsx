import css from "./NotFoundRecipe.module.css";

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <div className={css.errorBox}>
        <h2 className={css.title}>We couldn't find that recipe</h2>
        <p className={css.text}>
          Sorry, we couldn’t find the recipe you’re looking for. It may have
          been deleted or moved.
        </p>
      </div>
    </div>
  );
}
