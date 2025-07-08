import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBox.module.css";

export const SearchBox = ({ setPage, setSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      toast.error("Please enter a recipe name.");
      return;
    }

    setPage(1);

    setSearch(searchQuery);

    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={handleChange}
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};
