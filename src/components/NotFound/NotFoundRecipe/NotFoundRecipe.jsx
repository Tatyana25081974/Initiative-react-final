import css from "./NotFoundRecipe.module.css";

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>404 — Not Found</h2>
      <p className={css.text}>
        Sorry, we couldn’t find the recipe you’re looking for. It may have been
        deleted or moved.
      </p>
    </div>
  );
}
