// import css from "./OwnPage.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";

const OwnPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnRecipes());
  }, [dispatch]);

  return (
    <>
      <p>OwnPage</p>
    </>
  );
};

export default OwnPage;
