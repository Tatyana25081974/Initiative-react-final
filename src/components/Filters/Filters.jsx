import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import css from "./Filters.module.css";

const Filters = ({ onChangeFilters, recipesCount }) => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  // Запит для отримання списку категорій з бекенду

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://initiative-nodejs-final.onrender.com/api/categories"
        );
        const data = await res.json();
        setCategories(data); // Зберігаємо список у стейт
      } catch {
        toast.error("Failed to load categories"); // Повідомлення при помилці
      }
    };

    fetchCategories();
  }, []);

  // Запит для отримання списку інгредієнтів з бекенду
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(
          "https://initiative-nodejs-final.onrender.com/api/ingredients"
        );
        const data = await res.json();
        setIngredients(data); // Зберігаємо список у стейт
      } catch {
        toast.error("Failed to load ingredients"); // Повідомлення при помилці
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    onChangeFilters({
      category: selectedCategory,
      ingredient: selectedIngredient,
    });
  }, [selectedCategory, selectedIngredient, onChangeFilters]);

  // Обробник для кнопки Reset
  const handleReset = () => {
    setSelectedCategory(""); // Скидаємо категорію
    setSelectedIngredient(""); // Скидаємо інгредієнт
  };

  return (
    <div className={css.container}>
      <p className={css.recipesCount}>{recipesCount} recipes</p>

      <div className={css.filtersContainer}>
        <button onClick={handleReset} className={css.resetButton}>
          Reset filters
        </button>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={css.select}
        >
          <option value="">Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
          className={css.select}
        >
          <option value="">Ingredient</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient._id} value={ingredient.name}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Filters;
