import { useId, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import cameraIcon from "../../assets/images/addRecipes/camera.svg";
import deleteIcon from "../../assets/images/addRecipes/delete.svg";
import Container from "../Container/Container.jsx";
import css from "./AddRecipeForm.module.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const allowedCategories = ["Seafood", "Lamb"];
const allowedIngredients = ["Brocoli", "Tomato"];

const recipeSchema = Yup.object().shape({
  recipeImg: Yup.mixed()
    .nullable()
    .test("fileSize", "File is too large (max 2MB)", (value) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    }),
  recipeTitle: Yup.string()
    .max(64, "The recipe title must be a maximum of 64 characters.")
    .required("Required field!"),
  recipeDescr: Yup.string()
    .max(200, "The recipe description must be a maximum of 200 characters.")
    .required("Required field!"),
  cookingTime: Yup.number()
    .min(1, "Cooking time should be at least one minute")
    .max(360, "Cooking time should be a maximum of 360 minutes")
    .required("Required field!"),
  calories: Yup.number()
    .min(1, "Minimum number of calories: 1")
    .max(10000, "Maximum number of calories: 10000"),
  category: Yup.string()
    .oneOf(allowedCategories, "Please select a valid category")
    .required("Category is required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        ingredientName: Yup.string()
          .oneOf(allowedIngredients, "Invalid ingredient")
          .required("Required"),
        amount: Yup.string().required("Amount is required"),
      })
    )
    .min(2, "Add at least two ingredient")
    .max(16, "Max ingredients at least: 16")
    .required("Ingredient is required"),
  recipeInstruction: Yup.string()
    .max(1200, "Instructions must be under 1200 characters.")
    .required("Required field!"),
});

const AddRecipeForm = () => {
  const [preview, setPreview] = useState(null);
  const [isOpenCategorySelect, setIsOpenCategorySelect] = useState(false);
  const [isOpenIngredientSelect, setIsOpenIngredientSelect] = useState(false);
  const fieldId = useId();

  const initialValues = {
    recipeImg: null,
    recipeTitle: "",
    recipeDescr: "",
    cookingTime: "",
    calories: "",
    category: "",
    ingredients: [],
    ingredientName: "",
    amount: "",
    recipeInstruction: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);

    setPreview(null);
  };

  return (
    <Container>
      <h1 className={css.mainTitle}>Add Recipe</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={recipeSchema}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className={css.form}>
            <div className={css.photoContainer}>
              <h2 className={css.sectionTitle}>Upload Photo</h2>

              <div>
                <label
                  className={css.labelPhoto}
                  htmlFor={fieldId + "recipeImg"}
                >
                  {preview ? (
                    <img
                      className={css.previewPhoto}
                      src={preview}
                      alt="preview"
                    />
                  ) : (
                    <img
                      className={css.iconPhoto}
                      src={cameraIcon}
                      alt="icon"
                    />
                  )}
                </label>
                <input
                  className={css.inputPhoto}
                  id={fieldId + "recipeImg"}
                  name="recipeImg"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                      if (preview) {
                        URL.revokeObjectURL(preview);
                      }
                      setFieldValue("recipeImg", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                <ErrorMessage
                  className={css.errorMessages}
                  name="recipeImg"
                  component="span"
                />
              </div>
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
                    type="number"
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
                      type="number"
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
                        <option value="" disabled>
                          Select category
                        </option>
                        <option value="Seafood">Seafood</option>
                        <option value="Lamb">Lamb</option>
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

              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div className={css.ingredientsContainer}>
                    <h2
                      className={clsx(css.sectionTitle, css.mbIngredientsTitle)}
                    >
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
                            onBlur={() => setIsOpenIngredientSelect(false)}
                            onClick={() =>
                              setIsOpenIngredientSelect((prev) => !prev)
                            }
                          >
                            <option value="" disabled>
                              Select ingredient
                            </option>
                            <option value="Brocoli">Brocoli</option>
                            <option value="Tomato">Tomato</option>
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
                          className={clsx(
                            css.fieldsTitle,
                            css.ingredientsAmount
                          )}
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
                            if (!values.ingredientName || !values.amount)
                              return;
                            push({
                              ingredientName: values.ingredientName,
                              amount: values.amount,
                            });
                            setFieldValue("ingredientName", "");
                            setFieldValue("amount", "");
                          }}
                        >
                          Add new Ingredient
                        </button>
                      </div>
                    </div>

                    {values.ingredients.length > 0 && (
                      <table className={css.ingredientsTable}>
                        <thead className={css.ingredientsTableHead}>
                          <tr>
                            <th className={css.ingredientsTableNameColumn}>
                              Name
                            </th>
                            <th className={css.ingredientsTableAmountColumn}>
                              Amount
                            </th>
                            <th className={css.ingredientsTableBtnColumn}></th>
                          </tr>
                        </thead>
                        <tbody className={css.ingredientsTableBody}>
                          {values.ingredients.map((ingredient, index) => (
                            <tr key={`${ingredient.ingredientName}-${index}`}>
                              <td>{ingredient.ingredientName}</td>
                              <td>{ingredient.amount}</td>
                              <td>
                                <button
                                  className={css.deleteBtn}
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  <img
                                    className={css.deleteBtnIcon}
                                    src={deleteIcon}
                                    alt="delete button"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {touched.ingredients &&
                      typeof errors.ingredients === "string" && (
                        <span className={css.errorMessages}>
                          {errors.ingredients}
                        </span>
                      )}
                  </div>
                )}
              </FieldArray>

              <div className={css.instructionContainer}>
                <div className={css.inputFieldsContainer}>
                  <label
                    className={clsx(css.sectionTitle, css.mbInstructionTitle)}
                    htmlFor={fieldId + "recipeInstruction"}
                  >
                    Instructions
                  </label>
                  <Field
                    className={clsx(css.formFields, css.textarea)}
                    id={fieldId + "recipeInstruction"}
                    as="textarea"
                    name="recipeInstruction"
                    placeholder="Enter a text"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="recipeInstruction"
                    component="span"
                  />
                </div>
              </div>

              <button className={css.submitFormBtn} type="submit">
                Publish Recipe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddRecipeForm;
