import { useState } from "react";
// import toast from "react-hot-toast";
import css from "./SearchBox.module.css";

export const SearchBox = ({
  setPage,
  setSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const [hasError, setHasError] = useState(false);

  // const handleChange = (e) => {
  //   setSearchQuery(e.target.value);
  //   if (hasError) {
  //     setHasError(false); // Скидання помилки при зміні
  //   }
  // };
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (hasError && value.trim() !== "") {
      setHasError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      setHasError(true); // Позначити помилку
      // toast.error("Please enter a recipe name.");
      return;
    }

    setPage(1);
    setSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.inputGroup}>
        <label className={css.label}>
          <input
            type="text"
            placeholder="Search recipes"
            value={searchQuery}
            onChange={handleChange}
            className={`${css.input} ${hasError ? css.inputError : ""}`}
          />
        </label>
        {hasError && (
          <span className={css.errorText}>Search field can not be empty.</span>
        )}
      </div>
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};
