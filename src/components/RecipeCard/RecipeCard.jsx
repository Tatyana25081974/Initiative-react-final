import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "redux/auth/selectors";
import SaveAuthModal from "components/SaveAuthModal/SaveAuthModal";
import { useState } from "react";

function RecipeCard({ recipe }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showModal, setShowModal] = useState(false);

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    // логика збереження рецепту
  };

  return (
    <>
      <div className="card">
        <button onClick={handleSaveClick}>Save</button>
      </div>
      <SaveAuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
