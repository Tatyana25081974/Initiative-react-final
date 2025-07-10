import { useDispatch } from "react-redux";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { addRefreshPath } from "../../redux/auth/slice.js";

const AddRecipePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const refreshPath = location.pathname;

  useEffect(() => {
    dispatch(addRefreshPath(refreshPath));
  });

  return (
    <>
      <AddRecipeForm />
    </>
  );
};

export default AddRecipePage;
