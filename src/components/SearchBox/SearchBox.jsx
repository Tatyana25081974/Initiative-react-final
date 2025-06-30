import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBox.module.css";

export const SearchBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a recipe name.");
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.API_BASE_URL // Тимчасова змінна середовища, пізніше змінити
        }/api/recipes?search=${trimmedQuery}` //get-запит на бекенд
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (data.length === 0) {
        toast("No recipes found for your query.");
        onSearch([]); // Очищаємо попередні результати
        return;
      }

      onSearch(data); // передаємо рецепти до батьківського компонента
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
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
