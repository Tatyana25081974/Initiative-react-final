import { useId, useState } from "react";
import { Field, Form, Formik } from "formik";
import cameraIcon from "../../assets/images/camera.svg";
import Container from "../Container/Container.jsx";
import css from "./AddRecipeForm.module.css";

const AddRecipeForm = () => {
  const [preview, setPreview] = useState();
  const fieldId = useId();

  const initialValues = {
    recipeTitle: "",
    recipeDescr: "",
    cookingTime: "",
    photo: null,
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Container>
      <h1 className={css.mainTitle}>Add Recipe</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div className={css.inputContainer}>
              <h2 className={css.photoTitle}>Upload Photo</h2>
              <label className={css.labelPhoto} htmlFor={fieldId + "photo"}>
                {preview ? (
                  <img
                    className={css.previewPhoto}
                    src={preview}
                    alt="preview"
                  />
                ) : (
                  <img className={css.iconPhoto} src={cameraIcon} alt="icon" />
                )}
              </label>
              <input
                className={css.inputPhoto}
                id={fieldId + "photo"}
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  if (file) {
                    if (preview) {
                      URL.revokeObjectURL(preview);
                    }
                    const objectUrl = URL.createObjectURL(file);
                    setFieldValue("photo", file);
                    setPreview(objectUrl);
                  }
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddRecipeForm;
