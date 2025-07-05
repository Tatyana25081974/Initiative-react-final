import * as Yup from "yup";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useId, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCategory,
  selectIngredients,
} from "../../redux/filters/selectors.js";
import cameraIcon from "../../assets/images/addRecipes/camera.svg";
import deleteIcon from "../../assets/images/addRecipes/delete.svg";
import Container from "../Container/Container.jsx";
import { addRecipe } from "../../redux/recipes/operations.js";
import css from "./AddRecipeForm.module.css";

const AddRecipeForm = () => {
  const [preview, setPreview] = useState(null);
  const [isOpenCategorySelect, setIsOpenCategorySelect] = useState(false);
  const [isOpenIngredientSelect, setIsOpenIngredientSelect] = useState(false);
  const fieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const allowedCategories = useSelector(selectCategory);
  const allowedIngredients = useSelector(selectIngredients);

  const recipeSchema = Yup.object().shape({
    thumb: Yup.mixed()
      .nullable()
      .test("fileSize", "File is too large (max 2MB)", (value) => {
        if (!value) return true;
        return value.size <= MAX_FILE_SIZE;
      }),
    title: Yup.string()
      .max(64, "The recipe title must be a maximum of 64 characters.")
      .required("Required field!"),
    description: Yup.string()
      .max(200, "The recipe description must be a maximum of 200 characters.")
      .required("Required field!"),
    time: Yup.number()
      .min(1, "Cooking time should be at least one minute")
      .max(360, "Cooking time should be a maximum of 360 minutes")
      .required("Required field!"),
    cals: Yup.number()
      .min(1, "Minimum number of calories: 1")
      .max(10000, "Maximum number of calories: 10000"),
    category: Yup.string()
      .oneOf(allowedCategories.map((category) => category.name))
      .required("Category is required"),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string()
            .oneOf(
              allowedIngredients.map((ingredient) => ingredient._id),
              "Invalid ingredient"
            )
            .required("Required"),
          measure: Yup.string().required("Amount is required"),
        })
      )
      .min(2, "Add at least two ingredient")
      .max(16, "Max ingredients at least: 16")
      .required("Ingredient is required"),
    instructions: Yup.string()
      .max(1200, "Instructions must be under 1200 characters.")
      .required("Required field!"),
  });

  const initialValues = {
    thumb: null,
    title: "",
    description: "",
    time: "",
    cals: "",
    category: "",
    ingredients: [],
    id: "",
    measure: "",
    instructions: "",
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("thumb", values.thumb);

    formData.append("title", values.title.toLowerCase().trim());
    formData.append("description", values.description.toLowerCase().trim());
    formData.append("time", values.time);
    formData.append("cals", values.cals ? values.cals : "");
    formData.append("category", values.category);
    formData.append("instructions", values.instructions.toLowerCase().trim());

    formData.append(
      "ingredients",
      JSON.stringify(
        values.ingredients.map((item) => ({
          id: item.id,
          measure: item.measure,
        }))
      )
    );

    try {
      const data = await dispatch(addRecipe(formData)).unwrap();
      toast.success(`Recipe ${data.title} has successfully been added.`);
      console.log(data);

      navigate(`/recipes/${data._id}`);
    } catch {
      toast.error(
        "Ooops. Something went wrong. Please reload the page and try again."
      );
    }
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
                <label className={css.labelPhoto} htmlFor={fieldId + "thumb"}>
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
                  id={fieldId + "thumb"}
                  name="thumb"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                      if (preview) {
                        URL.revokeObjectURL(preview);
                      }
                      setFieldValue("thumb", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                <ErrorMessage
                  className={css.errorMessages}
                  name="thumb"
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
                    htmlFor={fieldId + "title"}
                  >
                    Recipe Title
                  </label>
                  <Field
                    className={clsx(
                      css.formFields,
                      touched.title && errors.title && css.errorBorder
                    )}
                    id={fieldId + "title"}
                    type="text"
                    name="title"
                    placeholder="Enter the name of your recipe"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="title"
                    component="span"
                  />
                </div>

                <div className={css.inputFieldsContainer}>
                  <label
                    className={css.fieldsTitle}
                    htmlFor={fieldId + "description"}
                  >
                    Recipe Description
                  </label>
                  <Field
                    className={clsx(
                      css.formFields,
                      css.textarea,
                      touched.description &&
                        errors.description &&
                        css.errorBorder
                    )}
                    id={fieldId + "description"}
                    as="textarea"
                    name="description"
                    placeholder="Enter a brief description of your recipe"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="description"
                    component="span"
                  />
                </div>

                <div className={css.inputFieldsContainer}>
                  <label className={css.fieldsTitle} htmlFor={fieldId + "time"}>
                    Cooking time in minutes
                  </label>
                  <Field
                    className={clsx(
                      css.formFields,
                      touched.time && errors.time && css.errorBorder
                    )}
                    id={fieldId + "time"}
                    type="number"
                    name="time"
                    placeholder="10"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="time"
                    component="span"
                  />
                </div>

                <div className={css.selectFieldsContainer}>
                  <div className={css.subInputFieldsContainer}>
                    <label
                      className={css.fieldsTitle}
                      htmlFor={fieldId + "cals"}
                    >
                      Calories
                    </label>
                    <Field
                      className={css.formFields}
                      id={fieldId + "cals"}
                      type="number"
                      name="cals"
                      placeholder="150 cals"
                    />

                    <ErrorMessage
                      className={css.errorMessages}
                      name="cals"
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
                        className={clsx(
                          css.formFields,
                          css.customSelect,
                          touched.category && errors.category && css.errorBorder
                        )}
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
                        {allowedCategories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
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
                          htmlFor={fieldId + "id"}
                        >
                          Name
                        </label>
                        <div className={css.selectContainer}>
                          <Field
                            className={clsx(
                              css.formFields,
                              css.customSelect,
                              css.ingredientsName,
                              touched.id && errors.id && css.errorBorder
                            )}
                            id={fieldId + "id"}
                            as="select"
                            name="id"
                            onBlur={() => setIsOpenIngredientSelect(false)}
                            onClick={() =>
                              setIsOpenIngredientSelect((prev) => !prev)
                            }
                          >
                            <option value="" disabled>
                              Select ingredient
                            </option>
                            {allowedIngredients.map((ingredient) => (
                              <option
                                key={ingredient._id}
                                value={ingredient._id}
                              >
                                {ingredient.name}
                              </option>
                            ))}
                          </Field>
                          <span
                            className={clsx(css.arrow, {
                              [css.arrowOpen]: isOpenIngredientSelect,
                            })}
                          />
                        </div>

                        <ErrorMessage
                          className={css.errorMessages}
                          name="id"
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
                          htmlFor={fieldId + "measure"}
                        >
                          Amount
                        </label>
                        <Field
                          className={clsx(
                            css.formFields,
                            touched.measure && errors.measure && css.errorBorder
                          )}
                          id={fieldId + "measure"}
                          type="text"
                          name="measure"
                          placeholder="100g"
                        />

                        <ErrorMessage
                          className={css.errorMessages}
                          name="measure"
                          component="span"
                        />
                      </div>

                      <div className={css.addButtonWrapper}>
                        <button
                          className={css.addIngredientBtn}
                          type="button"
                          onClick={async () => {
                            if (!values.id || !values.measure) {
                              return;
                            }

                            push({
                              id: values.id,
                              measure: values.measure,
                            });

                            setFieldValue("id", "");
                            setFieldValue("measure", "");
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
                          {values.ingredients.map((ingredient, index) => {
                            const ingredientData = allowedIngredients.find(
                              (ingr) => ingr._id === ingredient.id
                            );

                            return (
                              <tr key={`${ingredient.id}-${index}`}>
                                <td>{ingredientData?.name}</td>
                                <td>{ingredient.measure}</td>
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
                            );
                          })}
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
                    htmlFor={fieldId + "instructions"}
                  >
                    Instructions
                  </label>
                  <Field
                    className={clsx(
                      css.formFields,
                      css.textarea,
                      touched.instructions &&
                        errors.instructions &&
                        css.errorBorder
                    )}
                    id={fieldId + "instructions"}
                    as="textarea"
                    name="instructions"
                    placeholder="Enter a text"
                  />

                  <ErrorMessage
                    className={css.errorMessages}
                    name="instructions"
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
