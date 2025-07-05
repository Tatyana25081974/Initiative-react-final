import { useSelector } from "react-redux";
import { selectTotalPages } from "../../redux/recipes/selectors.js";

import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ page, setPage }) {
  const totalPages = useSelector(selectTotalPages);

  const handleClick = () => {
    setPage(page + 1);
  };

  return (
    page < totalPages && (
      <button type="button" className={css.button} onClick={handleClick}>
        Load more
      </button>
    )
  );
}
