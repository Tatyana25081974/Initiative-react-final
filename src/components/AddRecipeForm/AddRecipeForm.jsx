import { useId, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import cameraIcon from "../../assets/images/addRecipes/camera.svg";
import deleteIcon from "../../assets/images/addRecipes/delete.svg";
import Container from "../Container/Container.jsx";
import clsx from "clsx";
import css from "./AddRecipeForm.module.css";

const AddRecipeForm = () => {
  const [preview, setPreview] = useState();
  const [isOpenCategorySelect, setIsOpenCategorySelect] = useState(false);
  const [isOpenIngredientSelect, setIsOpenIngredientSelect] = useState(false);
  const fieldId = useId();

  const initialValues = {
    recipeTitle: "",
    recipeDescr: "",
    cookingTime: "",
    calories: "",
    category: "",
    photo: null,
    ingredients: [],
    ingredientName: "",
    amount: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Container>
      <h1 className={css.mainTitle}>Add Recipe</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form className={css.form}>
            <div className={css.photoContainer}>
              <h2 className={css.sectionTitle}>Upload Photo</h2>
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

            <div className={css.mainFormContainer}>
              <div className={css.generalContainer}>
                <h2 className={clsx(css.sectionTitle, css.mbGeneralTitle)}>
                  General Information
                </h2>

                <div className={css.inputFieldsContainer}>
                  <label
                    className={css.fieldsTitle}
                    htmlFor={fieldId + "recipeTitle"}
                  >
                    Recipe Title
                  </label>
                  <Field
                    className={css.formFields}
                    id={fieldId + "recipeTitle"}
                    type="text"
                    name="recipeTitle"
                    placeholder="Enter the name of your recipe"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="recipeTitle"
                    component="span"
                  />
                </div>

                <div className={css.inputFieldsContainer}>
                  <label
                    className={css.fieldsTitle}
                    htmlFor={fieldId + "recipeDescr"}
                  >
                    Recipe Description
                  </label>
                  <Field
                    className={clsx(css.formFields, css.textarea)}
                    id={fieldId + "recipeDescr"}
                    as="textarea"
                    name="recipeDescr"
                    placeholder="Enter a brief description of your recipe"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="recipeDescr"
                    component="span"
                  />
                </div>

                <div className={css.inputFieldsContainer}>
                  <label
                    className={css.fieldsTitle}
                    htmlFor={fieldId + "cookingTime"}
                  >
                    Cooking time in minutes
                  </label>
                  <Field
                    className={css.formFields}
                    id={fieldId + "cookingTime"}
                    type="text"
                    name="cookingTime"
                    placeholder="10"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="cookingTime"
                    component="span"
                  />
                </div>

                <div className={css.selectFieldsContainer}>
                  <div className={css.subInputFieldsContainer}>
                    <label
                      className={css.fieldsTitle}
                      htmlFor={fieldId + "calories"}
                    >
                      Calories
                    </label>
                    <Field
                      className={css.formFields}
                      id={fieldId + "calories"}
                      type="text"
                      name="calories"
                      placeholder="150 cals"
                    />

                    <ErrorMessage
                      className={css.errorMessages}
                      name="calories"
                      component="span"
                    />
                  </div>

                  <div
                    className={clsx(
                      css.subInputFieldsContainer,
                      css.selectWrapper
                    )}
                  >
                    <label
                      className={css.fieldsTitle}
                      htmlFor={fieldId + "category"}
                    >
                      Category
                    </label>
                    <div className={css.selectContainer}>
                      <Field
                        className={clsx(css.formFields, css.customSelect)}
                        id={fieldId + "category"}
                        as="select"
                        name="category"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setIsOpenCategorySelect(true);
                          }
                        }}
                        onBlur={() => setIsOpenCategorySelect(false)}
                        onClick={() => setIsOpenCategorySelect((prev) => !prev)}
                      >
                        <option>Soup</option>
                      </Field>
                      <span
                        className={clsx(css.arrow, {
                          [css.arrowOpen]: isOpenCategorySelect,
                        })}
                      />
                    </div>

                    <ErrorMessage
                      className={css.errorMessages}
                      name="category"
                      component="span"
                    />
                  </div>
                </div>
              </div>

              <div className={css.ingredientsContainer}>
                <h2 className={clsx(css.sectionTitle, css.mbIngredientsTitle)}>
                  Ingredients
                </h2>

                <div className={css.ingredientsWrapper}>
                  <div
                    className={clsx(
                      css.inputFieldsContainer,
                      css.IngredientsContainer
                    )}
                  >
                    <label
                      className={css.fieldsTitle}
                      htmlFor={fieldId + "ingredientName"}
                    >
                      Name
                    </label>
                    <div className={css.selectContainer}>
                      <Field
                        className={clsx(
                          css.formFields,
                          css.customSelect,
                          css.ingredientsName
                        )}
                        id={fieldId + "ingredientName"}
                        as="select"
                        name="ingredientName"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setIsOpenIngredientSelect(true);
                          }
                        }}
                        onBlur={() => setIsOpenIngredientSelect(false)}
                        onClick={() =>
                          setIsOpenIngredientSelect((prev) => !prev)
                        }
                      >
                        <option>Brocoli</option>
                        <option>Tomato</option>
                      </Field>
                      <span
                        className={clsx(css.arrow, {
                          [css.arrowOpen]: isOpenIngredientSelect,
                        })}
                      />
                    </div>

                    <ErrorMessage
                      className={css.errorMessages}
                      name="ingredientName"
                      component="span"
                    />
                  </div>

                  <div
                    className={clsx(
                      css.inputFieldsContainer,
                      css.IngredientsContainer
                    )}
                  >
                    <label
                      className={clsx(css.fieldsTitle, css.ingredientsAmount)}
                      htmlFor={fieldId + "amount"}
                    >
                      Amount
                    </label>
                    <Field
                      className={css.formFields}
                      id={fieldId + "amount"}
                      type="text"
                      name="amount"
                      placeholder="100g"
                    />

                    <ErrorMessage
                      className={css.errorMessages}
                      name="amount"
                      component="span"
                    />
                  </div>

                  <div className={css.addButtonWrapper}>
                    <button
                      className={css.addIngredientBtn}
                      type="button"
                      onClick={() => {
                        const ingredient = document.querySelector(
                          `#${fieldId}ingredientName`
                        )?.value;
                        const amount = document.querySelector(
                          `#${fieldId}amount`
                        )?.value;

                        if (!ingredient || !amount) return;

                        setFieldValue("ingredients", [
                          ...values.ingredients,
                          { ingredientName: ingredient, amount },
                        ]);

                        setFieldValue("ingredientName", "");
                        setFieldValue("amount", "");
                      }}
                    >
                      Add new Ingredient
                    </button>
                  </div>

                  <Field name="ingredients">
                    {({ field, form }) =>
                      form.values.ingredients.length > 0 && (
                        <table className={css.ingredientsTable}>
                          <thead className={css.ingredientsTableHead}>
                            <tr>
                              <th className={css.ingredientsTableNameColumn}>
                                Name:
                              </th>
                              <th>Amount:</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {form.values.ingredients.map(
                              (ingredient, index) => (
                                <tr key={index}>
                                  <td>{ingredient.ingredientName}</td>
                                  <td>{ingredient.amount}</td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [
                                          ...form.values.ingredients,
                                        ];
                                        updated.splice(index, 1);
                                        setFieldValue("ingredients", updated);
                                      }}
                                      className={css.deleteBtn}
                                    >
                                      <img src={deleteIcon} alt="delete" />
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      )
                    }
                  </Field>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddRecipeForm;
