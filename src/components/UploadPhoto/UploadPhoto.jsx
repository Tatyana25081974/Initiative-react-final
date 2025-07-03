import React, { useState } from "react";
import css from "./UploadPhoto.module.css";

const UploadPhoto = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className={css.container}>
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className={css.preview} />
      ) : (
        <div className={css.placeholder}>No image selected</div>
      )}

      <label htmlFor="recipeImg" className={css.uploadButton}>
        Upload Photo
      </label>
      <input
        type="file"
        id="recipeImg"
        accept="image/*"
        onChange={handleChange}
        className={css.input}
      />
    </div>
  );
};

export default UploadPhoto;






































// import { useState } from "react";

// const UploadPhoto = () => {
//   // Стан для збереження вибраного файлу
//   const [image, setImage] = useState(null);

//   // Обробник для вибору файлу
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Перевірка чи файл є зображенням
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); // зберігаємо URL зображення
//       };
//       reader.readAsDataURL(file); // конвертуємо файл у base64
//     }
//   };

//   return (
//     <div>
//       {/* <label htmlFor="image-upload">Завантажте фото страви:</label> */}
//       <label htmlFor="image-upload"></label>
//       <input
//         type="file"
//         id="image-upload"
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//       {image && (
//         <div>
//           <img
//             src={image}
//             alt="Selected dish"
//             style={{ width: "200px", height: "auto" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadPhoto;
